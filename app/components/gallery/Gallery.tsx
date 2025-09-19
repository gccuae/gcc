"use client";
import React, { useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryData } from './data';
import { assets } from '@/public/assets/assets';
import Image from 'next/image';
// Sample data structure


interface GalleryItem {
  id: number;
  title: string;
  gallery: string[];
}

interface LightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        >
          <X size={32} />
        </button>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
          >
            <ChevronRight size={32} />
          </button>
        )}

        {/* Image */}
        <Image src={images[currentIndex]} alt={`Gallery image ${currentIndex + 1}`} width={1920} height={1280} className="w-full h-full object-contain" onClick={(e) => e.stopPropagation()} />

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

const GalleryCard: React.FC<{ item: GalleryItem; onOpenLightbox: (images: string[], startIndex: number) => void }> = ({
  item,
  onOpenLightbox
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    onOpenLightbox(item.gallery, 0);
  };

  const getCircularImages = () => {
    const maxCircles = 3;
    const displayImages = item.gallery.slice(0, maxCircles);

    return displayImages.map((image, index) => {
      const isLast = index === maxCircles - 1;
      const hasMoreThan9 = item.gallery.length > 9;

      return (
        <div key={index} className="relative flex last:-ml-2">
          <div className={`w-8 h-8 xl:w-[50px] xl:h-[50px] rounded-full overflow-hidden border-1 border-white shadow-sm ${index % 2 === 0 ? '' : '-ml-2'}`}>
            <Image width={50} height={50} src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </div>
          {isLast && hasMoreThan9 && (
            <div className="absolute inset-0 bg-black/38 rounded-full flex items-center justify-center">
              <span className="text-white text-xs xl:text-sm font-semibold">09+</span>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="overflow-hidden transition-transform group border-b border-smgray hover:border-primary transition-colors duration-300">
      {/* Header Image */}
      <div className="relative h-48 xl:h-[475px] overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <Image width={1920} height={1280} src={item.gallery[0]} alt={item.title} className="w-full h-full object-cover group-hover:blur-[2px] transition-transform" />

        {/* Hover Icon */}
        {/* {isHovered && ( */}
        <div className="absolute inset-0 bg-white/12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 xl:w-20 xl:h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Image src={assets.expandPlusIcon} alt="Eye" width={30} height={30} className={`w-full h-full xl:w-[29.99px] xl:h-[29.99px] object-contain transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
          </div>
        </div>
        {/* )} */}
      </div>

      {/* Card Content */}
      <div className="flex items-center justify-between py-5 xl:py-8">
        <h3 className="text-xl lg:text-2xl leading-[1] font-normal text-black dark:text-white">{item.title}</h3>

        {/* Circular Images */}
        <div className="flex">
          {getCircularImages()}
        </div>
      </div>
    </div>
  );
};

const Gallery: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);

  const openLightbox = (images: string[], startIndex: number) => {
    setCurrentImages(images);
    setCurrentImageIndex(startIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImages([]);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === currentImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? currentImages.length - 1 : prev - 1
    );
  };

  const [visibleCount, setVisibleCount] = useState(8);
  const totalAlbum = galleryData.items.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev ? prev + 3 : 8);
  };

  const handleShowLess = () => {
    setVisibleCount((prev) => prev ? prev - 3 : 6);
    // window.scrollTo({ top: sectionRef.current?.offsetTop || 0, behavior: "smooth" });
    // sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    if (sectionRef.current) {
      const elementTop = sectionRef.current.offsetTop;
      const offsetPosition = elementTop - 200; // Add 100px padding from top

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="min-h-screen pb-57px" ref={sectionRef}>
      <div className="container">

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-30px gap-y-47px">
          {galleryData.items.slice(0, visibleCount + 1).map((item) => (
            <GalleryCard key={item.id} item={item} onOpenLightbox={openLightbox} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          {visibleCount < totalAlbum ? (
            <button onClick={handleLoadMore} className="px-6 py-2 bg-light-white text-black rounded-3xl border border-mdgray uppercase flex items-center gap-2 transition" >
              <span>Load More</span>
              <Image src={assets.singleGreenArrow} alt="arrow" width={20} height={20} className="inline rotate-90" />
            </button>
          ) : totalAlbum > 6 ? (
            <button onClick={handleShowLess} className="px-6 py-2 bg-light-white text-black rounded-3xl border border-mdgray uppercase flex items-center gap-2 transition" >
              <span>Show Less</span>
              <Image src={assets.singleGreenArrow} alt="arrow" width={20} height={20} className="inline -rotate-90" />
            </button>
          ) : null}
        </div>

      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        images={currentImages}
        currentIndex={currentImageIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
};

export default Gallery;