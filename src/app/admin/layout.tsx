import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel - Crave Corner",
  description: "Manage your Crave Corner platform",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
