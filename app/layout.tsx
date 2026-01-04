import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import { Poppins } from 'next/font/google'
import "./globals.css";
import Script from "next/script";


const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: "DropStream",
  description: "Stream your files to the cloud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins antialiased`}
      >
        {children}
        <Toaster />
        <Script src="https://api.nexus.speeedops.com/api/snippet" strategy="afterInteractive" />
      </body>
    </html>
  );
}