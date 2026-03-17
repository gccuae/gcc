"use client";

import React from "react";
import { FifthSection } from "./type";
import Link from "next/link";
import { motion } from "framer-motion";
import { moveUp } from "../motionVarients";

const LocationDetails = ({ data }: { data: FifthSection }) => {
    return (
        <section className="pt-47px md:pt-57px pb-57px">
            <div className="container flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-[30px]">
                {/* LEFT SECTION */}
                <motion.div variants={moveUp(0.2)} initial="hidden" whileInView="show" className="w-full lg:w-1/2 bg-black text-white px-4 pt-6 pb-8 lg:p-[30px] flex flex-col justify-center" >
                    <h2 className="text-2xl leading-[1.32] mb-3">{data.title}</h2>
                    <p className="text-lg mb-[35px] xl:mb-[62px] text-white/80 font-light leading-[1.52] lg:max-w-[90%]">
                        {data.description}
                    </p>
                    {data.buttonTitle && <motion.div variants={moveUp(0.6)} initial="hidden" whileInView="show">
                        <Link href={data?.buttonLink || "#"} target={data?.buttonLink?.trim() ? "_blank" : undefined} className={!data?.buttonLink?.trim() ? "pointer-events-none" : ""} >
                            <button
                                type="button"
                                disabled={!data?.buttonLink?.trim()}
                                className={`w-fit border border-[#7AC142] text-white px-[20px] xl:px-[30px] py-[11px] xl:py-[15px] rounded-full text-base uppercase transition-colors bg-white/10 backdrop-blur-md ${data?.buttonLink?.trim() ? "cursor-pointer hover:bg-[#7AC142] hover:text-black" : "cursor-default"}`}
                            >
                                {data.buttonTitle}
                            </button>
                        </Link>
                    </motion.div>}
                </motion.div>

                {/* RIGHT SECTION (MAP) */}
                <motion.div variants={moveUp(0.4)} initial="hidden" whileInView="show" className="w-full lg:w-1/2">
                    <iframe src={data.map} className="w-full h-[350px] lg:h-full" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" ></iframe>
                </motion.div>
            </div>
        </section>
    );
};

export default LocationDetails;
