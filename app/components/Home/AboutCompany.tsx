"use client"

import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import BtnPrimary from "../common/BtnPrimary";
import { motion } from "framer-motion";
import { moveUp } from "../../components/motionVarients"
const AboutCompany = () => {

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video?.paused) {
      // video?.play();
      // setIsPlaying(true);

      setIsPopupOpen(true)
    } else {
      setIsPopupOpen(false)
      setIsPlaying(false);
    }
  };
  useEffect(() => {
    if (isPopupOpen) {
      console.log("make hidden")
      document.documentElement.style.overflow = "hidden"; // Disable scroll
    } else {
      console.log("make bla")
      document.documentElement.style.overflow = "auto";// Re-enable scroll
    }

    return () => {
      document.body.style.overflow = ""; // Ensure reset on unmount
    };
  }, [isPopupOpen]);
  return (
    <section className="py-12 xl:py-25">
      <div className="container">
        <div className="lg:flex gap-8 xl:gap-17 ">
          <motion.div variants={moveUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="relative w-full lg:w-[48%] mb-8 lg:mb-0">
            <video
              ref={videoRef}
              poster="/assets/img/home/video-poster.jpg"
              controls={false}
              className="h-full object-cover"
              width={1080}
              height={740}
              playsInline
              onEnded={() => setIsPlaying(false)}
            >

              Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 flex items-center justify-center">
              {!isPlaying && (
                <button
                className="cursor-pointer transition-transform duration-300 hover:scale-110"
                onClick={togglePlay}
              >
                <Image
                  src={"/assets/img/icons/play.svg"}
                  alt="Play"
                  width={52}
                  height={52}
                />
              </button>
              )}
            </div>
            {isPopupOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-[#00000090]  z-50">
                <div className="relative w-[90%] max-w-[1080px]">
                  {/* Close Button */}
                  <button
                    className="absolute z-10 right-5 top-5 cursor-pointer bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-100 transition size-10"
                    onClick={() => setIsPopupOpen(false)}
                  >
                    ✖
                  </button>

                  {/* Video Player */}
                  <video
                    className="w-full h-full rounded-lg object-cover"
                    src="/assets/img/abt_bnr.mp4"
                    poster="/assets/img/home/video-poster.jpg"
                    width={1080}
                    height={740}
                    controls
                    autoPlay
                  />
                </div>
              </div>
            )}
          </motion.div>
          <div className="w-full lg:w-[52%]">
            <motion.p variants={moveUp(0.5)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="text-2xl font-light text-foreground mb-10 lg:mb-20 xl:mb-29">GCC, <span className="font-semibold text-primary">established in 1988</span>, is known for innovation and excellence in construction, with projects ranging from infrastructure and defense to industrial, commercial, and residential developments.</motion.p>
            <motion.div variants={moveUp(1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <BtnPrimary link={'#'} text="About Company" bgtrans={false} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCompany;