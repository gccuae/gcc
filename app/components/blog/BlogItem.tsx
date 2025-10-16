// Individual BlogItem component with isolated mouse tracking
"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import { BlogData } from "./type";

export const BlogItem = ({
  item,
  index,
}: {
  item: BlogData['categories'][number]['blogs'][number];
  index: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const animationRef = useRef<number>(0);

  // Smooth interpolation function
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  // Animate position smoothly
  useEffect(() => {
    const animate = () => {
      setCurrentPosition((prev) => ({
        x: lerp(prev.x, targetPosition.x, 0.1), // 0.1 is the smoothness factor (lower = smoother but slower)
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
    <div className="relative group border-b border-smgray hover:border-primary pb-2 md:pb-27px transition-all duration-300">
      <div
        className={`${
          index % 2 === 0 ? "h-[300px] xl:h-[415px]" : "h-[200px] xl:h-[280px]"
        } p-3 xl:p-5 overflow-hidden group/img relative`}
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={item.thumbnail}
          alt={item.thumbnailAlt}
          width={1000}
          height={1000}
          className="w-full h-full object-cover absolute top-0 left-0 group-hover:blur-[4px] group-hover:backdrop-blur-xl transition-all duration-300"
        />
        <div className="absolute bottom-0 left-0 w-full h-0 bg-black opacity-25 group-hover:h-full transition-all duration-300 z-10"></div>
        <div
          className="absolute pointer-events-none z-20 transition-opacity duration-300 ease-out"
          style={{
            left: `${currentPosition.x}px`,
            top: `${currentPosition.y}px`,
            transform: "translate(-50%, -50%)",
            opacity: isHovering ? 1 : 0,
            scale: isHovering ? 1 : 0.8,
          }}
        >
          <Link
            href={`/blog/${item.slug}`}
            rel="noopener noreferrer"
            className="bg-white rounded-full w-6 h-6 flex items-center justify-center xl:w-20 xl:h-20 pointer-events-auto transition-transform duration-200 hover:scale-110 group-hover:opacity-100 "
          >
            <Image
              src={assets.linkArrowGreen}
              alt="arrow"
              width={20}
              height={20}
              className="w-6 h-6 object-contain xl:w-[19px] xl:h-[19px]"
            />
          </Link>
        </div>
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 opacity-0 group-hover:opacity-100 group-hover/img:opacity-0 transition-opacity duration-300 ease-out">
          <Link
            href={`/blog/${item.slug}`}
            rel="noopener noreferrer"
            className="bg-white rounded-full w-6 h-6 flex items-center justify-center xl:w-20 xl:h-20 pointer-events-auto transition-transform duration-200 hover:scale-110 group-hover:opacity-100 "
          >
            <Image
              src={assets.linkArrowGreen}
              alt="arrow"
              width={20}
              height={20}
              className="w-6 h-6 object-contain xl:w-[19px] xl:h-[19px]"
            />
          </Link>
        </div>
      </div>
      <div className="mt-5 xl:mt-[27px] relative">
        <div className="flex justify-between items-center mb-2 xl:mb-[12px]">
          <p className="text-[15px] 3xl:text-base uppercase leading-lh-text19 font-light text-foreground dark:text-white/70">
            {item.category}
          </p>
          <p className="text-[15px] 3xl:text-base leading-lh-text19 font-light text-foreground dark:text-white/70">
            {item.date ? new Date(item.date).toLocaleDateString("en-GB").replace(/\//g, "-") : new Date(item.createdAt).toLocaleDateString("en-GB").replace(/\//g, "-")}
          </p>
        </div>
        <h3 className="text-xl leading-normal font-normal mb-3 xl:mb-[12px] text-black dark:text-white">
          {item.title}
        </h3>
      </div>
    </div>
  );
};
