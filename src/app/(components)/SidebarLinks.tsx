import Link from "next/link";
import BlueButton from "./BlueButton";

export default function SidebarLinks({
  setShowSidebar,
  url,
  text,
}: {
  setShowSidebar: (show: boolean) => void;
  url: string;
  text: string;
}) {
  return (
    <div onClick={() => setShowSidebar(false)}>
      <Link href={url} className="px-4 flex">
        <BlueButton>{text}</BlueButton>
      </Link>
    </div>
  );
}
