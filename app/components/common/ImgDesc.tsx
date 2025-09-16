import Image from "next/image";

interface ImgDescProps {
  data: {
    img: string;
    title: string;
    desc: string[];
  };
}

const ImgDesc = ({ data }: ImgDescProps) => {
  return (
    <section className="py-57px dark:bg-black">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:flex gap-6 xl:gap-[70px] items-center">
          <div className="xl:w-[48.6%]">
            <Image
              src={data.img}
              alt=""
              width={1500}
              height={1500}
              className="w-full max-h-[772px] object-cover"
            />
          </div>
          <div className="xl:w-[51.3%] flex flex-col gap-6 justify-center">
            <div>
              <h2 className="text-5xl leading-[1.147058823529412] text-black dark:text-white pb-3 xl:pb-[27px] xl:tracking-[-2.1px]">
                {data.title}
              </h2>
              <div>
                {data.desc.map((item, index) => (
                  <p
                    key={index}
                    className="dark:text-white text-lg font-light leading-[1.526315789473684] mb-6 last:mb-0"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImgDesc;
