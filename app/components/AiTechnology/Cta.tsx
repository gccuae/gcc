'use client' 
import BtnPrimary from "../common/BtnPrimary"; 
const Cta = () => {
  return (
    <section className="py-57px bg-light-white dark:bg-black">
      <div className="container">
         <h2 className="text-5xl leading-[1.147058823529412] text-black dark:text-white mb-6 xl:mb-9 tracking-[-1.9px]"><span className="text-primary">
          Let’s Build Smarter</span> Together For<br></br>
         Efficient, Precise, and Future‑Ready Infrastructures</h2> 
         <div className="flex justify-between items-center pb-0 ">
           <BtnPrimary link={`#`} text="Contact Us Today" bgtrans={true} />
        </div>
      </div>
    </section>
  );
}

export default Cta;