import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PortaCast - See Demand Before It Hits",
  description: "Predictive demand forecasting for portable restroom operators. AI-powered heatmaps and event intelligence.",
  keywords: ["portable restroom", "demand forecasting", "event planning", "AI", "logistics"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if Clerk keys are configured
  const hasClerkKey = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  const content = (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );

  // Wrap with ClerkProvider only if keys are configured
  if (hasClerkKey) {
    return <ClerkProvider>{content}</ClerkProvider>;
  }
  
  return content;
}
