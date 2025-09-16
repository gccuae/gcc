"use client";

import Image from "next/image";

type Props = {
  title: string;
  description: string;
  matters: {
    title: string;
    thumbnail: string;
    images: string[];
  }[];
};

const EnvironmentalResponsibility = ({
  title,
  description,
  matters,
}: Props) => {
  return (
    <section className="py-57px bg-white dark:bg-black">
      <div className="container">
        {/* Title */}
        <h2 className="text-5xl md:text-6xl font-light leading-lh-title text-black dark:text-white mb-27px">
          {title}
        </h2>

        {/* Description */}
        <p className="text-lg leading-lh-text19 font-light text-forground dark:text-white max-w-[100ch] mb-57px">
          {description}
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-30px gap-20px">
          {matters.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col overflow-hidden border-b border-gray-200 hover:border-primary transition-all duration-300 pb-27px xl:pb-[31px]"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={486}
                  height={475}
                  className="object-cover max-w-[486px] max-h-[475px] group-hover:scale-[1.02] transition-all duration-300 group-hover:blur-[2px]"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </div>

              <div className="mt-[27px] flex justify-between items-center">
                {/* Title */}
                <h3 className="text-xl font-medium text-black dark:text-white leading-lh-text32">
                  {item.title}
                </h3>
                {/* Small images row */}
                <div className="flex justify-center gap-2">
                  {item.images.map((img, i) => (
                    <div
                      key={i}
                      className="w-[50px] h-[50px] rounded-full overflow-hidden border border-gray-200 -ml-4"
                    >
                      <Image
                        src={img}
                        alt={`${item.title} ${i + 1}`}
                        width={50}
                        height={50}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnvironmentalResponsibility;
