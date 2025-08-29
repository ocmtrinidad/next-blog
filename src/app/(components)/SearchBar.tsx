import Form from "next/form";
import BlueButton from "./BlueButton";

export default function SearchBar({
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
      <div className="flex">
        <BlueButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </BlueButton>
      </div>
    </Form>
  );
}
