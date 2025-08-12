import type { Metadata } from "next";
import "./globals.css";
import AuthSessionProvider from "./(components)/AuthSessionProvider";
import Navbar from "./(components)/Navbar";

export const metadata: Metadata = {
  title: "Next Blog",
  description: "Blog built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="max-w-6xl mx-auto p-4">
          <AuthSessionProvider>{children}</AuthSessionProvider>
        </div>
      </body>
    </html>
  );
}
