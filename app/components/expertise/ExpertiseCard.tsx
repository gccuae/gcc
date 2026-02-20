import Image from "next/image";
import { assets } from "@/public/assets/assets";
import Link from "next/link";
import { SecondSectionItem } from "./type";

interface ExpertiseCardProps {
  item: SecondSectionItem;
  index: number;
}

const ExpertiseCard = ({ item, index }: ExpertiseCardProps) => {
  return (
    <div
      key={index}
      className="flex flex-col justify-between border-b dark:border-white/20 pb-3 lg:pb-4 xl:pb-[25px] group transition-all duration-300"
    >
      <Link href={`/expertise/${item.slug}`} className="flex flex-col h-full">
        <div className="mb-4 xl:mb-[17px] overflow-hidden relative h-[300px] xl:h-[486px] p-4 xl:p-[27px] flex justify-end items-end">
          <Image
            src={item.image}
            alt={item.title}
            width={1500}
            height={1500}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
          />
          <div className="bg-white rounded-full border border-accent w-12 h-12 xl:w-20 xl:h-20 relative z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Image
              src={assets.linkArrowGreen}
              alt={item.title}
              width={15}
              height={15}
              className="w-7 h-7 xl:w-[19px] xl:h-[19.05px] -translate-x-2 translate-y-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-[auto_1fr] items-center gap-3 xl:gap-[25.29px] mt-auto">
          <div className="rounded-full flex items-center justify-center group-hover:bg-primary transition-all duration-300 overflow-hidden p-[12px] xl:p-[19px] w-12 h-12 xl:w-20 xl:h-20">
            <Image
              src={item.logo}
              alt={item.title}
              width={15}
              height={15}
              className="w-12 h-12 xl:w-[45px] xl:h-[45px] group-hover:brightness-0 group-hover:invert-100"
            />
          </div>
          <h3 className="text-xl xl:text-2xl leading-[1.2] dark:text-white dark:group-hover:text-primary group-hover:text-black transition-all duration-300 line-clamp-2">
            {item.title}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default ExpertiseCard;
