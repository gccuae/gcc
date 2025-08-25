import { StaticImageData } from "next/image";
import Image from "next/image";

interface WhyChooseItem {
 
  title: string;
  desc: string;
  icon: string | StaticImageData;
}

const WhyChoose = ({ data, secTitle, subTitle }: { data: WhyChooseItem[], secTitle: string, subTitle: string }) => {
  return ( 
    <section className="py-57px bg-light-white dark:bg-black">
      <div className="container">
       <div className="pb-4 xl:pb-57px">
        <h2 className="text-6xl leading-lh-title text-black dark:text-white mb-[17px]">{secTitle}</h2>
        <h3 className="text-2xl leading-[1.5625] dark:text-white">{subTitle}</h3>
       </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 border border-smgray">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col border-r border-smgray last:border-r-0 group">
            <div className="border-b border-smgray p-5 xl:p-10 group-hover:border-b-primary group-hover:border-b-[4px] transition-all duration-300">
              <Image src={item.icon} alt={item.title} width={100} height={100} className="w-15 h-15" />
            </div>
           <div className="p-4 xl:p-10">
              <h3 className="text-2xl leading-[1.5625] dark:text-white pb-4 xl:pb-[25px]">{item.title}</h3>
              <p className="text-lg leading-[1.5625] dark:text-white">{item.desc}</p>
           </div>
          </div>
        ))}
        </div>
      </div>
    </section>
   );
}
 
export default WhyChoose;