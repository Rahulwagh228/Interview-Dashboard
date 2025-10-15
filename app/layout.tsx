import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

// Local font declarations
const shadowsIntoLight = localFont({
  src: "../public/fonts/ShadowsIntoLight-Regular.ttf",
  variable: "--font-shadows-into-light",
  display: "swap",
});

const dancingScript = localFont({
  src: "../public/fonts/DancingScript-VariableFont_wght.ttf",
  variable: "--font-dancing-script",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${montserrat.className} ${shadowsIntoLight.variable} ${dancingScript.variable}`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
