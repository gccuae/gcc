"use client";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { NewsData } from "./type";

const NewsCard = ({ item, index }: { item: NewsData['categories'][number]['news'][number], index: number }) => {
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
      setCurrentPosition(prev => ({
        x: lerp(prev.x, targetPosition.x, 0.1), // 0.1 is the smoothness factor (lower = smoother but slower)
        y: lerp(prev.y, targetPosition.y, 0.1)
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
    <div key={index} className="relative border-b border-smgray hover:border-primary pb-27px group transition-all duration-300">
      <div className="relative p-3 xl:p-5 h-[300px] xl:h-[486px] overflow-hidden group/img"
        ref={containerRef} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
        <Image src={item.thumbnail} alt={item.thumbnailAlt} width={1000} height={1000} className="w-full h-full object-cover absolute top-0 left-0   group-hover:blur-[4px] group-hover:backdrop-blur-xl transition-all duration-300" />
        <div className="absolute bottom-0 left-0 w-full h-0 bg-black opacity-25 group-hover:h-full transition-all duration-300"></div>
        <div
          className="absolute pointer-events-none z-20 transition-opacity duration-300 ease-out"
          style={{
            left: `${currentPosition.x}px`,
            top: `${currentPosition.y}px`,
            transform: 'translate(-50%, -50%)',
            opacity: isHovering ? 1 : 0,
            scale: isHovering ? 1 : 0.8,
          }}
        >
          <Link href={`/news/${item.slug}`} rel="noopener noreferrer" className="bg-white rounded-full w-6 h-6 flex items-center justify-center xl:w-20 xl:h-20 pointer-events-auto transition-transform duration-200 hover:scale-110 group-hover:opacity-100 ">
            <Image src={assets.linkArrowGreen} alt="arrow" width={20} height={20} className="w-6 h-6 object-contain xl:w-[19px] xl:h-[19px]" />
          </Link>
        </div>
        <div className="absolute top-50 left-50 pointer-events-none z-20 opacity-0 group-hover:opacity-100 group-hover/img:opacity-0 transition-opacity duration-300 ease-out" >
          <Link href={`/news/${item.slug}`} rel="noopener noreferrer" className="bg-white rounded-full w-6 h-6 flex items-center justify-center xl:w-20 xl:h-20 pointer-events-auto transition-transform duration-200 hover:scale-110 group-hover:opacity-100 ">
            <Image src={assets.linkArrowGreen} alt="arrow" width={20} height={20} className="w-6 h-6 object-contain xl:w-[19px] xl:h-[19px]" />
          </Link>
        </div>

      </div>
      <div className="mt-5 xl:mt-[27px] relative">
        <div className="flex justify-between items-center mb-2 xl:mb-[12px]">
          <p className="text-lg leading-lh-text19 font-light dark:text-white">{item.category}</p>
          <p className="text-lg leading-lh-text19 font-light dark:text-white">{item.date ? new Date(item.date).toLocaleDateString("en-GB").replace(/\//g, "-") : new Date(item.createdAt).toLocaleDateString("en-GB").replace(/\//g, "-")}</p>
        </div>
        <h3 className="text-xl md:text-2xl leading-normal font-normal mb-1 md:mb-3 xl:mb-[12px] text-black dark:text-white">{item.title}</h3>
        <h4 className="text-lg leading-normal font-normal mb-0 dark:text-white line-clamp-4 !overflow-hidden !text-ellipsis">{item.description}</h4>
      </div>
    </div>
  );
}

export default NewsCard;