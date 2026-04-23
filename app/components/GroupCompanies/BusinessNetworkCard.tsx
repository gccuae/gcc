"use client";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { SecondSectionItem } from "./type";

interface BusinessNetworkCardProps {
  item: SecondSectionItem;
  index: number;
  hasLink: boolean;
}

const BusinessNetworkCard = ({ item, index, hasLink }: BusinessNetworkCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const animationRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Smooth interpolation function
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  // Animate position smoothly
  useEffect(() => {
    const animate = () => {
      setCurrentPosition((prev) => ({
        x: lerp(prev.x, targetPosition.x, 0.1),
        y: lerp(prev.y, targetPosition.y, 0.1),
      }));

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isHovering) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetPosition, isHovering]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setTargetPosition({ x, y });
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  return (
    <div key={index} className="group pb-3 xl:pb-[17px] transition-all duration-300 flex flex-col justify-between h-full" >
      {/* Top: Image + title */}
      <div>
        <div className="relative isolate p-3 xl:p-5 h-[300px] xl:h-[486px] overflow-hidden group/img"
          ref={containerRef}
          onMouseMove={!isMobile && hasLink ? handleMouseMove : undefined}
          onMouseEnter={!isMobile && hasLink ? handleMouseEnter : undefined}
          onMouseLeave={!isMobile && hasLink ? handleMouseLeave : undefined}
        >
          <Image src={item.image} alt={item.imageAlt} width={1000} height={1000} className="w-full h-full object-cover absolute inset-0 z-0 transition-all duration-300" />

          <div className="relative z-10 bg-white rounded-[5px] w-[175px] max-h-[45px] flex items-center justify-center px-3 py-5">
            <Image src={item.logo} alt={item.logoAlt} width={400} height={400} className="w-auto h-10 xl:h-[38px] object-contain"
            />
          </div>
          {hasLink && (
            <div className="absolute bottom-0 left-0 z-10 w-full h-0 bg-black/45 group-hover:h-full transition-all duration-300"></div>
          )}

          {/* Hover link (mouse follow + centered option) */}
          {hasLink && (
            <div className="absolute pointer-events-none z-20 transition-opacity duration-300 ease-out"
              style={{
                left: `${currentPosition.x}px`,
                top: `${currentPosition.y}px`,
                transform: "translate(-50%, -50%)",
                opacity: isHovering ? 1 : 0,
                scale: isHovering ? 1 : 0.8,
              }}
            >
              <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center xl:w-20 xl:h-20 transition-transform duration-200">
                <Image src={assets.linkArrowGreen} alt="arrow" width={20} height={20} className="w-5 h-5 object-contain xl:w-[19px] xl:h-[19px]" />
              </div>
            </div>
          )}
          {hasLink && (
            <div className="absolute top-50 left-50 opacity-0 group-hover:opacity-100 group-hover/img:opacity-0 pointer-events-none z-20 transition-opacity duration-300 ease-out">
              <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center xl:w-20 xl:h-20 transition-transform duration-200">
                <Image src={assets.linkArrowGreen} alt="arrow" width={20} height={20} className="w-5 h-5 object-contain xl:w-[19px] xl:h-[19px]" />
              </div>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-5 xl:mt-[27px] text-xl xl:text-2xl leading-[1.3] xl:leading-1h-text32 font-normal group-hover:text-black dark:group-hover:text-secondary dark:text-white mb-[2px] lg:mb-[7px]">
          {item.title}
        </h3>

        {/* Bottom: Description */}
        <div>
          <h4 className="text-lg xl:text-xl leading-normal font-light mb-0 text-para-color dark:text-white/70">
            {item.category}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default BusinessNetworkCard;
