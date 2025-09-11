"use client"
import BtnPrimary from "../common/BtnPrimary";
import { useEffect, useRef } from "react";
import Link from "next/link";

interface CurrentOpeningsProps {
  data: {jobs: {title: string, sector: string, location: string, type: string}[]};
}

const CurrentOpenings = ({data}: CurrentOpeningsProps) => {


  const sectionRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const lastTouchY = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    if (!section || !left) return;

    const leftCanScroll = (dir: number) => {
      if (dir > 0) {
        return left.scrollTop + left.clientHeight < left.scrollHeight - 1;
      } else {
        return left.scrollTop > 0;
      }
    };

    const sectionIsVisible = () => {
      const r = section.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    const onWheel = (e: WheelEvent) => {
      if (!sectionIsVisible()) return;

      const delta = e.deltaY;
      if (!delta) return;

      if (leftCanScroll(Math.sign(delta))) {
        left.scrollBy({ top: delta }); // Removed smooth behavior
        e.preventDefault();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      lastTouchY.current = e.touches?.[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (lastTouchY.current == null) return;
      if (!sectionIsVisible()) return;

      const currentY = e.touches?.[0]?.clientY ?? 0;
      const delta = lastTouchY.current - currentY;

      if (leftCanScroll(Math.sign(delta))) {
        left.scrollBy({ top: delta });
        lastTouchY.current = currentY;
        e.preventDefault();
      } else {
        lastTouchY.current = currentY;
      }
    };

    const onTouchEnd = () => {
      lastTouchY.current = null;
    };

    // Attach listeners to section instead of window for touch events
    section.addEventListener("wheel", onWheel, { passive: false });
    section.addEventListener("touchstart", onTouchStart, { passive: true });
    section.addEventListener("touchmove", onTouchMove, { passive: false });
    section.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      section.removeEventListener("wheel", onWheel);
      section.removeEventListener("touchstart", onTouchStart);
      section.removeEventListener("touchmove", onTouchMove);
      section.removeEventListener("touchend", onTouchEnd);
    };
  }, []);



  return ( 
    <section className="pt-57px">
      <div className="container">
        <div className="mb-6 xl:mb-27px">
          <h2 className="text-5xl leading-[1.205882352941176] font-normal text-black dark:text-white mb-4 xl:mb-[17px]">Current Openings</h2>
          <p className="text-2xl leading-lh-text32 dark:text-white">We’re always on the lookout for outstanding talent</p>
        </div>
        <div className="pt-6 xl:pt-10 pb-6 xl:pb-47px">
          <form action="" className="flex gap-6 xl:gap-10">
            <select name="" id="" className="border-b border-smgray text-lg leading-[1.842105263157895]">
              <option value="" className="text-lg leading-[1.842105263157895]">Job Title</option>
              <option value="" className="text-lg leading-[1.842105263157895]">All Jobs</option>
              <option value="" className="text-lg leading-[1.842105263157895]">Software Engineer</option>
              <option value="" className="text-lg leading-[1.842105263157895]">Senior Software Engineer</option>
              <option value="" className="text-lg leading-[1.842105263157895]">Team Lead</option>
              <option value="" className="text-lg leading-[1.842105263157895]">Project Manager</option>
              <option value="">QA Engineer</option>
            </select>
            <select name="" id="" className="border-b border-smgray text-lg leading-[1.842105263157895]">
              <option value="" className="text-lg leading-[1.842105263157895]">Department</option>
              <option value="" className="text-lg leading-[1.842105263157895]">All Departments</option>
              <option value="" className="text-lg leading-[1.842105263157895]">IT</option>
              <option value="" className="text-lg leading-[1.842105263157895]">Civil</option>
              <option value="" className="text-lg leading-[1.842105263157895]">Mechanical</option>
              <option value="" className="text-lg leading-[1.842105263157895]">Electrical</option>
              <option value="">QA Engineer</option>
            </select>
            <select name="" id="" className="border-b border-smgray text-lg leading-[1.842105263157895]">
              <option value="" className="text-lg leading-[1.842105263157895]">Location</option>
              <option value="" className="text-lg leading-[1.842105263157895]">All Locations</option>
              <option value="" className="text-lg leading-[1.842105263157895]">Dubai</option>
              <option value="" className="text-lg leading-[1.842105263157895]">Abu Dhabi</option>
              <option value="" className="text-lg leading-[1.842105263157895]">Sharjah</option>
              <option value="" className="text-lg leading-[1.842105263157895]">Ajman</option>
              <option value="" className="text-lg leading-[1.842105263157895]">Umm Al Quwain</option>
            </select>
            <button className="bg-accent px-6 py-3 rounded-3xl uppercase">Apply filter</button>
          </form>
        </div>
        <div className="relative">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-10 border-t border-smgray relative" ref={sectionRef}>
            <div className="border-r border-smgray pr-6 xl:pr-[67px] pt-6 xl:pt-[67px] max-h-[842px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden left-col" ref={leftRef}>
              {
                data.jobs.map((job, index) => (
                  <div key={index} className="pb-6 xl:pb-10 mb-6 xl:mb-10 border-b border-smgray last:border-b-0 flex justify-between items-center">
                    <div >
                      <h3 className="text-2xl leading-[1.5625] font-normal">{job.title}</h3>
                      <h4 className="text-lg leading-[1.5625] font-normal"><span>{job.sector}</span> <span className="mx-2">|</span> <span>{job.location}</span> <span className="mx-2">|</span> <span>{job.type}</span></h4>
                    </div>
                    <BtnPrimary link="#" text="Apply Now" bgtrans={true} />
                  </div>
                ))
              }
            </div>
            <div className="sticky top-0 self-start z-10 right-col" >
              <div className="bg-light-white dark:bg-black p-6 xl:p-10 max-w-[575px] ml-auto mt-6 xl:mt-[67px]">
                <div className="border-b border-smgray pb-27px">
                  <h3 className="text-2xl leading-[1.205882352941176] mb-4 xl:mb-6 font-normal dark:text-white">Didn’t find a role that fits you?</h3>
                  <p className="text-xl leading-[1.46875] font-light dark:text-white">Send your resume and we’ll get in touch with you.</p>
                </div>
              <div className="pt-27px">
                <Link href="mailto:info@gcc.ae" className="flex items-center gap-[10.28px] bg-black/5 p-4 xl:p-5">
                  <svg width="27" height="22" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.588 4.81999L12.228 12.46C12.9 13.132 13.992 13.132 14.664 12.46L22.324 4.79999M4.504 1H22.22C24.1552 1 25.724 2.56879 25.724 4.504V17.496C25.724 19.4312 24.1552 21 22.22 21H4.504C2.56879 21 1 19.4312 1 17.496V4.504C1 2.56879 2.56879 1 4.504 1Z" stroke="#EE3524" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
                  </svg>
                    <span className="text-lg leading-[1.526315789473684] font-normal dark:text-white">Mail Your Resume to info@gcc.ae</span>
                </Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 
export default CurrentOpenings;