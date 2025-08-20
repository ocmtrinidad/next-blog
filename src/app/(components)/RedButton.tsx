"use client";

import { removePost } from "../controllers/postsControllers";

export default function RedButton({
  children,
  postId,
}: {
  children: React.ReactNode;
  postId: string;
}) {
  return (
    <button
      className="bg-red-600 px-4 py-2 rounded cursor-pointer hover:bg-red-800 max-w-fit font-bold"
      onClick={async () => {
        await removePost(postId);
      }}
    >
      {children}
    </button>
  );
}
