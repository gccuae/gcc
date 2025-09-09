import Breadcrumb from "./BreadCrumb";

interface Props {
  title: string;
}
const StandardBnr = ({ title }: Props) => {
  return (
    <section className="py-57px">
      <div className="container">
        <div className="border-b border-smgray pb-5 xl:pb-10">
          <h2 className="text-5xl leading-[1.205882352941176] font-normal text-black dark:text-white">{title}</h2>
        <Breadcrumb standard={true} />
        </div>
      </div>
    </section>
  );
};
export default StandardBnr;
