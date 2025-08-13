import { getPosts, Post } from "@/models/postsModels";
import PostList from "./(components)/PostList";

export default async function Home() {
  const posts: Post[] = await getPosts();

  return <PostList posts={posts} />;
}
