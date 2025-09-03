import { addComment, getCommentsByPostId } from "@/models/commentModels";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { authorId, content } = body;

  if (!content || !authorId) {
    return new Response(
      JSON.stringify({ error: "content and authorId are required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    await addComment(content, authorId, id);
    const comments = await getCommentsByPostId(id);
    return new Response(JSON.stringify(comments), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
