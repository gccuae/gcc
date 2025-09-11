import Breadcrumb from "./BreadCrumb";

interface Props {
  title: string;
}
const StandardBnr = ({ title }: Props) => {
  return (

    <div className="border-b border-smgray pb-5 xl:pb-10 mb-8 xl:mb-57px">
      <h2 className="text-5xl leading-[1.205882352941176] font-normal text-black dark:text-white">{title}</h2>
      <Breadcrumb standard={true} />
    </div>
  );
};
export default StandardBnr; 
