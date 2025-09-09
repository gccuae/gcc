
import Image from "next/image";
import Breadcrumb from "./BreadCrumb";
interface PageBnrProps {
  pageTitle: string;
  bannerImg: string;
}

const PageBnr = ({pageTitle, bannerImg}: PageBnrProps) => {
  return ( 
    <section className="relative h-[350px] xl:h-[450px] flex flex-col justify-end pb-15 xl:pb-[83x]">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image src={bannerImg} alt="" width={1920} height={800} className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-b from-black/80 from-0% via-black/55 via-51% to-black/85 to-100%">
      </div>
      <div className="container relative z-10">
        <div>
          <h2 className="text-white text-6xl">{pageTitle}</h2>
        </div>
        <Breadcrumb />
      </div>
    </section>
   );
}
 
export default PageBnr;