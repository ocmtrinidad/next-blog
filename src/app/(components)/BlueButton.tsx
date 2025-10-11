export default function BlueButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button className="flex-1 bg-blue-500 px-2 py-1 rounded cursor-pointer hover:bg-blue-700 h-full max-h-fit">
      {children}
    </button>
  );
}
