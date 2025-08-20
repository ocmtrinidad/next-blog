import Form from "next/form";
import BlueButton from "./BlueButton";

export default function SearchPost({
  route,
  placeholder,
}: {
  route: string;
  placeholder: string;
}) {
  return (
    <Form action={route} className="flex mb-4">
      <input
        type="text"
        name="query"
        placeholder={placeholder}
        className="border border-r-0 flex-1 rounded rounded-r-none rounded-br-none p-2"
      />
      <BlueButton>Search</BlueButton>
    </Form>
  );
}
