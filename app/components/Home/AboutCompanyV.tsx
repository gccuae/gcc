"use client";

import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import BtnPrimary from "../common/BtnPrimary";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import parse, { domToReact, DOMNode, Element } from "html-react-parser";
import { motion } from "framer-motion";
import { moveRight } from "../motionVarients";
import { FirstSection } from "./type";

interface Props {
  data: FirstSection;
}
gsap.registerPlugin(ScrollTrigger);

const AboutCompanyV = ({ data }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const btnRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isModalVideoReady, setIsModalVideoReady] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video?.paused) {
      setIsPopupOpen(true);
    } else {
      setIsPopupOpen(false);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.documentElement.style.overflow = "auto";
      document.documentElement.style.paddingRight = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.paddingRight = "";
    };
  }, [isPopupOpen]);

  useEffect(() => {
    if (!isPopupOpen) {
      setIsModalVideoReady(false);
    }
  }, [isPopupOpen]);

  // 🔹 GSAP animations

  const splitNode = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden mr-2">
        <span className="inline-block translate-y-full opacity-0">{word}</span>
      </span>
    ));
  };

  function splitTextToSpans(html: string) {
    return parse(html, {
      replace: (domNode: DOMNode) => {
        if (domNode.type === "text") {
          return <>{splitNode(domNode.data || "")}</>;
        }

        if (domNode.type === "tag") {
          const el = domNode as Element;

          // Process class for inline color
          let inlineStyle = "";
          let remainingClasses = "";

          if (el.attribs?.class) {
            const classes = el.attribs.class.split(" ");
            const newClasses: string[] = [];

            classes.forEach((cls) => {
              const colorMatch = cls.match(/^text-\[(#[0-9A-Fa-f]{3,6})\]$/);
              if (colorMatch) {
                inlineStyle = `color:${colorMatch[1]}`;
              } else {
                newClasses.push(cls);
              }
            });

            remainingClasses = newClasses.join(" ");
          }

          return (
            <span
              className={remainingClasses}
              style={
                inlineStyle ? { color: inlineStyle.split(":")[1] } : undefined
              }
            >
              {domToReact(el.children as DOMNode[], {
                replace: (child) =>
                  child.type === "text" ? (
                    <>{splitNode(child.data || "")}</>
                  ) : undefined,
              })}
            </span>
          );
        }
      },
    });
  }

  useEffect(() => {
    if (!containerRef.current || !videoRef.current || !textRef.current) return;

    // Animate split text
    gsap.to(textRef.current.querySelectorAll("span > span"), {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.05,

      ease: "power3.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 93%",
        markers: false,
      },
    });

    // Button fade-up
    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className={`py-8 md:py-12 xl:py-15 dark:bg-black overflow-hidden ${data.hidden ? "hidden" : ""}`}
    >
      <div className="container">
        <div className="lg:flex gap-8 xl:gap-17">
          {/* Video Block */}
          <motion.div
            variants={moveRight(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative w-full h-full lg:w-[48%] mb-8 lg:mb-0 overflow-hidden"
          >
            <video
              ref={videoRef}
              poster={data.poster}
              controls={false}
              className="xl:h-[400px] 2xl:h-[431px] w-full 2xl:max-w-[705px] object-cover hover:scale-110"
              width={705}
              height={740}
              playsInline
              preload="metadata"
              onEnded={() => setIsPlaying(false)}
            >
              Your browser does not support the video tag.
            </video>

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              {!isPlaying && (
                <button className="cursor-pointer transition-transform duration-300 hover:scale-110" onClick={togglePlay} >
                  <Image src={"/assets/img/icons/play.svg"} alt="Play" width={52} height={52} />
                </button>
              )}
            </div>

            {/* Popup Video */}
            {isPopupOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-6">
                <div className="relative w-full max-w-[1080px] overflow-hidden rounded-lg bg-black aspect-[1080/740] max-h-[70vh] sm:max-h-[75vh] md:max-h-[78vh] lg:max-w-[960px] lg:h-[66vh] lg:max-h-[66vh] xl:max-w-[980px] xl:h-[68vh] xl:max-h-[68vh] 2xl:max-w-[1080px] 2xl:h-[72vh] 2xl:max-h-[72vh]">
                  {/* Close Button */}
                  <button className="absolute z-10 right-5 top-5 cursor-pointer bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-100 transition size-10 dark:text-black"
                    onClick={() => setIsPopupOpen(false)}
                    aria-label="Close video modal"
                  >
                    ✖
                  </button>

                  {/* Video Player */}
                  {!isModalVideoReady && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    </div>
                  )}
                  <video
                    className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ${isModalVideoReady ? "opacity-100" : "opacity-0"}`}
                    src={data.video}
                    width={1080}
                    height={740}
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    onLoadedData={() => setIsModalVideoReady(true)}
                  />
                </div>
              </div>
            )}
          </motion.div>

          {/* Text Block with Split Animation */}
          <div className="w-full lg:w-[52%]">
            <p ref={textRef} className="text-lg xl:text-[1.5rem] 2xl:text-[30px] font-light text-para-color mb-5 md:mb-8 lg:mb-12 2xl:mb-20 3xl:mb-24 dark:text-white leading-[1.3] 2xl:leading-[1.3]" >
              {splitTextToSpans(data.description)}
            </p>

            <div ref={btnRef}>
              <BtnPrimary link={"/about-us"} text={data.buttonText} bgtrans={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompanyV;
