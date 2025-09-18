"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import gsap from "gsap";
import { Thumbs, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import { Swiper as SwiperType } from "swiper";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, moveUp } from "../motionVarients";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AreaOfExpertiseProps {
  data: {
    title: string;
    items: {
      id: number;
      title: string;
      description: string;
      image: string | StaticImageData;
      slug: string;
      icon: string | StaticImageData;
    }[];
  };
}

const SocialImpact = ({ data }: AreaOfExpertiseProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

  const handleSlideHover = (index: number) => {
    if (mainSwiper) {
      mainSwiper.slideTo(index);
    }
  };

  useEffect(() => {
    // Setup responsive GSAP effects
    ScrollTrigger.matchMedia({
      // Run only on tablet and above (min-width: 768px, adjust as needed)
      "(min-width: 768px)": function () {
        // Parallax images
        gsap.utils
          .toArray<HTMLElement>(".slide-container")
          .forEach((container) => {
            const img = container.querySelector(".slide-img");
            if (!img) return;

            gsap.fromTo(
              img,
              { y: "-10vh" },
              {
                y: "10vh",
                ease: "none",
                scrollTrigger: {
                  trigger: container,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          });

        // Text fade
        gsap.utils.toArray<HTMLElement>(".slide-text").forEach((text) => {
          gsap.fromTo(
            text,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: text,
                start: "top 80%",
              },
            }
          );
        });

        // Button fade
        gsap.utils.toArray<HTMLElement>(".slide-btn").forEach((btn) => {
          gsap.fromTo(
            btn,
            { y: 30, opacity: 1 }, // opacity 0 to fade in properly
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power3.out",
              scrollTrigger: {
                trigger: btn,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill()); // cleanup
    };
  }, []);

  return (
    <section className="wrapper py-57px overflow-hidden bg-black">
      <div className="container">
        <motion.h2
          variants={moveUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-5xl font-normal leading-[1.147058823529412] text-black mb-5 xl:mb-[37px] text-white"
        >
          {data.title}
        </motion.h2>
        <div>
          <Swiper
            className="area-of-expertise-thumbs greenslide"
            onSwiper={setThumbsSwiper}
            spaceBetween={0}
            slidesPerView={3.8}
            modules={[Thumbs]}
            loop={true}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2.5,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 3.8,
              },
            }}
            watchSlidesProgress
          >
            {data.items.map((item, index) => (
              <SwiperSlide
                key={item.id}
                className="cursor-pointer transition mb-4 xl:mb-[65px] group"
                onMouseEnter={() => handleSlideHover(index)}
              >
                <div className="transition-colors duration-400 pb-4 mb-6 xl:pb-[37px] mb-6 xl:mb-[42px] relative">
                  <motion.div
                    variants={fadeIn(index * 0.25)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="flex items-center justify-center rounded-full bg-white w-[85px] h-[85px] group-hover:bg-primary transition-all duration-300 icon-wrapper"
                  >
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={200}
                      height={200}
                      className="mb-2 w-10 h-10 object-contain group-hover:brightness-0 group-hover:invert-100"
                    />
                  </motion.div>
                  <div className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-smgray -z-[1]">
                    {" "}
                  </div>
                  <div className="hoverline absolute bottom-[-8px] left-0 w-0 h-[6px] bg-secondary -z-[1] transition-all duration-300 group-hover:w-full rounded-sm">
                    {" "}
                  </div>
                </div>
                <motion.h3
                  variants={moveUp(index * 0.12)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                  className="text-xl text-white/80 font-normal leading-sm xl:leading-[1]  group-hover:text-white transition-all duration-300"
                >
                  {item.title}
                </motion.h3>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Content Swiper */}
          <div className="relative">
            <Swiper
              onSwiper={setMainSwiper}
              thumbs={{ swiper: thumbsSwiper }}
              slidesPerView={1}
              spaceBetween={30}
              modules={[Thumbs, EffectFade]}
              loop={true}
              speed={800}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              className="px-6"
            >
              {data.items.map((item) => (
                <SwiperSlide key={item.id}>
                  {/* <div className="slide-container grid md:grid-cols-2 xl:grid-cols-[6fr_6fr] gap-[20px] md:gap-[30px] lg:gap-[50px] xl:gap-[70px] 2xl:gap-[95px] items-center">
                    <div className="img-wrapper slide-img">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={775}
                        height={483}
                        className="w-full xl:w-[705px] max-w-[775px] h-[350px] lg:h-[433px] xl:h-[483px] object-cover"
                      />
                    </div>

                    <div className="">
                      <h3 className="text-2xl font-normal leading-[1.5625] mb-2 xl:mb-3 text-white   transition-all duration-300 ">
                        {" "}
                        {item.title}
                      </h3>
                      <p className="text-lg font-[300] leading-[1.526315789473684] text-foreground text-white/80 transition-all duration-300 w-full">
                        {item.description.split("\n").map((line, i) => (
                          <span
                            key={i}
                            className="block slide-text mt-4 xl:mt-6"
                          >
                            {line}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div> */}
                  <div className="slide-container grid grid-cols-1 md:grid-cols-2 gap-[20px] md:gap-[30px] lg:gap-[50px] xl:gap-[70px] 2xl:gap-[95px] items-center">
                    {/* Image */}
                    <div className="img-wrapper slide-img w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={775}
                        height={483}
                        className="w-full max-w-[775px] h-[350px] lg:h-[433px] xl:h-[483px] object-cover"
                      />
                    </div>

                    {/* Text */}
                    <div className="w-full">
                      <h3 className="text-2xl font-normal leading-[1.5625] mb-2 xl:mb-3 text-white transition-all duration-300">
                        {item.title}
                      </h3>

                      <p className="text-lg font-light leading-[1.526315789473684] transition-all duration-300 w-full text-white/80">
                        {item.description.split("\n").map((line, i) => (
                          <span
                            key={i}
                            className="block slide-text mt-4 xl:mt-6"
                          >
                            {line}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialImpact;
