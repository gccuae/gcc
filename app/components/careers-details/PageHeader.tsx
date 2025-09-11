"use client"
import Breadcrumb from "../common/BreadCrumb";
import BtnPrimary from "../common/BtnPrimary";
interface PageHeaderProps {
  title: string;
}
const PageHeader = ({ title }: PageHeaderProps) => {
  return ( 
    <section className="pt-57px">
      <div className="container">
        <div className="border-b border-smgray pb-5 xl:pb-10 mb-8 xl:mb-57px">
          <div className="flex justify-between items-center">
            <h1 className="text-5xl leading-[1.205882352941176] font-normal text-black dark:text-white">{title}</h1>
            <BtnPrimary link="#" text="Apply Now" bgtrans={true} />
          </div>
          <Breadcrumb standard={true} />
        </div>
      </div>
    </section>
   );
}
 
export default PageHeader;