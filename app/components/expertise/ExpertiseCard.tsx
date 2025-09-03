

import Image from "next/image";
import { assets } from "@/public/assets/assets";

const ExpertiseCard = ({ item, index }: { item: { image: string; title: string; icon: string }; index: number }) => {
  return (
    <div key={index} className="relative border-b border-smgray pb-6 xl:pb-[36px] group">
      <div className="mb-4 xl:mb-[17px] overflow-hidden relative h-[300px] xl:h-[486px] p-4 xl:p-[27px] flex justify-end items-end">
        <Image src={item.image} alt={item.title} width={1500} height={1500} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-300" />
        <div className="bg-white rounded-full border border-accent w-12 h-12 xl:w-20 xl:h-20 relative z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Image src={assets.linkArrowGreen} alt={item.title} width={15} height={15}
            className="w-7 h-7 xl:w-[19px] xl:h-[19.05px] -translate-x-2 translate-y-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
        </div>
      </div>
      <div className="grid grid-cols-[auto_1fr] items-center gap-5 xl:gap-[25.29px]">
        <div className="rounded-full flex items-center justify-center group-hover:bg-primary transition-all duration-300 overflow-hidden p-2 xl:p-[19px] transition-colors w-8 h-8 xl:w-20 xl:h-20 ">
          <Image src={item.icon} alt={item.title} width={15} height={15} className="w-10 h-10 xl:w-[45px] xl:h-[45px] group-hover:brightness-0 group-hover:invert-100" />
        </div>
        <h3 className="text-2xl leading-lh-text32 dark:text-white dark:group-hover:text-primary group-hover:text-black transition-all duration-300 ">{item.title}</h3>
      </div>
    </div>
  );
}
export default ExpertiseCard;