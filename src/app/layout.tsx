import NextTopLoader from "nextjs-toploader";
import { Providers } from "./provider";
import { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { WelcomeModal } from "@/popUps/Welcome";
import { AftergetStartedModal } from "@/popUps/AftergetStarted";
import { AfterProductTourModal } from "@/popUps/AfterProductTour";
import { HalfQuizModal } from "@/popUps/HalfQuiz";
import Script from "next/script";
import { WriterInstruction } from "@/popUps/WriterInstruction";

const quicksand = Quicksand({ subsets: ["latin"] });
export const metadata = {
  metadataBase: new URL("https://beams-world.vercel.app/"),
  title: "Beams World",
  description: "Beams World",
  openGraph: {
    title: "Beams World",
    description: "Beams World",
    url: "https://beams-world.vercel.app/",
    siteName: "beams.world",
    images: ["/assets/favicon.png"],
  },
  twitter: {
    title: "Beams World",
    card: "summary_large_image",
    images: ["/assets/favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
} satisfies Metadata;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" href="/favicon.png" />
        {/* Other head elements */}
      </head>
      <body className={quicksand.className}>
        <Providers>
          {/* Micro interaction modals */}
          <WelcomeModal />
          <AftergetStartedModal />
          <AfterProductTourModal />
          <HalfQuizModal />
          <WriterInstruction />
          {/* Loading bar shown at top */}
          <NextTopLoader showSpinner={false} color="orange" height={5} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
