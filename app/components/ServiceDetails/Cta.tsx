"use client";

import Image from "next/image";
import Link from "next/link";
import { assets } from "@/public/assets/assets";
import { SecondSectionThirdSection } from "../expertise/type";

interface CtaProps {
  data: SecondSectionThirdSection;
}

const Cta = ({ data }: CtaProps) => {
  return (
    <section className="relative overflow-x-clip pt-47px pb-57px 3xl:py-[90.05px] bg-light-white dark:bg-black">
      <div className="pointer-events-none select-none" aria-hidden="true">
        <Image src={data.image} alt={data.imageAlt} width={500} height={500} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 h-full w-full bg-black/80 xl:bg-[linear-gradient(270deg,rgba(0,0,0,0.75)_41.12%,rgba(0,0,0,0.1875)_100%)]" />
      <div className="container">
        <div className="relative z-10">
          <h2 className=" text-4xl xl:text-5xl leading-lh-text68 font-normal text-white mb-4 xl:mb-[87px]">
            {data.title}
          </h2>
          <div className="lg:w-2/4 ml-auto">
            <p className="text-lg leading-lh-text24 text-white font-light">
              {data.description}
            </p>
            <Link href={data.slug}
              className="flex items-center justify-between gap-4 bg-light-white dark:bg-white rounded-3xl w-fit py-2 px-30px xl:py-2 xl:px-40px  transition-all duration-300 hover:bg-primary hover:text-white text-black mt-6 xl:mt-[67px] text-base leading-[1.75] group"
            >
              {data.buttonText}
              <Image src={assets.singleGreenArrow} alt="arrow-right" width={20} height={20} className="transition-all duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
