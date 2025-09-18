import Link from "next/link";
import BlueButton from "./BlueButton";

export default function CategoryButton({ category }: { category: string }) {
  return (
    <Link href={`/category/${category}`} className="max-w-fit">
      <BlueButton>{category}</BlueButton>
    </Link>
  );
}
