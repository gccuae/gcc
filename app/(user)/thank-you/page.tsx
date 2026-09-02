// app/thank-you/page.tsx
import Image from "next/image";
import { assets } from "@/public/assets/assets";

export default function ThankYou() {
  return (
    <main className="relative overflow-hidden bg-black">
      <section className="relative min-h-[72vh] flex items-center py-16 lg:py-24">
        <div className="absolute inset-0">
          <Image
            src={assets.footerbg}
            alt="Construction site background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/85" />
        </div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 xl:gap-16 items-center">
            <div>
              <p className="text-accent text-lg uppercase tracking-[0.2em] mb-3">
                Submission Received
              </p>
              <div className="flex items-center gap-6">
                <svg
                  width="90"
                  height="90"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0"
                >
                  <circle cx="12" cy="12" r="11" stroke="#7AC142" strokeWidth="1.5" />
                  <path
                    d="M7 12.5L10.5 16L17 8.5"
                    stroke="#7AC142"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h1 className="text-[64px] sm:text-[90px] xl:text-[110px] leading-[0.9] font-semibold text-white">
                  Thank You
                </h1>
              </div>
              <div className="w-24 h-[3px] bg-primary mt-6 mb-8" />
            </div>

            <div className="border border-white/20 bg-black/45 backdrop-blur-sm p-6 sm:p-8 xl:p-10">
              <h2 className="text-3xl xl:text-4xl text-white leading-[1.15] mb-4">
                We&apos;ve Got Your Message
              </h2>
              <p className="text-lg text-white/70 leading-lh-text19 mb-8">
                Your submission has been received. Our team will review the
                details and get back to you shortly.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                
                <a  href="/"
                  className="bg-white hover:bg-mdgray hover:text-white cursor-pointer flex items-center justify-center py-1 xl:py-[7.39px] px-4 xl:px-[28px] gap-2 transition-all duration-300 ease-in-out group border border-foreground dark:border-white rounded-4xl w-fit hover:shadow-xl"
                >
                  <span className="text-sm lg:text-base font-light uppercase leading-[1.75] text-black">
                    Back to Home
                  </span>
                  <svg
                    width="26"
                    height="10"
                    viewBox="0 0 26 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:translate-x-2 transition-all duration-300"
                  >
                    <path
                      d="M0 9.53027H24L15 0.530273"
                      stroke="#7AC142"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                    />
                  </svg>
                </a>
                <a
                  href="/projects"
                  className="border border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-6 py-2 rounded-4xl text-sm uppercase tracking-wide"
                >
                  View Projects
                </a>
              </div>

              <div className="pt-6 border-t border-white/20">
                <p className="text-white/70 text-sm uppercase tracking-[0.18em] mb-3">
                  Quick Links
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  
                 <a   href="/about-us"
                    className="text-white hover:text-accent transition-all duration-300"
                  >
                    About GCC
                  </a>
                  
                 <a   href="/projects"
                    className="text-white hover:text-accent transition-all duration-300"
                  >
                    Projects
                  </a>
                  
                  <a  href="/careers"
                    className="text-white hover:text-accent transition-all duration-300"
                  >
                    Careers
                  </a>
                  
                  <a  href="/contact-us"
                    className="text-white hover:text-accent transition-all duration-300"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}