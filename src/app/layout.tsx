import type { Metadata } from "next";

import { Orbitron, Monoton } from "next/font/google";

import "./../styles/globals.css";

export const metadata: Metadata = {
  title: "Next.js Dashboard with TailwindCSS",
  description: "Created with best practices in mind",
};

export const orbitron = Orbitron({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron'
})

export const monoton = Monoton({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-monoton'
})

function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`antialiased ${orbitron.variable} ${monoton.variable}`}>
        {children}
      </body>
    </html>
  );
}

export default RootLayout
