import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brain Detox",
  description: "Clear your mind and improve focus",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}