import Image from "next/image";

type Props = {
  title: string;
  description: string;
  matters: { title: string; icon: string; content: string }[];
};

const WhyQhse = ({ title, description, matters }: Props) => {
  return (
    <section className="py-57px bg-light-white dark:bg-black">
      <div className="container">
        <h2 className="text-6xl leading-[1.147058823529412] text-black dark:text-white mb-27px">
          {title}
        </h2>
        <p className="text-lg leading-[1.5625] text-black dark:text-foreground max-w-[80ch]">
          {description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-[79px] mt-47px">
          {matters.map((item, index) => (
            <div
              key={index}
              className="group grid gap-27px grid-rows-[auto_1fr]"
            >
              <div className="border-b border-smgray group-hover:border-b-primary group-hover:border-b-[2px] pb-27px transition-colors duration-300">
                <div className="flex items-center gap-[17px]">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="w-15 h-15 transition duration-300 filter brightness-0 group-hover:brightness-100"
                  />

                  <h3 className="text-2xl leading-lh-text32 text-black dark:text-white group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
              </div>
              <p className="text-lg leading-lh-text19 font-light text-black dark:text-foreground">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyQhse;
