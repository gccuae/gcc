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

export const dynamic = 'force-dynamic'

export default async function GlobalNotFound() {

  const navbarResponse = await fetch(`${process.env.BASE_URL}/api/admin/navbar`)
  const navbarData = await navbarResponse.json();

  const footerResponse = await fetch(`${process.env.BASE_URL}/api/admin/footer`)
  const footerData = await footerResponse.json();

  const socialResponse = await fetch(`${process.env.BASE_URL}/api/admin/social-media`)
  const socialMediaData = await socialResponse.json();


  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {navbarData.data.status == "published" && <Header data={navbarData.data} socialMediaData={socialMediaData.data}/>}
          <NotFound />
          {footerData.data.status == "published" && <FooterV data={footerData.data} socialMediaData={socialMediaData.data}/>}
        </ThemeProvider>
      </body>
    </html>
  );
}
