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
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "";
    };
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
      className="py-8 md:py-12 xl:py-15 dark:bg-black overflow-hidden"
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
              className="h-full w-full object-cover hover:scale-110"
              width={1080}
              height={740}
              playsInline
              onEnded={() => setIsPlaying(false)}
            >
              Your browser does not support the video tag.
            </video>

            {/* Play Button */}
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

            {/* Popup Video */}
            {isPopupOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-[#00000090] z-50">
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
                    src={data.video}
                    poster={data.poster}
                    width={1080}
                    height={740}
                    controls
                    autoPlay
                  />
                </div>
              </div>
            )}
          </motion.div>

          {/* Text Block with Split Animation */}
          <div className="w-full lg:w-[52%]">
            <p
              ref={textRef}
              className="text-lg xl:text-[30px] font-light text-foreground mb-5 md:mb-8 xl:mb-20 xl:mb-29 dark:text-white leading-[1.3]"
            >
              {splitTextToSpans(data.description)}
            </p>

            <div ref={btnRef}>
              <BtnPrimary
                link={"/about-us"}
                text={data.buttonText}
                bgtrans={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompanyV;
