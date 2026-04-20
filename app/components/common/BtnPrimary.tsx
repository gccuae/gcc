import Link from "next/link";

interface BtnPrimaryProps {
  link?: string;
  text: string;
  bgtrans?: boolean;
  borderwight?: boolean;
  onClick?: () => void;
  className?: string;
}

const BtnPrimary = ({
  link,
  text,
  bgtrans,
  borderwight,
  onClick,
  className,
}: BtnPrimaryProps) => {
  const baseClasses = `
    ${bgtrans ? "bg-transparent" : "bg-white"}
    hover:bg-mdgray dark:hover:bg-transparent hover:text-white cursor-pointer
    flex items-center justify-center
    py-1 xl:py-[7.39px] px-4 xl:px-[28px] gap-2
    transition-all duration-300 ease-in-out
    group/btn border
    ${borderwight ? "border-white text-white" : "border-foreground"}
    dark:border-white rounded-4xl w-fit
    hover:shadow-xl dark:bg-transparent
    ${className ?? ""}
  `;

  const content = (
    <>
      <span className="text-sm lg:text-base font-light uppercase leading-[1.75] dark:text-white min-w-max">
        {text}
      </span>
      <svg
        width="26"
        height="10"
        viewBox="0 0 26 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover/btn:translate-x-2 transition-all duration-300"
      >
        <path
          d="M0 9.53027H24L15 0.530273"
          stroke="#7AC142"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
      </svg>
    </>
  );

  if (link) {
    return (
      <Link href={link} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
};

export default BtnPrimary;
