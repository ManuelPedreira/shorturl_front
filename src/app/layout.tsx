import type { Metadata } from "next";
import "../ui/globals.scss";
import { geistMono, geistSans } from "@/ui/fonts";
import Navbar from "@/ui/Navbar/Navbar";
import { getNavbarElements } from "@/lib/pageConfig";
import Footer from "@/ui/Footer/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "Short URL",
  description: "Shourt your URL | Proyect created by Manuel Pedreira",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar elements={await getNavbarElements()} />
        <main>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
