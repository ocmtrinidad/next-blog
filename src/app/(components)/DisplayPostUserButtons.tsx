import { Post } from "@/models/postModels";
import Link from "next/link";
import BlueButton from "./BlueButton";
import RedButton from "./RedButton";
import { UserType } from "@/models/userModels";

export default function DisplayPostUserButtons({
  post,
  route,
  user,
}: {
  post: Post;
  route: string;
  user: UserType;
}) {
  if (user.role === "ADMIN" || user.id === post.author.id) {
    return (
      <div className="flex gap-2">
        {user.id === post.author.id && (
          <Link href={`/post/${post.id}/edit`}>
            <BlueButton>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-6"
              >
                <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </BlueButton>
          </Link>
        )}

        <RedButton post={post} userId={user.id} route={route} />
      </div>
    );
  }
}
