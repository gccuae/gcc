import Image from "next/image";
import { serviceDetailsData } from "./data";
import Link from "next/link";
import { assets } from "@/public/assets/assets";
const Cta = () => {
  return ( 
    <section className="py-57px xl:py-[90.05px] bg-light-white dark:bg-black relative overflow-hidden">
      <Image src={serviceDetailsData.cta.img} alt="cta" width={500} height={500} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 w-full h-full z-10 bg-gradient-to-r from-black from-0% to-black/25 to-100%"></div>
      <div className="container">
        <div className="relative z-10">
          <h2 className="text-5xl leading-lh-text68 font-normal text-white mb-15 xl:mb-[87px]">{serviceDetailsData.cta.title}</h2>
          <div className="w-2/4 ml-auto ">
            <p className="text-lg leading-lh-text24 text-white font-light">{serviceDetailsData.cta.desc}</p>
          <Link href={serviceDetailsData.cta.btnLink} className="flex items-center justify-between gap-4 bg-light-white dark:bg-white rounded-3xl w-fit py-15px px-30px xl:py-20px xl:px-40px 
            transition-all duration-300 hover:bg-primary hover:text-white text-black dark:text-white px-5 py-2 mt-12 xl:mt-[67px] text-base leading-[1.75] group">
            {serviceDetailsData.cta.btnText}
            <Image src={assets.singleGreenArrow} alt="arrow-right" width={20} height={20} className="transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-x-0" />
          </Link>
          </div>
        </div>
      </div>
    </section>
   );
}
 
export default Cta;