"use client";

import { motion } from "framer-motion";
import { moveLeft, moveUp } from "../motionVarients";
import { contactType } from "./type";
import Link from "next/link";

const ContactInfo = ({ data }: { data: contactType["secondSection"] }) => {
  return (
    <section className="pt-37px md:pt-47px xl:pt-57px pb-12 md:pb-15 xl:pb-57px bg-light-white dark:bg-black overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 xl:grid-cols-[387px_auto] gap-6 xl:gap-12">
          <div className="">
            <motion.h3
              variants={moveUp()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-3xl leading-[1.5625] text-black dark:text-white"
            >
              {data.mainTitle}
            </motion.h3>
            <motion.p
              variants={moveUp(0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-lg leading-[1.5625] dark:text-white/70"
            >
              {data.subTitle}
            </motion.p>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols- gap-4 xl:gap-30px">
            <motion.div
              variants={moveLeft()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-white dark:bg-[#0d0d0d] p-4 xl:p-5"
            >
              <motion.h3
                variants={moveUp()}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-2xl leading-lh-text32 text-black dark:text-white border-b dark:border-white/20 pb-4 xl:pb-27px"
              >
                {data.addressTitle}
              </motion.h3>
              <div className="pt-27px flex flex-wrap gap-y-[25px]  xl:gap-y-[50px] gap-x-[25px] xl:gap-x-[50px]">
                <div className="flex gap-4">
                  <svg
                    width="18"
                    height="22"
                    viewBox="0 0 18 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 0.950195C11.135 0.950195 13.1827 1.79795 14.6924 3.30762C16.2021 4.81728 17.0498 6.86501 17.0498 9C17.0498 12.0268 15.225 15.0715 13.4082 17.3545C12.4989 18.4971 11.5891 19.4517 10.9072 20.1201C10.5666 20.4541 10.2829 20.7171 10.084 20.8965C9.98453 20.9861 9.90594 21.0551 9.85254 21.1016C9.82584 21.1248 9.80486 21.1425 9.79102 21.1543C9.78419 21.1601 9.7789 21.165 9.77539 21.168C9.77377 21.1693 9.77234 21.1702 9.77148 21.1709L9.68945 21.2393C9.29129 21.5372 8.71156 21.5342 8.31152 21.2393L8.22852 21.1709C8.22766 21.1702 8.22623 21.1693 8.22461 21.168C8.2211 21.165 8.21581 21.1601 8.20898 21.1543C8.19514 21.1425 8.17416 21.1248 8.14746 21.1016C8.09406 21.0551 8.01547 20.9861 7.91602 20.8965C7.71706 20.7171 7.43344 20.4541 7.09277 20.1201C6.41091 19.4517 5.50114 18.4971 4.5918 17.3545C2.77498 15.0715 0.950195 12.0268 0.950195 9C0.950195 6.86501 1.79795 4.81728 3.30762 3.30762C4.81728 1.79795 6.86501 0.950195 9 0.950195ZM8.99902 2.24219C8.09209 2.24225 7.19408 2.4256 6.35938 2.78027C5.52467 3.13501 4.77017 3.65474 4.14062 4.30762C3.51104 4.96057 3.01943 5.7339 2.69531 6.58105C2.37126 7.42817 2.22092 8.3319 2.25391 9.23828C2.33837 11.4696 3.57303 13.9862 5.60938 16.5459C6.57601 17.7577 7.63822 18.89 8.78613 19.9316C8.87583 20.0127 8.94806 20.0745 9 20.1191L9.21387 19.9316L9.63965 19.5371C10.6254 18.6059 11.5447 17.6064 12.3906 16.5459C14.428 13.9862 15.6617 11.4696 15.7451 9.23828C15.7781 8.3319 15.6278 7.42817 15.3037 6.58105C14.9796 5.7339 14.488 4.96056 13.8584 4.30762C13.2289 3.65474 12.4744 3.13501 11.6396 2.78027C10.8048 2.42554 9.90611 2.24219 8.99902 2.24219ZM9 4.9502C10.0741 4.9502 11.1047 5.37622 11.8643 6.13574C12.6238 6.89526 13.0498 7.92587 13.0498 9C13.0498 10.0741 12.6238 11.1047 11.8643 11.8643C11.1047 12.6238 10.0741 13.0498 9 13.0498C7.92587 13.0498 6.89526 12.6238 6.13574 11.8643C5.37622 11.1047 4.9502 10.0741 4.9502 9C4.9502 7.92587 5.37622 6.89526 6.13574 6.13574C6.89526 5.37622 7.92587 4.9502 9 4.9502ZM9 6.25C8.27065 6.25 7.57139 6.53994 7.05566 7.05566C6.53994 7.57139 6.25 8.27065 6.25 9C6.25 9.72935 6.53994 10.4286 7.05566 10.9443C7.57139 11.4601 8.27065 11.75 9 11.75C9.72935 11.75 10.4286 11.4601 10.9443 10.9443C11.4601 10.4286 11.75 9.72935 11.75 9C11.75 8.27065 11.4601 7.57139 10.9443 7.05566C10.4286 6.53994 9.72935 6.25 9 6.25Z"
                      fill="#EE3524"
                      stroke="#EE3524"
                      strokeWidth="0.1"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                  </svg>
                  <motion.div
                    variants={moveUp(0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <h4 className="text-base leading-lh-25 uppercase text-para-color dark:text-white/70">
                      Location
                    </h4>
                    <div>
                      {data.location.split("\n").map((item: string, index: number) => (
                        <p key={index} className="text-lg leading-lh-text19 text-black dark:text-white">
                          {item}
                        </p>
                      ))}

                    </div>
                  </motion.div>
                </div>
                <motion.div
                  variants={moveUp(0.2)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.8182 1C14.8427 1.55245 18.0385 4.70979 18.6504 8.71678M16.7762 16.6853C16.5559 17.1678 16.0594 17.5874 15.2867 17.9441C14.5175 18.3007 13.8322 18.479 13.2308 18.479C13.0629 18.479 12.8846 18.465 12.6958 18.4406C12.507 18.4126 12.3462 18.3881 12.2168 18.3636C12.0839 18.3357 11.9126 18.2902 11.6958 18.2238C11.479 18.1538 11.3252 18.1014 11.2308 18.0664C11.1364 18.028 10.9615 17.965 10.7098 17.8706C10.458 17.7762 10.3007 17.7168 10.2378 17.6958C8.51748 17.0664 6.83217 15.9301 5.19231 14.2867C3.54895 12.6434 2.41259 10.9615 1.78322 9.24126C1.76224 9.17832 1.70629 9.02098 1.61189 8.76923C1.51748 8.51748 1.45105 8.34615 1.41608 8.25175C1.38112 8.15734 1.32867 8.0035 1.25874 7.78671C1.18881 7.56993 1.14336 7.3986 1.11538 7.26573C1.09091 7.13287 1.06294 6.97552 1.03846 6.78671C1.01049 6.5979 1 6.41958 1 6.25175C1 5.65385 1.17832 4.96853 1.53497 4.1958C1.89161 3.42657 2.31119 2.93007 2.79371 2.70979C3.34965 2.47902 3.88112 2.36364 4.38462 2.36364C4.5 2.36364 4.58392 2.37413 4.63636 2.3951C4.68881 2.41608 4.77622 2.51049 4.89511 2.67832C5.01748 2.84615 5.14685 3.05944 5.29021 3.31469C5.43357 3.57343 5.56993 3.82168 5.70979 4.06294C5.84615 4.3042 5.97552 4.54196 6.1049 4.77972C6.23077 5.01748 6.31119 5.16434 6.33916 5.22727C6.37063 5.27972 6.44056 5.37762 6.54546 5.52797C6.65035 5.67482 6.73077 5.80769 6.77972 5.92308C6.83217 6.03846 6.86014 6.14685 6.86014 6.25525C6.86014 6.41259 6.75175 6.6049 6.53846 6.82867C6.32168 7.05245 6.08741 7.26224 5.82867 7.45105C5.56993 7.63986 5.33566 7.84266 5.11888 8.05594C4.90559 8.26923 4.7972 8.44755 4.7972 8.58392C4.7972 8.65734 4.81469 8.74476 4.85315 8.84266C4.89161 8.94406 4.92308 9.02448 4.95455 9.08741C4.98601 9.15035 5.03497 9.24126 5.1049 9.35664C5.17133 9.47203 5.21678 9.54545 5.23776 9.57692C5.81469 10.6154 6.47902 11.5105 7.23077 12.2622C7.98252 13.014 8.87413 13.6783 9.91608 14.2552C9.94755 14.2762 10.021 14.3217 10.1364 14.3881C10.2517 14.4545 10.3427 14.5035 10.4021 14.5385C10.465 14.5699 10.5455 14.6049 10.6469 14.6399C10.7483 14.6783 10.8322 14.6958 10.9091 14.6958C11.0769 14.6958 11.3077 14.521 11.6014 14.1748C11.8951 13.8287 12.1923 13.4825 12.5 13.1434C12.8042 12.8042 13.049 12.6329 13.2413 12.6329C13.3462 12.6329 13.458 12.6608 13.5734 12.7098C13.6888 12.7622 13.8182 12.8427 13.9685 12.9476C14.1154 13.0524 14.2133 13.1189 14.2692 13.1538L15.1049 13.6084C15.6608 13.9021 16.1259 14.1608 16.5 14.3881C16.8706 14.6154 17.0734 14.7692 17.1049 14.8531C17.1259 14.9056 17.1364 14.9895 17.1364 15.1049C17.1364 15.6084 17.021 16.1399 16.7902 16.6958L16.7762 16.6853Z"
                      stroke="#EE3524"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                  </svg>

                  <div>
                    <h4 className="text-base leading-lh-25 uppercase text-para-color dark:text-white/70">
                      Telephone
                    </h4>
                    <a
                      href="tel:+97126267510"
                      className="text-lg leading-lh-text19 text-black dark:text-white"
                    >
                      {data.telephone}
                    </a>
                  </div>
                </motion.div>
                <div className="flex gap-4">
                  <svg
                    width="22"
                    height="18"
                    viewBox="0 0 22 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.875 4.06089L9.9968 10.1827C10.5353 10.7211 11.4103 10.7211 11.9487 10.1827L18.0865 4.04486M3.80769 1H18.0032C19.5539 1 20.8109 2.25705 20.8109 3.80769V14.2179C20.8109 15.7686 19.5539 17.0256 18.0032 17.0256H3.80769C2.25705 17.0256 1 15.7686 1 14.2179V3.80769C1 2.25705 2.25705 1 3.80769 1Z"
                      stroke="#EE3524"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                  </svg>

                  <motion.div
                    variants={moveUp(0.3)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <h4 className="text-base leading-lh-25 uppercase text-para-color dark:text-white/70">
                      Email
                    </h4>
                    <a
                      href="mailto:info@gcc.ae"
                      className="text-lg leading-lh-text19 text-black dark:text-white"
                    >
                      {data.email}
                    </a>
                  </motion.div>
                </div>
                <div className="flex gap-4">
                  <svg
                    width="26"
                    height="21"
                    viewBox="0 0 26 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.47541 6.66885H6.35738C6.06667 6.29508 5.71366 5.99399 5.29836 5.76557C4.88306 5.53716 4.42623 5.42295 3.92787 5.42295C3.1145 5.42295 2.42323 5.70764 1.85407 6.27702C1.28469 6.84619 1 7.53745 1 8.35082V17.0721C1 17.8855 1.28469 18.5768 1.85407 19.1459C2.42323 19.7153 3.1145 20 3.92787 20C4.42623 20 4.88306 19.8858 5.29836 19.6574C5.71366 19.429 6.06667 19.1279 6.35738 18.7541H24.2984V9.59672C24.2984 8.78336 24.0137 8.09209 23.4443 7.52292C22.8751 6.95354 22.1839 6.66885 21.3705 6.66885H19.3148M8.47541 6.66885V1H19.3148V6.66885M8.47541 6.66885H19.3148M6.88382 18.7541V6.66885M8.91147 15.8262H13.8951V9.59672H8.91147V15.8262Z"
                      stroke="#EE3524"
                      strokeWidth="1.5"
                    />
                  </svg>

                  <motion.div
                    variants={moveUp(0.35)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <h4 className="text-base leading-lh-25 uppercase text-para-color dark:text-white/70">
                      fax
                    </h4>
                    <a
                      href="fax:+97126267510"
                      className="text-lg leading-lh-text19 text-black dark:text-white"
                    >
                      {data.fax}
                    </a>
                  </motion.div>
                </div>

                {/* <motion.div
                  variants={moveUp(0.4)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="bg-black/5 dark:bg-white/5 p-3 xl:p-5"
                >
                  <p className="text-lg leading-lh-text19 text-para-color dark:text-white/70">
                    {data.timings}
                  </p>
                </motion.div> */}
              </div>
              <motion.div
                  className="flex items-start gap-[10px] mt-3 lg:mt-5"
                  variants={moveUp(0.2)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="flex items-center justify-center bg-primary rounded-full w-8 h-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                    >
                      <path
                        d="M7.6796 9.2001C8.09326 9.2001 8.44593 9.05276 8.7376 8.7581C9.02926 8.4636 9.1751 8.10943 9.1751 7.6956C9.1751 7.28193 9.02776 6.92927 8.7331 6.6376C8.4386 6.34593 8.08443 6.2001 7.6706 6.2001C7.25693 6.2001 6.90426 6.34743 6.6126 6.6421C6.32093 6.9366 6.1751 7.29076 6.1751 7.7046C6.1751 8.11826 6.32243 8.47093 6.6171 8.7626C6.9116 9.05427 7.26576 9.2001 7.6796 9.2001ZM7.6751 17.3251C9.50843 15.7584 10.9876 14.1043 12.1126 12.3626C13.2376 10.6209 13.8001 9.1251 13.8001 7.8751C13.8001 6.04176 13.2209 4.5251 12.0626 3.3251C10.9043 2.1251 9.44176 1.5251 7.6751 1.5251C5.90843 1.5251 4.44593 2.1251 3.2876 3.3251C2.12926 4.5251 1.5501 6.04176 1.5501 7.8751C1.5501 9.1251 2.1126 10.6209 3.2376 12.3626C4.3626 14.1043 5.84176 15.7584 7.6751 17.3251ZM7.6751 18.2751C5.4251 16.2584 3.7251 14.3751 2.5751 12.6251C1.4251 10.8751 0.850098 9.29177 0.850098 7.8751C0.850098 5.8751 1.50426 4.20426 2.8126 2.8626C4.12093 1.52093 5.74176 0.850098 7.6751 0.850098C9.60843 0.850098 11.2293 1.52093 12.5376 2.8626C13.8459 4.20426 14.5001 5.8751 14.5001 7.8751C14.5001 9.29177 13.9251 10.8751 12.7751 12.6251C11.6251 14.3751 9.9251 16.2584 7.6751 18.2751Z"
                        fill="#fff"
                        stroke="#fff"
                        strokeWidth="1.7"
                      />
                    </svg>
                  </div>
                  <Link
                    target="_blank"
                    href={data.getDirection}
                    className="text-md xl:text-xl font-normal text-black dark:text-white leading-[1.3125] hover:text-accent transition-all duration-300 cursor-pointer capitalize"
                  >
                    Get Directions
                  </Link>
                </motion.div>
            </motion.div>
                            
            {/* <motion.div
              variants={moveLeft(0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="overflow-hidden"
            >
              <div className="xl:aspect-square overflow-hidden xl:h-full">
                <iframe
                  src={data.map}
                  width="600"
                  height="450"
                  style={{ border: "0", height: "100%" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[400px] md:!h-[400px] xl:!h-full"
                ></iframe>
              </div>
            </motion.div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
