import { Comment } from "@/models/commentModels";

export default async function CommentsSection({
  comments,
}: {
  comments: Comment[];
}) {
  return (
    <div className="border-t pt-4">
      <h1 className="font-bold text-xl">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h1>
      {comments.map((comment) => (
        <div key={comment.id} className="border-b my-2">
          <p>{comment.content}</p>
          <p>
            By {comment.author.name} on {comment.createdAt.toDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
