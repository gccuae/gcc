"use client";

import React from "react";
import { FifthSection } from "./type";
import Link from "next/link";

const LocationDetails = ({ data }: { data: FifthSection }) => {
  return (
    <section className="py-[57px]">
      <div className="container flex flex-col lg:flex-row gap-6 lg:gap-[30px]">
        {/* LEFT SECTION */}
        <div className="w-full lg:w-1/2 bg-black text-white p-6 lg:p-[30px] flex flex-col justify-center">
          <h2 className="text-2xl leading-[1.32] mb-3">{data.title}</h2>
          <p className="text-lg mb-[62px] text-white/80 font-light leading-[1.52] lg:max-w-[90%]">
            {data.description}
          </p>
          <Link href={data.buttonLink} target="_blank">
            <button className="w-fit border border-[#7AC142] text-white px-[30px] py-[15px] rounded-full text-base uppercase hover:bg-[#7AC142] hover:text-black transition-colors bg-white/10 backdrop-blur-md">
              {data.buttonTitle}
            </button>
          </Link>
        </div>

        {/* RIGHT SECTION (MAP) */}
        <div className="w-full lg:w-1/2">
          <iframe
            src={data.map}
            className="w-full h-[350px] lg:h-full"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default LocationDetails;
