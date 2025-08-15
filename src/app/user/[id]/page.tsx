import { getUserById } from "@/models/usersModels";
import { redirect } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserById(id);

  if (user) {
    return (
      <div>
        <h1 className="text-2xl font-bold">{user?.name}&#39;s Profile Page</h1>
      </div>
    );
  } else {
    redirect("/");
  }
}
