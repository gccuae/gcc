import { careerData } from "./data";
import Image from "next/image";
const Main = ({ data }: { data: typeof careerData }) => {
  return (
    <section className="py-57px bg-light-white dark:bg-black overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-[705px_auto] gap-6 xl:gap-10 2xl:gap-70px w-full">
          <div>
            <Image src={data.mainImg} alt={data.mainImgAlt} width={1500} height={500} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-2xl leading-[1.46875] font-light dark:text-white" dangerouslySetInnerHTML={{ __html: data.desc }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;