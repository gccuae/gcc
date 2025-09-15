"use client";

import Image from "next/image";

type Props = {
  title: string;
  description: string;
  image: string;
  certifications: { name: string; icon: string }[];
};

const QualityAssurance = ({
  title,
  description,
  image,
  certifications,
}: Props) => {
  return (
    <section className="bg-light-white dark:bg-black py-57px">
      <div className="container flex flex-col-reverse lg:flex-row items-center gap-[35px] xl:gap-[70px]">
        {/* Left Image */}
        <div className="w-full lg:w-[49%]">
          <Image
            src={image}
            alt="Quality Assurance"
            width={705}
            height={502}
            className="object-cover w-full h-[402px] lg:h-[502px]"
          />
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-[51%]">
          <h2 className="text-5xl text-black dark:text-white leading-lh-title">
            {title}
          </h2>
          {description.split("\n").map((para, index) => (
            <p
              key={index}
              className="text-lg text-foreground dark:text-white font-light leading-lh-text19 mt-3 md:mt-6"
            >
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-[23px] md:mt-[46px]">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className={`
        flex flex-col items-center py-[11px] px-[20px] xl:px-[82px] border border-smgray
        ${
          index % 5 !== 0 ? "border-l-0" : ""
        }   // remove left border except first in row
        ${
          index >= 5 ? "border-t-0" : ""
        }        // remove top border except first row
      `}
          >
            <Image src={cert.icon} alt={cert.name} width={120} height={120} />
            <p className="mt-[12px] font-light text-sm text-foreground dark:text-white">
              {cert.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QualityAssurance;
