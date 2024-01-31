import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "../components/auth-provider";
import ReactQueryProvider from "~/components/react-query-provider";
import { Toaster } from "~/components/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurants Orders Manager",
  description: "🍽️💵",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <head>
        {/* Icon */}
        <link rel="icon" href="/icon.png" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ReactQueryProvider>
            {children}
            <Toaster />
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
