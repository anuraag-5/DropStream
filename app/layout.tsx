import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import { Poppins } from 'next/font/google'
import "./globals.css";


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
      </body>
    </html>
  );
}