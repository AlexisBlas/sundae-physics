import type { Metadata } from "next";
import { Baloo_2, Nunito_Sans } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-baloo",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Sundae Physics — dessert, studied at the particle level",
  description:
    "A dessert research lab disguised as an ice cream shop. Banana splits, controlled detonations of flavor, and the slow-motion replay to prove it.",
  openGraph: {
    title: "Sundae Physics — dessert, studied at the particle level",
    description:
      "Scroll to detonate a banana split in slow motion. A dessert research lab disguised as an ice cream shop.",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${nunito.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
