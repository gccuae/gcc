import SpecialContainer from "../common/SpecialContainer";
import { leadersData } from "./data";
import Image from "next/image";
const MsgChairman = () => {
  return (
    <section className="pb-57px dark:bg-black">
      <SpecialContainer className="" side="right" >
        <div className="flex flex-col-reverse lg:grid grid-cols-1 lg:grid-cols-2 items-center gap-10 xl:gap-15">
          <div className="">
            <h2 className="text-6xl leading-lh-title text-black dark:text-white mb-[17px] mb-5 xl:mb-[34px]" dangerouslySetInnerHTML={{ __html: leadersData.gm.title }}></h2>
            <div className="max-w-[61ch]">
              {leadersData.gm.desc.map((item, index) => (
                <p key={index} className="mb-4 xl:mb-[17px]">{item}</p>
              ))}
            </div>
          </div>
          <div className="relative pt-10">
            <div className="absolute top-0 right-0 w-[85%] h-full bg-light-white dark:bg-[#0d0d0d] z-0"></div>
            <Image src={leadersData.gm.image} alt="msg chairman" width={1500} height={1500} className="img-fluid   h-[400px] lg:h-[60%] max-h-[980px] object-contain relative right-0 md:right-14 z-10" />
            <div className="absolute bottom-5 md:bottom-10 lg:bottom-20 right-0 md:left-50 lg:left-40 w-fit h-fit px-4 xl:px-[38px] py-2 xl:py-[18px] bg-gradient-to-r from-primary to-transparent dark:bg-[#0d0d0d] z-20">
              <div>
                <h3 className="text-2xl leading-lh-title text-white dark:text-white "  >{leadersData.gm.name}</h3>
                <p className="text-lg leading-lh-text19 text-white dark:text-white">{leadersData.gm.position}</p>
              </div>
            </div>
          </div>
        </div>
      </SpecialContainer>
    </section>
  );
}

export default MsgChairman;