import Image from "next/image";
const MainContent = ({ subTitle, image, sector, date, desc }: { subTitle: string, image: string, sector: string, date: string, desc: string[] }) => {
  return (
    <div>
      <h3 className="text-3xl leading-lh-subtitle font-normal mb-5 xl:mb-[27px] text-black dark:text-white">{subTitle}</h3>
      <Image src={image} alt="" width={700} height={700} className="w-full h-auto max-h-[600px] object-cover" />
      <div className="flex items-center justify-between mb-5 xl:mb-[27px] mt-3 xl:mt-[17px] gap-3">
        <span className="text-sm">{sector}</span>
        <span className="text-sm">{date}</span>
      </div>
      {desc.map((item, index) => (
        <p key={index} className="mb-5 xl:mb-[27px] text-lg xl:text-21 leading-[1.380952380952381] font-normal">{item}</p>
      ))}
    </div>
  );
}

export default MainContent;