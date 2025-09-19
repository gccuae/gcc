import StandardBnr from "../common/StandardBnr";
const Main = () => {
  return (
    <section className="pt-57px xl:pt-25">
      <div className="container">
        <StandardBnr title="Civil & Structural Works" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-10 justify-items-between  lg:pt-[23px] pb-7 lg:pb-10 xl:pb-20">
          <div>
            <h2 className="text-3xl leading-lh-text48 font-normal text-black dark:text-white">
              Building Excellence in Every Project
            </h2>
          </div>
          <div className="">
            <p className="text-lg leading-lh-text19 text-black dark:text-white">
              <span className="text-primary">
                Gulf Contractors Company (GCC)
              </span>{" "}
              is a trusted name in delivering high-quality civil construction
              solutions across the UAE. With decades of experience and a team of
              skilled professionals, we bring innovation, precision, and safety
              to every project from large-scale commercial developments to
              complex infrastructure works.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
