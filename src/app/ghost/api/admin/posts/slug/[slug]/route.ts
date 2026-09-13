import {
  authorizeGhostAdminRequest,
  ghostNotFoundResponse,
  ghostServerErrorResponse,
  ghostServiceUnavailableResponse,
  getArticleBySlug,
  isGhostAdminServiceConfigured,
  toGhostPost,
} from "@/lib/articles/ghost-admin";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteContext): Promise<Response> {
  if (!isGhostAdminServiceConfigured()) return ghostServiceUnavailableResponse();
  const unauthorized = authorizeGhostAdminRequest(request);
  if (unauthorized) return unauthorized;

  try {
    const article = await getArticleBySlug((await params).slug, true);
    return article ? Response.json({ posts: [toGhostPost(article)] }) : ghostNotFoundResponse();
  } catch {
    return ghostServerErrorResponse();
  }
}
