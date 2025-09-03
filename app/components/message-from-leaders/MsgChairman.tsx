import SpecialContainer from "../common/SpecialContainer";
import { leadersData } from "./data";
import Image from "next/image";
const MsgChairman = () => {
  return ( 
    <section className="pt-57px xl:pt-[105px] mb-57px xl:mb-[101px] dark:bg-black">
      <SpecialContainer className="" side="left" >
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 xl:gap-15">
          <div className="relative pt-10">
            <div className="absolute top-0 left-0 w-[80%] h-full bg-light-white dark:bg-[#0d0d0d] z-0"></div>
            <Image src={leadersData.chairman.image} alt="msg chairman" width={1500} height={1500} className="w-full h-[60%] max-h-[980px] object-contain relative z-10"/>
            <div className="absolute bottom-20 left-30 w-[70%] h-fit px-4 xl:px-[38px] py-2 xl:py-[18px] bg-gradient-to-r from-primary to-transparent dark:bg-[#0d0d0d] z-20">
              <div>
                <h3 className="text-2xl leading-lh-title text-white dark:text-white">{leadersData.chairman.name}</h3>
                <p className="text-lg leading-lh-text19 text-white dark:text-white">{leadersData.chairman.position}</p>
              </div>
            </div>
          </div>
          <div className="">
            <h2 className="text-6xl leading-lh-title text-black dark:text-white mb-5 xl:mb-[34px]">{leadersData.chairman.title}</h2>
            <div>
              {leadersData.chairman.desc.map((item, index) => (
                <p key={index} className="mb-4 xl:mb-[17px]">{item}</p>
              ))}
            </div>
          </div>
        </div>  
        </SpecialContainer>
    </section>
   );
}
 
export default MsgChairman;