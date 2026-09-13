import {
  authorizeGhostAdminRequest,
  createGhostArticle,
  ghostServerErrorResponse,
  ghostServiceUnavailableResponse,
  ghostValidationResponse,
  isGhostAdminServiceConfigured,
  isReservedInsightSlug,
  parseCreateGhostPost,
  toGhostPost,
} from "@/lib/articles/ghost-admin";

export async function GET(request: Request): Promise<Response> {
  if (!isGhostAdminServiceConfigured()) return ghostServiceUnavailableResponse();
  const unauthorized = authorizeGhostAdminRequest(request);
  if (unauthorized) return unauthorized;

  return Response.json({ posts: [] });
}

export async function POST(request: Request): Promise<Response> {
  if (!isGhostAdminServiceConfigured()) return ghostServiceUnavailableResponse();
  const unauthorized = authorizeGhostAdminRequest(request);
  if (unauthorized) return unauthorized;

  const post = await parseCreateGhostPost(request);
  if (!post) return ghostValidationResponse();
  if (isReservedInsightSlug(post.slug)) return ghostValidationResponse("slug is reserved");

  try {
    const article = await createGhostArticle(post);
    return Response.json({ posts: [toGhostPost(article)] });
  } catch {
    return ghostServerErrorResponse();
  }
}
