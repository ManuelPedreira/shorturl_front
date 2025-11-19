import type { Metadata } from "next";
import "../ui/globals.scss";
import { geistMono, geistSans } from "@/ui/fonts";
import Navbar from "@/ui/Navbar/Navbar";
import { navbarElements } from "@/lib/pageConfig";
import Footer from "@/ui/Footer/Footer";

export const metadata: Metadata = {
  title: "Short URL",
  description: "Shourt your URL | Proyect created by Manuel Pedreira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar elements={navbarElements} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
