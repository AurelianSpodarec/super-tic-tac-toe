import type { Metadata } from "next";

import { Orbitron, Monoton, Sacramento } from "next/font/google";

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


export const sacramento = Sacramento({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sacramento'
})


export const monoton = Monoton({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-monoton'
})

import localFont from "next/font/local"

export const neontubes = localFont({
  src: [
    {
      path: "./../../public/fonts/neontubes/neontubes-webfont.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-neontubes",
  display: "swap"
})


function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`antialiased ${orbitron.variable} ${monoton.variable} ${neontubes.variable} ${sacramento.variable}`}>
        {children}
      </body>
    </html>
  );
}

export default RootLayout
