import { UserType } from "@/models/userModels";
import Image from "next/image";

export default function SmallProfilePicture({
  user,
}: {
  user: UserType | null;
}) {
  if (!user || !user.image) {
    return (
      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center self-center"></div>
    );
  }
  return (
    <Image
      src={user.image}
      priority={true}
      width={48}
      height={48}
      alt={user.name}
      className="rounded-full self-center"
    ></Image>
  );
}
