export default function BlueButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button className="bg-blue-500 px-4 py-2 rounded cursor-pointer hover:bg-blue-700 h-full">
      {children}
    </button>
  );
}
