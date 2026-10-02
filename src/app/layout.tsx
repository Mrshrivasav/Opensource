import type { Metadata } from "next";
import { DM_Serif_Display, Geist_Mono, Instrument_Serif, Outfit } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const outfit = Outfit({
  variable: "--ff-outfit",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--ff-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

// The reference site self-hosts "coreMono" and "bluuNext"; these are the closest Google Fonts stand-ins.
const mono = Geist_Mono({
  variable: "--ff-mono",
  subsets: ["latin"],
});

const bluu = DM_Serif_Display({
  variable: "--ff-bluu",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: { default: "Diggaj Raj — Software Developer & AI Engineer", template: "%s · Diggaj Raj" },
  description:
    "Diggaj Raj builds thoughtful, reliable and scalable digital experiences across web, data and AI.",
};

// Applies the saved (or system) theme before paint to avoid a light/dark flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${instrumentSerif.variable} ${mono.variable} ${bluu.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
