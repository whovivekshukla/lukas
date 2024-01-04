import type { Metadata } from "next";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { fontSans } from "@/lib/font";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Lukas",
  description: "Automate your Drone Inspections",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="light">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          {children}
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
