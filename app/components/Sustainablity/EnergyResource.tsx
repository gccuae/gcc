"use client";
import Image from "next/image";
interface EngProps {
  data: {
    title: string;
    desc: string;
    items: {
      title: string;
      desc: string;
      icon: string;
    }[];
  };
}
const EnergyResource = ({ data }: EngProps) => {
  return (
    <section className="py-57px bg-light-white dark:bg-black">
      <div className="container">
        <h2 className="text-5xl leading-[1.147058823529412] text-black dark:text-white mb-3 lg:mb-6 tracking-[-1.9px]">
          {data.title}
        </h2>
        <p className="text-lg max-w-[96ch] leading-[1.526315789473684] font-light text-forground dark:text-white/80 hover:text-black dark:hover:text-white transition-all duration-300">
          {data.desc}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 border border-smgray mt-57px">
          {data.items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col border-r border-smgray last:border-r-0 group"
            >
              <div className="border-b border-smgray xl:pt-5 2xl:pr-1 p-5 pb-2 2xl:pb-0  2xl:p-8 xl:pb-0 group-hover:border-b-primary group-hover:border-b-[4px] transition-all duration-300">
                <div className="group-hover:bg-primary w-[80px] h-[80px] rounded-full transition-all duration-300 flex items-center justify-center mb-2 lg:mb-4">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="w-[70px] h-[70px] group-hover:brightness-0 group-hover:invert-100 transition-all duration-300"
                  />
                </div>
                <h3 className="text-xl max-w-[16ch] 2xl:max-w-[250ch]   2xl:text-2xl leading-[1.3155] dark:text-white pb-3 xl:pb-[27px] text-black">
                  {item.title}
                </h3>
              </div>
              <div className="p-4 xl:p-5 2xl:p-10 2xl:pt-[27px]">
                <p className="text-lg leading-[1.5625] dark:text-white">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnergyResource;
