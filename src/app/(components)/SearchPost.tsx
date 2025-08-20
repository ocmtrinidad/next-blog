import Form from "next/form";
import BlueButton from "./BlueButton";

export default function SearchPost() {
  return (
    <Form action={"/"} className="flex mb-4">
      <input
        type="text"
        name="query"
        placeholder="Search Posts"
        className="border flex-1 rounded p-2"
      />
      <BlueButton>Search</BlueButton>
    </Form>
  );
}
