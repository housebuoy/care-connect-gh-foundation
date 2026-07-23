import { SiteNav } from "@/components/site-nav";
import { Archivo, Source_Serif_4, Martian_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { NavThemeProvider } from "@/components/nav-theme";

const archivo = Archivo({
  subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo",
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"], variable: "--font-source",
});
const martianMono = Martian_Mono({
  subsets: ["latin"], variable: "--font-martian",
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${archivo.variable} ${sourceSerif.variable} ${martianMono.variable} scroll-smooth`} >
      <body>
        <NavThemeProvider>
        <SiteNav />
        {children}
        <SiteFooter />
        </NavThemeProvider>
      </body>
    </html>
  );
}


export const metadata = {
  title: "Care Connect GH Foundation",
  description: "Community health education and screening across the Ashanti Region.",
  icons: {
    icon: [
      { url: "/favicons/favicon.ico", sizes: "any" },
      { url: "/favicons/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicons/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicons/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicons/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/favicons/apple-touch-icon.png",
  },
  manifest: "/favicons/site.webmanifest",
};