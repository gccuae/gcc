"use client";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import Link from "next/link";
import { motion } from "framer-motion";
import { moveUp, fadeIn } from "../motionVarients";
const FooterV = ({ data }: any) => {
  return (
    <footer className="relative ">
      <div className="relative h-full">
        <div className="absolute w-full h-full z-1">
          <Image
            src={assets.footerbg}
            alt="footerbg"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-2">
          {!data.firstSection.hidden && <div className="pt-8 lg:pt-15 pb-4 lg:pb-6 border-b border-para-color">
            <motion.h2
              className="text-4xl font-normal leading-[1.147058823529412] text-white max-w-3xl"
              variants={moveUp(0)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {data.firstSection.title}
            </motion.h2>
          </div>}
          <div className="grid gap-y-8 lg:grid-cols-2 xl:grid-cols-[6fr_4fr] pt-4 pb-4 xl:pt-27px xl:pb-27px border-b border-para-color">
            <div>
              {!data.secondSection.hidden && <div className="flex flex-col gap-2 lg:gap-3 pt-3 xl:pt-4 pb-5">
                <motion.p
                  className="text-md font-light text-white leading-[1.526315789473684] max-w-[472px] flex flex-col"
                  variants={moveUp(0.2)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {/* Gulf Contractors Company (GCC) LLC
                  <br />
                  Suite No. 023, Liberty Tower, Khalifa St., P O Box 45363{" "}
                  <br /> Abu Dhabi, UAE */}
                  {data.secondSection.address.split("\n").map((item: any,index:number) => (
                    <span key={index}>{item}</span>
                  ))}
                </motion.p>
                <motion.div
                  className="flex items-center gap-4"
                  variants={moveUp(0.6)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="flex items-center justify-center bg-black rounded-full border border-foreground w-10 h-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                    >
                      <path
                        d="M7.6796 9.2001C8.09326 9.2001 8.44593 9.05276 8.7376 8.7581C9.02926 8.4636 9.1751 8.10943 9.1751 7.6956C9.1751 7.28193 9.02776 6.92927 8.7331 6.6376C8.4386 6.34593 8.08443 6.2001 7.6706 6.2001C7.25693 6.2001 6.90426 6.34743 6.6126 6.6421C6.32093 6.9366 6.1751 7.29076 6.1751 7.7046C6.1751 8.11826 6.32243 8.47093 6.6171 8.7626C6.9116 9.05427 7.26576 9.2001 7.6796 9.2001ZM7.6751 17.3251C9.50843 15.7584 10.9876 14.1043 12.1126 12.3626C13.2376 10.6209 13.8001 9.1251 13.8001 7.8751C13.8001 6.04176 13.2209 4.5251 12.0626 3.3251C10.9043 2.1251 9.44176 1.5251 7.6751 1.5251C5.90843 1.5251 4.44593 2.1251 3.2876 3.3251C2.12926 4.5251 1.5501 6.04176 1.5501 7.8751C1.5501 9.1251 2.1126 10.6209 3.2376 12.3626C4.3626 14.1043 5.84176 15.7584 7.6751 17.3251ZM7.6751 18.2751C5.4251 16.2584 3.7251 14.3751 2.5751 12.6251C1.4251 10.8751 0.850098 9.29177 0.850098 7.8751C0.850098 5.8751 1.50426 4.20426 2.8126 2.8626C4.12093 1.52093 5.74176 0.850098 7.6751 0.850098C9.60843 0.850098 11.2293 1.52093 12.5376 2.8626C13.8459 4.20426 14.5001 5.8751 14.5001 7.8751C14.5001 9.29177 13.9251 10.8751 12.7751 12.6251C11.6251 14.3751 9.9251 16.2584 7.6751 18.2751Z"
                        fill="#EE3524"
                        stroke="#EE3524"
                        strokeWidth="1.7"
                      />
                    </svg>
                  </div>
                  <Link
                    target="_blank"
                    href={data.secondSection.map}
                    className="text-md xl:text-xl font-normal text-white leading-[1.3125] hover:text-accent transition-all duration-300 cursor-pointer capitalize"
                  >
                    Get Directions
                  </Link>
                </motion.div>
                <motion.div
                  className="flex items-center gap-4"
                  variants={moveUp(0.4)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="flex items-center justify-center bg-black rounded-full border border-foreground w-10 h-10">
                    <svg
                      width="22"
                      height="18"
                      viewBox="0 0 22 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_614_814)">
                        <path
                          d="M17.8859 1.72461H4.1122C2.82269 1.72461 1.77734 2.74411 1.77734 4.00172V13.998C1.77734 15.2557 2.82269 16.2751 4.1122 16.2751H17.8859C19.1754 16.2751 20.2207 15.2557 20.2207 13.998V4.00172C20.2207 2.74411 19.1754 1.72461 17.8859 1.72461Z" stroke="#EE3524" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" />
                        <path
                          d="M4.45703 4.5031L10.1549 10.06C10.6571 10.5499 11.4694 10.5499 11.9717 10.06L17.6852 4.48779"
                          stroke="#EE3524" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_614_814">
                          <rect width="20.3279" height="16.3934" fill="white" transform="translate(0.835938 0.803223)" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <Link href={`mailto:${data.secondSection.email}`}
                    className="text-md xl:text-xl font-normal text-white leading-[1.3125] hover:text-accent transition-all duration-300"
                  >
                    {data.secondSection.email}
                  </Link>
                </motion.div>
                <motion.div
                  className="flex items-center gap-4"
                  variants={moveUp(0.6)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="flex items-center justify-center bg-black rounded-full border border-foreground w-10 h-10">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_614_808)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.8424 15.4963L15.7038 14.3745C14.8369 13.5203 13.4343 13.5203 12.5674 14.3745C12.173 14.7631 11.5368 14.7631 11.1424 14.3745L7.72315 11.0053C7.32876 10.6167 7.32876 9.98975 7.72315 9.60114C8.59005 8.74692 8.59005 7.36478 7.72315 6.51056L6.58464 5.38871C5.71774 4.53449 4.31507 4.53449 3.44817 5.38871C1.31998 7.47843 1.31998 10.877 3.44445 12.9704C5.34568 14.8438 7.24319 16.7135 9.14442 18.5869C9.63554 19.0489 10.6438 19.8481 12.1246 20.0901C12.266 20.1121 12.5823 20.1597 12.9915 20.1597C14.383 20.1597 15.7783 19.6354 16.8386 18.5906C17.7055 17.7364 17.7055 16.3542 16.8386 15.5L16.8424 15.4963Z"
                          stroke="#EE3524"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.9492 1.91341C12.2952 1.86575 12.6524 1.84375 13.0096 1.84375C17.3143 1.84375 20.8005 5.28262 20.8005 9.52071C20.8005 9.76268 20.7894 10.0046 20.7671 10.2429"
                          stroke="#EE3524"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.3008 5.66731C12.5315 5.62698 12.7659 5.60498 13.0077 5.60498C15.2029 5.60498 16.9813 7.35741 16.9813 9.52045C16.9813 9.76608 16.959 10.0081 16.9143 10.2427"
                          stroke="#EE3524"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_614_808">
                          <rect
                            width="20.9836"
                            height="20.3279"
                            fill="white"
                            transform="translate(0.835938 0.835938)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <Link
                    href={`tel:${data.secondSection.phone}`}
                    className="text-md xl:text-xl font-normal text-white leading-[1.3125] hover:text-accent transition-all duration-300"
                  >
                    {data.secondSection.phone}
                  </Link>
                </motion.div>
              </div>}
            </div>
            {!data.thirdSection.hidden && <div>
              <motion.h3
                variants={moveUp(0)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="text-xl font-normal text-white leading-[1.3125] pb-4"
              >
                {data.thirdSection.title}
              </motion.h3>
              <div className="flex gap-10">
                <div>
                  <ul className="flex flex-col gap-2">
                    {data.thirdSection.items.slice(0, 5).map((item: { title: string, link: string },index:number) => (
                      <motion.li
                      key={item.title}
                        variants={moveUp(index)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="text-white font-light leading-[1.578947368421053] hover:text-accent transition-colors duration-300 "
                      >
                        <Link href={item.link}>{item.title}</Link>
                      </motion.li>
                    ))}

                    {/* <motion.li
                      variants={moveUp(0.05)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.2 }}
                      className="text-white font-light leading-[1.578947368421053] hover:text-accent transition-colors duration-300 "
                    >
                      <Link href="/group-companies">Group Companies</Link>
                    </motion.li>
                    <motion.li
                      variants={moveUp(0.1)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.2 }}
                      className="text-white font-light leading-[1.578947368421053] hover:text-accent transition-colors duration-300 "
                    >
                      <Link href="/sustainability"> Sustainability</Link>
                    </motion.li>
                    <motion.li
                      variants={moveUp(0.2)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.2 }}
                      className="text-white font-light leading-[1.578947368421053] hover:text-accent transition-colors duration-300 "
                    >
                      <Link href="/projects">Projects</Link>
                    </motion.li>
                    <motion.li
                      variants={moveUp(0.2)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.2 }}
                      className="text-white font-light leading-[1.578947368421053] hover:text-accent transition-colors duration-300 "
                    >
                      <Link href="/vendor-registration">Vendor Registration</Link>
                    </motion.li> */}
                  </ul>
                </div>
                <div>
                  <ul className="flex flex-col gap-2">
                    {/* <motion.li
                      variants={moveUp(0)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.2 }}
                      className="text-white font-light leading-[1.578947368421053] hover:text-accent transition-colors duration-300 "
                    >
                      <Link href="/clients">Clientele & Partnerships</Link>
                    </motion.li> */}
                    {data.thirdSection.items.slice(5).map((item:{title:string,link:string},index:number) => (
                      <motion.li
                      key={index}
                        variants={moveUp(index)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="text-white font-light leading-[1.578947368421053] hover:text-accent transition-colors duration-300 "
                      >
                        <Link href={item.link}>{item.title}</Link>
                      </motion.li>
                    ))}
                    {/* <motion.li
                      variants={moveUp(0.1)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.2 }}
                      className="text-white font-light leading-[1.578947368421053] hover:text-accent transition-colors duration-300 "
                    >
                      <Link href="/careers">Careers</Link>
                    </motion.li> */}
                    {/* <motion.li
                      variants={moveUp(0.2)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.2 }}
                      className="text-white font-light leading-[1.578947368421053] hover:text-accent transition-colors duration-300 "
                    >
                      <Link href="/qhse">Health Safety & Environmental</Link>
                    </motion.li> */}
                    {/* <motion.li
                      variants={moveUp(0.3)}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.2 }}
                      className="text-white font-light leading-[1.578947368421053] hover:text-accent transition-colors duration-300 "
                    >
                      <Link href="/blog">Blog</Link>
                    </motion.li> */}
                  </ul>
                </div>
              </div>
            </div>}
          </div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-[6fr_4fr] pt-6 pb-8 xl:pt-8 xl:pb-27px gap-y-8">
            {!data.forthSection.hidden && <div className="flex flex-wrap gap-4 xl:gap-6">
              {data.forthSection.items.map((item: any,index:number) => (
                <motion.div
                key={index}
                  className="flex items-center gap-2"
                  variants={moveUp(0)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <Link href={item.link} className="flex items-center gap-2">
                    <span className="text-mdgray text-md font-light leading-[1.578947368421053] uppercase hover:text-primary transition-all duration-300">
                      {item.title}
                    </span>
                    <Image
                      src={assets.linkArrowGreen}
                      alt="linkArrowGreen"
                      width={22}
                      height={22}
                      className="w-5 h-5 xl:w-[10.97px] xl:h-auto"
                    />
                  </Link>
                </motion.div>
              ))}

              {/* <motion.div
                className="flex items-center gap-2"
                variants={moveUp(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Link href="https://www.facebook.com/profile.php?id=61585660241145" className="flex items-center gap-2">
                  <span className="text-mdgray text-md font-light leading-[1.578947368421053] uppercase hover:text-primary transition-all duration-300">
                    Facebook
                  </span>
                  <Image
                    src={assets.linkArrowGreen}
                    alt="linkArrowGreen"
                    width={22}
                    height={22}
                    className="w-5 h-5 xl:w-[10.97px] xl:h-auto"
                  />
                </Link>
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                variants={moveUp(0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Link href="https://www.youtube.com/@GCCae" className="flex items-center gap-2">
                  <span className="text-mdgray text-md font-light leading-[1.578947368421053] uppercase hover:text-primary transition-all duration-300">
                    Youtube
                  </span>
                  <Image
                    src={assets.linkArrowGreen}
                    alt="linkArrowGreen"
                    width={22}
                    height={22}
                    className="w-5 h-5 xl:w-[10.97px] xl:h-auto"
                  />
                </Link>
              </motion.div> */}
            </div>}
            {!data.fifthSection.hidden && <motion.div
              variants={moveUp(0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <a
                href={"#"}
                className="bg-white text-para-color hover:bg-primary hover:text-white flex items-center justify-center rounded-4xl py-2 px-4 gap-2 transition-all
               duration-300 ease-in-out group max-w-fit "
              >
                <span className="text-xs font-medium uppercase leading-[1.578947368421053]">
                  {data.fifthSection.buttonText}
                </span>
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 "
                >
                  <path
                    d="M8.49593 14.9186H4.79222C3.00365 14.9186 1.55078 16.3401 1.55078 18.0901V25.7901C1.55078 27.5401 3.00365 28.9617 4.79222 28.9617H5.02335M5.02335 28.9617C6.9385 28.9617 8.49593 27.4378 8.49593 25.564V3.07242C8.49593 2.50165 8.96921 2.03857 9.55256 2.03857H30.388C30.9713 2.03857 31.4446 2.50165 31.4446 3.07242V26.5009C31.4446 27.8578 30.322 28.9617 28.9296 28.9617H5.02335Z"
                    stroke="#AD4545"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-white transition-all duration-300 ease-in-out"
                  />
                  <path
                    d="M13.7891 9.73828H23.0456"
                    stroke="#AD4545"
                    className="group-hover:stroke-white transition-all duration-300 ease-in-out"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.7891 15.8877H25.8908"
                    stroke="#AD4545"
                    className="group-hover:stroke-white transition-all duration-300 ease-in-out"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.7891 22.0371H23.0456"
                    stroke="#AD4545"
                    className="group-hover:stroke-white transition-all duration-300 ease-in-out"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>}
          </div>
        </div>
      </div>
      <div className="py-4 bg-forground-two dark:bg-black">
        <div className="container">
          <div className="flex flex-wrap justify-between items-center">
            <ul className="flex items-center gap-4 xl:gap-8">
              <motion.li
                variants={fadeIn(0)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Link
                  href="/terms-and-conditions"
                  className="text-base leading-[1.875] font-light text-mdgray hover:text-accent transition-all duration-300"
                >
                  Terms & Conditions
                </Link>
              </motion.li>
              <motion.li
                variants={fadeIn(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Link
                  href="#"
                  className="text-base leading-[1.875] font-light text-mdgray hover:text-accent transition-all duration-300"
                >
                  Feedback
                </Link>
              </motion.li>
            </ul>
            <div>
              <p className="text-base leading-[1.875] font-light text-mdgray">
                © {new Date().getFullYear()} GCC. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterV;
