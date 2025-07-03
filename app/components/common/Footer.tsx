import Image from "next/image";
import { assets } from "@/public/assets/assets";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="relative ">
      <div className="relative h-full">
        <div className="absolute w-full h-full z-1">
          <Image src={assets.footerbg} alt="footerbg" width={1920} height={1080} className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-2">
          <div className="pt-6 pb-4 xl:pb-12 xl:pt-[63px] border-b border-foreground">
            <h2 className="text-5xl font-normal leading-[1.147058823529412] text-white">Transforming Spaces, Building Futures</h2>
          </div>
          <div className="grid gap-y-8 lg:grid-cols-2 xl:grid-cols-[6fr_3fr] pt-4 pb-4 xl:pt-[63px] xl:pb-[70px] border-b border-foreground">
            <div>
              <p className="text-lg font-normal text-white leading-[1.526315789473684] max-w-[472px]">Gulf Contractors Company (GCC) LLCSuite No. 023, Liberty Tower, Khalifa St., P O Box 45363 Abu Dhabi, UAE</p>
              <div className="flex flex-col gap-2 pt-3 xl:pt-[18px]">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center bg-black rounded-full border border-foreground w-10 h-10">
                    <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_614_814)">
                        <path d="M17.8859 1.72461H4.1122C2.82269 1.72461 1.77734 2.74411 1.77734 4.00172V13.998C1.77734 15.2557 2.82269 16.2751 4.1122 16.2751H17.8859C19.1754 16.2751 20.2207 15.2557 20.2207 13.998V4.00172C20.2207 2.74411 19.1754 1.72461 17.8859 1.72461Z" stroke="#EE3524" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" />
                        <path d="M4.45703 4.5031L10.1549 10.06C10.6571 10.5499 11.4694 10.5499 11.9717 10.06L17.6852 4.48779" stroke="#EE3524" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_614_814">
                          <rect width="20.3279" height="16.3934" fill="white" transform="translate(0.835938 0.803223)" />
                        </clipPath>
                      </defs>
                    </svg>

                  </div>
                  <Link href="mailto:info@gcc.ae" className="text-2xl font-normal text-white leading-[1.3125] hover:text-accent transition-all duration-300">info@gcc.ae</Link>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center bg-black rounded-full border border-foreground w-10 h-10">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_614_808)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16.8424 15.4963L15.7038 14.3745C14.8369 13.5203 13.4343 13.5203 12.5674 14.3745C12.173 14.7631 11.5368 14.7631 11.1424 14.3745L7.72315 11.0053C7.32876 10.6167 7.32876 9.98975 7.72315 9.60114C8.59005 8.74692 8.59005 7.36478 7.72315 6.51056L6.58464 5.38871C5.71774 4.53449 4.31507 4.53449 3.44817 5.38871C1.31998 7.47843 1.31998 10.877 3.44445 12.9704C5.34568 14.8438 7.24319 16.7135 9.14442 18.5869C9.63554 19.0489 10.6438 19.8481 12.1246 20.0901C12.266 20.1121 12.5823 20.1597 12.9915 20.1597C14.383 20.1597 15.7783 19.6354 16.8386 18.5906C17.7055 17.7364 17.7055 16.3542 16.8386 15.5L16.8424 15.4963Z" stroke="#EE3524" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.9492 1.91341C12.2952 1.86575 12.6524 1.84375 13.0096 1.84375C17.3143 1.84375 20.8005 5.28262 20.8005 9.52071C20.8005 9.76268 20.7894 10.0046 20.7671 10.2429" stroke="#EE3524" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.3008 5.66731C12.5315 5.62698 12.7659 5.60498 13.0077 5.60498C15.2029 5.60498 16.9813 7.35741 16.9813 9.52045C16.9813 9.76608 16.959 10.0081 16.9143 10.2427" stroke="#EE3524" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_614_808">
                          <rect width="20.9836" height="20.3279" fill="white" transform="translate(0.835938 0.835938)" />
                        </clipPath>
                      </defs>
                    </svg>


                  </div>
                  <Link href="tel:+97126267510" className="text-2xl font-normal text-white leading-[1.3125] hover:text-accent transition-all duration-300">+971 2 626 7510</Link>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-normal text-white leading-[1.3125] pb-4 xl:pb-[37px]">Quick Links</h3>
              <div className="flex gap-10">
                <div>
                  <ul className="flex flex-col gap-2">
                    <li className="text-white text-lg font-light leading-[1.578947368421053] hover:text-accent transition-all duration-300"><Link href="#">About GCC</Link></li>
                    <li className="text-white text-lg font-light leading-[1.578947368421053] hover:text-accent transition-all duration-300"><Link href="#">Group Companies</Link></li>
                    <li className="text-white text-lg font-light leading-[1.578947368421053] hover:text-accent transition-all duration-300"><Link href="#">Certifications</Link></li>
                    <li className="text-white text-lg font-light leading-[1.578947368421053] hover:text-accent transition-all duration-300"><Link href="#">Projects</Link></li>
                  </ul>
                </div>
                <div>
                  <ul className="flex flex-col gap-2">
                    <li className="text-white text-lg font-light leading-[1.578947368421053] hover:text-accent transition-all duration-300"><Link href="#">Clientele & Partnerships</Link></li>
                    <li className="text-white text-lg font-light leading-[1.578947368421053] hover:text-accent transition-all duration-300"><Link href="#">Careers</Link></li>
                    <li className="text-white text-lg font-light leading-[1.578947368421053] hover:text-accent transition-all duration-300"><Link href="#">Health Safety & Environmental</Link></li>
                    <li className="text-white text-lg font-light leading-[1.578947368421053] hover:text-accent transition-all duration-300"><Link href="#">Blog</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-[6fr_3fr] pt-4 pb-4 xl:pt-[48px] xl:pb-[48px] gap-y-8">
            <div className="flex flex-wrap gap-4 xl:gap-6">
              <Link href="#" className="flex items-center gap-2">
                <span className="text-mdgray text-lg font-light leading-[1.578947368421053] uppercase hover:text-primary transition-all duration-300">LinkedIn</span>
                <Image src={assets.linkArrowGreen} alt="linkArrowGreen" width={22} height={22} className="w-5 h-5 xl:w-[10.97px] xl:h-auto" /></Link>
              <Link href="#" className="flex items-center gap-2">
                <span className="text-mdgray text-lg font-light leading-[1.578947368421053] uppercase hover:text-primary transition-all duration-300">Facebook</span>
                <Image src={assets.linkArrowGreen} alt="linkArrowGreen" width={22} height={22} className="w-5 h-5 xl:w-[10.97px] xl:h-auto" /></Link>
              <Link href="#" className="flex items-center gap-2">
                <span className="text-mdgray text-lg font-light leading-[1.578947368421053] uppercase hover:text-primary transition-all duration-300">Youtube</span>
                <Image src={assets.linkArrowGreen} alt="linkArrowGreen" width={22} height={22} className="w-5 h-5 xl:w-[10.97px] xl:h-auto" /></Link>
            </div>
            <div>
              <a href="#" className="bg-white text-foreground hover:bg-primary hover:text-white flex items-center justify-center rounded-4xl py-3 xl:py-[13px] gap-2 transition-all
               duration-300 ease-in-out group max-w-[285.33px]">
                <span className="text-base font-light uppercase leading-[1.578947368421053]">Download Profile</span>
                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.49593 14.9186H4.79222C3.00365 14.9186 1.55078 16.3401 1.55078 18.0901V25.7901C1.55078 27.5401 3.00365 28.9617 4.79222 28.9617H5.02335M5.02335 28.9617C6.9385 28.9617 8.49593 27.4378 8.49593 25.564V3.07242C8.49593 2.50165 8.96921 2.03857 9.55256 2.03857H30.388C30.9713 2.03857 31.4446 2.50165 31.4446 3.07242V26.5009C31.4446 27.8578 30.322 28.9617 28.9296 28.9617H5.02335Z" stroke="#AD4545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-all duration-300 ease-in-out" />
                  <path d="M13.7891 9.73828H23.0456" stroke="#AD4545" className="group-hover:stroke-white transition-all duration-300 ease-in-out" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.7891 15.8877H25.8908" stroke="#AD4545" className="group-hover:stroke-white transition-all duration-300 ease-in-out" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.7891 22.0371H23.0456" stroke="#AD4545" className="group-hover:stroke-white transition-all duration-300 ease-in-out" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[26px] pb-[24px]  bg-forground-two">
        <div className="container">
          <div className="flex flex-wrap justify-between items-center">
            <ul className="flex items-center gap-4 xl:gap-6">
              <li><Link href="#" className="text-base leading-[1.875] font-light text-mdgray hover:text-accent transition-all duration-300">Terms & Conditions</Link></li>
              <li><Link href="#" className="text-base leading-[1.875] font-light text-mdgray hover:text-accent transition-all duration-300">Feedback</Link></li>
            </ul>
            <div>
              <p className="text-base leading-[1.875] font-light text-mdgray">© {new Date().getFullYear()} GCC. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 