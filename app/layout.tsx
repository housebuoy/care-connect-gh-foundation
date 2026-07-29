import { Archivo, Source_Serif_4, Martian_Mono } from "next/font/google";

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
    <html lang="en" className={`${archivo.variable} ${sourceSerif.variable} ${martianMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}