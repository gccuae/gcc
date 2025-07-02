import Link from "next/link";

const BtnPrimary = ({link, text, bgtrans}: {link: string, text: string, bgtrans?: boolean}) => {
  return ( 
    <Link href={link} className={`${bgtrans ? "bg-transparent text-white border-white  hover:border-[#ffffff70]" : "bg-white  "}  hover:bg-mdgray hover:text-white flex items-center justify-center py-3 xl:py-[7px] px-4 xl:px-[28px] gap-2 transition-all
     duration-300 ease-in-out group border border-foreground rounded-4xl w-fit hover:shadow-xl`}>
      <span className="text-base font-light uppercase leading-[1.578947368421053]">{text}</span>
      <svg width="26" height="10" viewBox="0 0 26 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-2 transition-all duration-300">
        <path d="M0 9.53027H24L15 0.530273" stroke="#7AC142" strokeWidth="1.5" strokeMiterlimit="10" />
      </svg>
    </Link>
   );
}
 
export default BtnPrimary;