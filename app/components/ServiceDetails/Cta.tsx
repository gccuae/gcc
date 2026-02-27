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
    <section className="py-57px xl:py-[90.05px] bg-light-white dark:bg-black relative overflow-hidden">
      <div>
        <Image
          src={data.image}
          alt={data.imageAlt}
          width={500}
          height={500}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div
        style={{
          background:
            "linear-gradient(270deg, rgba(0, 0, 0, 0.75) 41.12%, rgba(0, 0, 0, 0.1875) 100%)",
        }}
        className="absolute inset-0 w-full h-full z-10"
      />
      <div className="container">
        <div className="relative z-10">
          <h2 className="text-5xl leading-lh-text68 font-normal text-white mb-15 xl:mb-[87px]">
            {data.title}
          </h2>
          <div className="lg:w-2/4 ml-auto">
            <p className="text-lg leading-lh-text24 text-white font-light">
              {data.description}
            </p>
            <Link
              href={data.slug}
              className="flex items-center justify-between gap-4 bg-light-white dark:bg-white rounded-3xl w-fit py-15px px-30px xl:py-20px xl:px-40px 
            transition-all duration-300 hover:bg-primary hover:text-white text-black px-5 py-2 mt-12 xl:mt-[67px] text-base leading-[1.75] group"
            >
              {data.buttonText}
              <Image
                src={assets.singleGreenArrow}
                alt="arrow-right"
                width={20}
                height={20}
                className="transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-x-0"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
