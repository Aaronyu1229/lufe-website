import { createHash, createHmac, timingSafeEqual } from "node:crypto";

type GhostAdminKey = {
  id: string;
  secret: Buffer;
};

let didWarnAboutMissingKey = false;

const getGhostAdminKey = (): GhostAdminKey | null => {
  const value = process.env.GHOST_COMPAT_ADMIN_KEY;
  const parts = value?.split(":") ?? [];
  const [id, secret] = parts;

  if (
    parts.length !== 2 ||
    !id ||
    !secret ||
    secret.length % 2 !== 0 ||
    !/^[0-9a-f]+$/i.test(secret)
  ) {
    if (!didWarnAboutMissingKey) {
      console.warn("[ghost-auth] GHOST_COMPAT_ADMIN_KEY is missing or invalid");
      didWarnAboutMissingKey = true;
    }
    return null;
  }

  return { id, secret: Buffer.from(secret, "hex") };
};

const decodeJwtPart = (value: string): Buffer | null => {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) return null;

  try {
    return Buffer.from(value, "base64url");
  } catch {
    return null;
  }
};

const parseJson = (value: Buffer): unknown => {
  try {
    return JSON.parse(value.toString("utf8"));
  } catch {
    return null;
  }
};

const safeCompare = (actual: Buffer, expected: Buffer): boolean => {
  if (actual.length !== expected.length) {
    timingSafeEqual(
      createHash("sha256").update(actual).digest(),
      createHash("sha256").update(expected).digest(),
    );
    return false;
  }

  return timingSafeEqual(actual, expected);
};

const getGhostToken = (authorization: string | null): string | null => {
  if (!authorization) return null;

  const [scheme, token, ...rest] = authorization.trim().split(/\s+/);
  if (scheme !== "Ghost" || !token || rest.length > 0) return null;

  return token;
};

export const isGhostAdminConfigured = (): boolean => getGhostAdminKey() !== null;

export const isGhostAdminRequest = (request: Request): boolean => {
  const key = getGhostAdminKey();
  const token = getGhostToken(request.headers.get("authorization"));
  if (!key || !token) return false;

  const [encodedHeader, encodedPayload, encodedSignature, ...rest] = token.split(".");
  if (!encodedHeader || !encodedPayload || !encodedSignature || rest.length > 0) return false;

  const headerBytes = decodeJwtPart(encodedHeader);
  const payloadBytes = decodeJwtPart(encodedPayload);
  const signature = decodeJwtPart(encodedSignature);
  if (!headerBytes || !payloadBytes || !signature) return false;

  const header = parseJson(headerBytes);
  const payload = parseJson(payloadBytes);
  if (!header || typeof header !== "object" || !payload || typeof payload !== "object") return false;

  const { alg, kid, typ } = header as Record<string, unknown>;
  const { aud, exp } = payload as Record<string, unknown>;
  if (
    alg !== "HS256" ||
    typ !== "JWT" ||
    kid !== key.id ||
    aud !== "/admin/" ||
    typeof exp !== "number" ||
    !Number.isFinite(exp) ||
    exp <= Math.floor(Date.now() / 1000)
  ) {
    return false;
  }

  const expectedSignature = createHmac("sha256", key.secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest();

  return safeCompare(signature, expectedSignature);
};

export const ghostUnauthorizedResponse = () => Response.json(
  { errors: [{ message: "Unauthorized", type: "UnauthorizedError" }] },
  { status: 401 },
);
