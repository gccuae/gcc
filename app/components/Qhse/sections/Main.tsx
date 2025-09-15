import StandardBnr from "../../common/StandardBnr";

type Props = {
  title: string;
  subtitle: string;
  description: string;
};

const Main = ({ title, subtitle, description }: Props) => {
  return (
    <section className="pt-57px xl:pt-25">
      <div className="container">
        <StandardBnr title={title} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-10 justify-items-between py-[40px] xl:py-[80px]">
          <div>
            <h2 className="text-3xl leading-lh-text48 font-normal text-black dark:text-white">
              {subtitle}
            </h2>
          </div>
          <div>
            <p className="text-xl leading-[1.608695652173913] text-black dark:text-white">
              <span className="text-red-500">{description.split(",")[0]},</span>
              {description.substring(description.indexOf(",") + 1)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
