import "./globals.css";
import { Fraunces, Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: "NextGram",
  description: "Instagram inspired social media app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${fraunces.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
