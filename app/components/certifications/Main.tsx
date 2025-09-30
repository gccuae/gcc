"use client";
import { useEffect, useState } from "react";
import { certificationsData } from "./data";
import Image from "next/image";
import { assets } from "@/public/assets/assets";

import Lenis from "@studio-freight/lenis";
import DetailsBlock from "./DetailsBlock";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

// Define the item type
type CertificationItem = {
  title: string;
  info: string;
  thumbnail: string;
  document: string;
  documentTitle: string;
  documentInfo: string;
  category: string;
};

const Main = () => {
  const [activeTab, setActiveTab] = useState("award");
  const [selectedItem, setSelectedItem] = useState<CertificationItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();
    window.lenis = lenis; // ✅ no TS error now

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";
    document.querySelector("header")?.classList.add("modal-open");
    (window as unknown as { lenis?: Lenis }).lenis?.stop();
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    window.lenis?.stop();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "auto";
    document.querySelector("header")?.classList.remove("modal-open");
    (window as unknown as { lenis?: Lenis }).lenis?.start();
    window.lenis?.start();
  };
  const handleDownload = () => {
    if (selectedItem?.document) {
      const link = document.createElement("a");
      link.href = selectedItem.document;
      link.download = `${selectedItem.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  // Combine all items from both awards and certifications
  const allItems = [
    ...certificationsData.awards.items,
    ...certificationsData.certifications.items,
  ];

  // Filter items based on active tab
  const filteredItems = allItems.filter((item) => item.category === activeTab);

  // Set default selected item when tab changes
  useEffect(() => {
    if (filteredItems.length > 0) {
      setSelectedItem(filteredItems[0]);
    }
  }, [activeTab]);

  const tabs = [
    { id: "award", label: "Awards & Recognitions" },
    { id: "certification", label: "ISO Certifications" },
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleMobileToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <section className="pt-15 xl:pt-25px">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl leading-[1.205882352941176] text-black dark:text-white pb-6 xl:pb-[47px] ">
            {certificationsData.title}
          </h2>
        </div>

        <div className="bg-light-white dark:bg-light-dark pb-6 lg:pb-0 pt-57px">
          <div className="container">
            {/* Tab Navigation */}
            <div className="flex md:flex-row flex-col border-y border-smgray dark:border-white gap-2 md:gap-0 xl:gap-12 w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 w-fit cursor-pointer text-xl leading-[1.2] xl:leading-[2.173913043478261] transition-all duration-300 border-t-6 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-black dark:text-white border-secondary"
                      : "border-transparent text-forground dark:text-white/70"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[3fr_1.9fr] mt-5 md:mt-0">
              {/* Left Column - Tabs and List */}
              <div className="lg:border-r border-smgray dark:border-white lg:pr-[67px] xl:pr-[67px] pt-6 xl:pt-[47px]">
                {/* Items List */}
                <div className="space-y-1">
                  {filteredItems.map((item, index, arr) => (
                    <div key={`${item.category}-${index}`}>
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          handleMobileToggle(index);
                        }}
                        className={`w-full text-left flex items-center justify-between pb-4 xl:pb-[27px] mb-4 xl:mb-[27px] ${
                          index != arr.length - 1
                            ? "border-b border-smgray dark:border-white"
                            : ""
                        } transition-all duration-200 group ${
                          selectedItem === item ? "border-b-primary" : ""
                        }`}
                      >
                        <div>
                          <h3
                            className={`text-xl leading-normal mb-1 group-hover:text-black group-hover:dark:text-white/70 ${
                              selectedItem === item
                                ? "text-black dark:text-white"
                                : "dark:text-white"
                            }`}
                          >
                            {item.title}
                          </h3>
                          <p className="text-lg font-light leading-lh-text19 text-gray-600 dark:text-gray-400 group-hover:text-black group-hover:dark:text-white/60">
                            {item.info}
                          </p>
                        </div>
                        <div>
                          <Image
                            src={assets.linkArrowGreen}
                            alt={item.title}
                            width={50}
                            height={50}
                            className={`w-4 h-4 xl:w-[19.08px] xl:h-[19.05px]
                       opacity-0 group-hover:opacity-100 -translate-x-2 translate-y-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 ${
                         selectedItem === item
                           ? "opacity-100 translate-x-0"
                           : ""
                       }`}
                          />
                        </div>
                      </button>
                      <div
                        className={`lg:pl-12 lg:pt-6 xl:pl-[67px] xl:pt-[47px] px-3 md:px-5 mb-5
                  ${openIndex === index ? "block" : "hidden"} lg:hidden`}
                      >
                        {selectedItem === item && (
                          <DetailsBlock
                            selectedItem={selectedItem}
                            handleOpenModal={handleOpenModal}
                            assets={assets.expandPlusIcon}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Document Preview */}
              <div className="lg:pl-12 lg:pt-6 xl:pl-[67px] xl:pt-[47px] hidden lg:block">
                <DetailsBlock
                  selectedItem={selectedItem}
                  handleOpenModal={handleOpenModal}
                  assets={assets.expandPlusIcon}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/80 z-10 flex items-center justify-center p-4 overflow-hidden">
          <div className="relative container h-full ">
            {/* Modal Controls */}
            <div className="absolute top-4 right-0 z-10 flex items-center z-20">
              {/* Download Button */}
              <div className="border-r border-white/54">
                <button
                  onClick={handleDownload}
                  className="px-3 text-black rounded-full transition-all duration-200 shadow-lg hover:scale-105 "
                  title="Download"
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 xl:w-[28px] xl:h-[28px]"
                  >
                    <path
                      d="M8.62662 15.8294L14.9878 22.22L21.3757 15.8294M1 21.1981V25.9416C1 26.8068 1.29331 27.5328 1.87992 28.1197C2.46654 28.7066 3.19103 29 4.05338 29H25.9466C26.809 29 27.5335 28.7066 28.1201 28.1197C28.7067 27.5328 29 26.8068 29 25.9416V21.1981M15.0049 1V22.2089"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <div>
                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className=" text-black px-3 rounded-full transition-all duration-200 shadow-lg hover:scale-105"
                  title="Close"
                >
                  <svg
                    width="31"
                    height="30"
                    viewBox="0 0 31 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 xl:w-[28px] xl:h-[28px]"
                  >
                    <path
                      d="M9.54592 21.2041L15.75 15M21.9541 8.79592L15.75 15M15.75 15L21.9541 21.2041M15.75 15L9.54592 8.79592M15.7598 29C13.8237 29 12.0024 28.6324 10.2957 27.8971C8.58905 27.1616 7.10442 26.1637 5.84184 24.9033C4.57925 23.6426 3.5817 22.1619 2.84918 20.4612C2.11639 18.7605 1.75 16.9434 1.75 15.0098C1.75 13.0737 2.11762 11.2524 2.85286 9.54571C3.58837 7.83905 4.58633 6.35442 5.84673 5.09184C7.10741 3.82925 8.5881 2.8317 10.2888 2.09918C11.9895 1.36639 13.8066 1 15.7402 1C17.6763 1 19.4976 1.36762 21.2043 2.10286C22.911 2.83837 24.3956 3.83633 25.6582 5.09673C26.9207 6.35741 27.9183 7.8381 28.6508 9.53878C29.3836 11.2395 29.75 13.0566 29.75 14.9902C29.75 16.9263 29.3824 18.7476 28.6471 20.4543C27.9116 22.161 26.9137 23.6456 25.6533 24.9082C24.3926 26.1707 22.9119 27.1683 21.2112 27.9008C19.5105 28.6336 17.6934 29 15.7598 29Z"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="pt-30 mx-auto ">
              <Image
                src={selectedItem?.thumbnail}
                alt={selectedItem.documentTitle}
                width={1500}
                height={1500}
                className="w-auto h-auto xl:w-[400px] max-w-full h-auto mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
