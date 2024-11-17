import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"
import Head from "next/head";

const geistSans = localFont({
   src: "./fonts/GeistVF.woff",
   variable: "--font-geist-sans",
   weight: "100 900",
});
const geistMono = localFont({
   src: "./fonts/GeistMonoVF.woff",
   variable: "--font-geist-mono",
   weight: "100 900",
});

export const metadata: Metadata = {
   title: "Till's Redirects",
   description: "An app for creating short links",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <ClerkProvider>
         <html lang="en" className="h-full w-full">
            <Head>
               <link
                  rel="icon"
                  href="/icon?<generated>"
                  type="image/<generated>"
                  sizes="<generated>"
               />
            </Head>
            <body
               className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full`}
            >
               <div className="w-full h-full flex flex-col justify-between px-8 py-10">
                  {children}
                  <div className="flex justify-center py-4">
                     Copyright © 2024,&nbsp;
                     <Link href="https://tillhfm.de" target="_blank" className="underline underline-offset-2 decoration-1 decoration-transparent hover:decoration-zinc-950 hover:transition-colors">
                        Till Hoffmann
                     </Link>
                  </div>
               </div>
               <Toaster />
            </body>
         </html>
      </ClerkProvider>
   );
}
