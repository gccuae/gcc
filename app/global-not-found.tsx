import "./globals.css";
import { DM_Sans } from "next/font/google";
import Header from "./components/common/Header";
import FooterV from "./components/common/FooterV";
import NotFound from "./(user)/not-found";
import { ThemeProvider } from "next-themes";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Header />
          <NotFound />
          <FooterV />
        </ThemeProvider>
      </body>
    </html>
  );
}
