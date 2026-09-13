import {
  authorizeGhostAdminRequest,
  ghostConflictResponse,
  ghostNotFoundResponse,
  ghostServerErrorResponse,
  ghostServiceUnavailableResponse,
  ghostValidationResponse,
  getArticleById,
  isGhostAdminServiceConfigured,
  isReservedInsightSlug,
  parseUpdateGhostPost,
  toGhostPost,
  updateGhostArticle,
} from "@/lib/articles/ghost-admin";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteContext): Promise<Response> {
  if (!isGhostAdminServiceConfigured()) return ghostServiceUnavailableResponse();
  const unauthorized = authorizeGhostAdminRequest(request);
  if (unauthorized) return unauthorized;

  try {
    const article = await getArticleById((await params).id, true);
    return article ? Response.json({ posts: [toGhostPost(article)] }) : ghostNotFoundResponse();
  } catch {
    return ghostServerErrorResponse();
  }
}

export async function PUT(request: Request, { params }: RouteContext): Promise<Response> {
  if (!isGhostAdminServiceConfigured()) return ghostServiceUnavailableResponse();
  const unauthorized = authorizeGhostAdminRequest(request);
  if (unauthorized) return unauthorized;

  const post = await parseUpdateGhostPost(request);
  if (!post) return ghostValidationResponse();
  if (isReservedInsightSlug(post.slug)) return ghostValidationResponse("slug is reserved");

  try {
    const result = await updateGhostArticle((await params).id, post);
    if (result.conflict) return ghostConflictResponse();
    if (result.duplicate) return ghostValidationResponse("slug is already in use");
    return result.article
      ? Response.json({ posts: [toGhostPost(result.article)] })
      : ghostNotFoundResponse();
  } catch {
    return ghostServerErrorResponse();
  }
}
