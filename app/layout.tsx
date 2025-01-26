import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Poppins } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bridgeflow",
  icons: {
    icon: [
      {
        url: "/icons/Bridgeflow.svg",
        href: "/icons/Bridgeflow.svg",
      }
    ],
  },
  description: "Automate your e-commerce platform migration with AI-powered assistance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
      <ConvexClientProvider >
        <html lang="en" className={poppins.variable}>
          <body className="font-poppins">
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange>
            
              
                {children}
            
            
            </ThemeProvider>
          </body>
        </html>
    </ConvexClientProvider>
  
  );
}
