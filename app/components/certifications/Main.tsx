"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import Lenis from "@studio-freight/lenis";
import DetailsBlock from "./DetailsBlock";
import { AwardsProps, CertificationItem } from "./type";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

const Main = ({ data }: AwardsProps) => {
  const [activeTab, setActiveTab] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<CertificationItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const savedScrollY = useRef(0);

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis();
    window.lenis = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (window.lenis === lenis) {
        delete window.lenis;
      }
    };
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isModalOpen]);

  // Initialize active tab and selected item
  useEffect(() => {
    if (data.categories.length > 0) {
      setActiveTab(data.categories[0].category);
      if (data.categories[0].files.length > 0) {
        setSelectedItem(data.categories[0].files[0]);
        // Set mobile accordion open for the first file
        setOpenIndex(0);
      }
    }
  }, [data]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    savedScrollY.current = window.scrollY;
    document.body.classList.add("modal-open");
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollY.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.querySelector("header")?.classList.add("modal-open");
    window.lenis?.stop();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("modal-open");
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "auto";
    document.querySelector("header")?.classList.remove("modal-open");
    window.scrollTo(0, savedScrollY.current);
    window.lenis?.start();
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.querySelector("header")?.classList.remove("modal-open");
    };
  }, []);

  const handleDownload = () => {
    if (selectedItem?.file) {
      const link = document.createElement("a");
      link.href = selectedItem.file;
      link.download = `${selectedItem.mainTitle}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleMobileToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Filter items based on active tab
  const filteredItems = data.categories.filter(
    (item) => item.category === activeTab
  );

  return (
    <>
      <section className="pt-6 lg:pt-15 xl:pt-25px">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl leading-[1.205882352941176] text-black dark:text-white pb-6 xl:pb-[47px]">
            {data.pageTitle}
          </h2>
        </div>

        <div className="bg-light-white dark:bg-light-dark pb-6 lg:pb-0 pt-57px">
          <div className="container">
            {/* Tab Navigation */}
            <div className="flex md:flex-row flex-col border-y dark:border-white/20 dark:border-white/20 gap-2 md:gap-8 xl:gap-18 2xl:gap-25 w-full">
              {data.categories.map((cat) => (
                <button
                  key={cat.category}
                  onClick={() => setActiveTab(cat.category)}
                  className={`py-3 w-fit cursor-pointer text-xl leading-[1.2] xl:leading-[2.173913043478261] transition-all duration-300 border-t-6 whitespace-nowrap ${activeTab === cat.category
                    ? "text-black dark:text-white border-secondary "
                    : "border-transparent text-para-color dark:text-white/70"
                    }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[3fr_1.9fr] mt-5 md:mt-0 lg:items-start">
              {/* Left Column - Items List */}
              <div className="lg:border-r dark:border-white/20 dark:border-white/20 lg:pr-[67px] xl:pr-[67px] pt-6 xl:pt-[47px]">
                <div className="space-y-1">
                  {filteredItems[0]?.files.length === 0 && (
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">
                        No items found for the selected category.
                      </p>
                    </div>
                  )}

                  {filteredItems.map((item, categoryIndex) => (
                    <div key={`${item.category}-${categoryIndex}`}>
                      {item.files.map((file, fileIndex) => {
                        const combinedIndex = categoryIndex * 1000 + fileIndex;
                        return (
                          <div key={file._id}>
                            {/* Button */}
                            <button
                              onClick={() => {
                                setSelectedItem(file);
                                handleMobileToggle(combinedIndex);
                              }}
                              className={`w-full text-left flex items-center justify-between pb-4 xl:pb-[27px] mb-4 xl:mb-[27px] cursor-pointer ${fileIndex !== item.files.length - 1
                                ? "border-b  "
                                : ""
                                } transition-all duration-200 group ${selectedItem === file ? "border-b-primary" : ""
                                }`}
                            >
                              <div>
                                <h3 className={`text-xl leading-normal mb-1 transition-all duration-300 
                                  ${selectedItem === file
                                    ? "text-black dark:text-white"
                                    : "text-para-color dark:text-white/70 group-hover:text-black group-hover:dark:text-white/70"
                                  }`}
                                >
                                  {file.mainTitle}
                                </h3>

                                <p className={`text-lg font-light leading-lh-text19 transition-all duration-300 
                                    ${selectedItem === file
                                    ? "text-black dark:text-white/80"
                                    : "text-gray-600 dark:text-gray-400 group-hover:text-black group-hover:dark:text-white/60"
                                  }`}
                                >
                                  {file.subTitle}
                                </p>
                              </div>
                              <div>
                                <Image src={assets.linkArrowGreen} alt={file.mainTitle} width={50} height={50}
                                  className={`w-4 h-4 xl:w-[19.08px] xl:h-[19.05px] opacity-0 group-hover:opacity-100 -translate-x-2 translate-y-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 ${selectedItem === file ? "opacity-100 translate-x-0" : ""
                                    }`}
                                />
                              </div>
                            </button>

                            {/* Mobile Accordion */}
                            <div className={`lg:pl-12 lg:pt-6 xl:pl-[67px] xl:pt-[47px] px-0 md:px-5 mb-5 ${openIndex === combinedIndex ? "block" : "hidden" } lg:hidden`} >
                              {selectedItem === file && (
                                <DetailsBlock
                                  selectedItem={{
                                    title: file.mainTitle,
                                    info: file.subTitle,
                                    thumbnail: file.thumbnail || "",
                                    document: file.file,
                                    documentTitle: file.mainTitle,
                                    documentInfo: file.subTitle,
                                    category: item.category,
                                  }}
                                  handleOpenModal={handleOpenModal}
                                  assets={assets.expandPlusIcon}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Document Preview */}
              <div className="lg:pl-12 lg:pt-6 xl:pl-[67px] xl:pt-[47px] hidden lg:block lg:sticky lg:top-20 xl:top-24 2xl:top-28 self-start">
                <DetailsBlock
                  selectedItem={
                    selectedItem
                      ? {
                        title: selectedItem.mainTitle,
                        info: selectedItem.subTitle,
                        thumbnail: selectedItem.thumbnail || "",
                        document: selectedItem.file,
                        documentTitle: selectedItem.mainTitle, // or another field
                        documentInfo: selectedItem.subTitle,
                        category: selectedItem.category || activeTab,
                      }
                      : null
                  }
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
        <div
          className="fixed inset-0 bg-black/90 z-[999] overflow-y-auto px-4 py-5 sm:px-6 sm:py-8"
          onClick={handleCloseModal}
        >
          {/* Button Wrapper */}
          <div className="fixed top-4 right-4 sm:top-6 sm:right-6 flex gap-2 z-[1000]">
            {/* Download */}
            <div className="border-r border-white/54">
              <button onClick={handleDownload} className="px-3 sm:px-4 text-black rounded-full transition-all duration-200 shadow-lg hover:scale-105" title="Download" >
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 xl:w-[28px] xl:h-[28px]" >
                  <path
                    d="M8.62662 15.8294L14.9878 22.22L21.3757 15.8294M1 21.1981V25.9416C1 26.8068 1.29331 27.5328 1.87992 28.1197C2.46654 28.7066 3.19103 29 4.05338 29H25.9466C26.809 29 27.5335 28.7066 28.1201 28.1197C28.7067 27.5328 29 26.8068 29 25.9416V21.1981M15.0049 1V22.2089"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Close */}
            <div>
              <button onClick={handleCloseModal} className="px-1 text-black rounded-full transition-all duration-200 shadow-lg hover:scale-105" title="Close" >
                <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 xl:w-[28px] xl:h-[28px]" >
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
          <div className="mx-auto mt-12 sm:mt-16 flex w-full items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <Image src={selectedItem.thumbnail || ""} alt={selectedItem.mainTitle || "Document preview"} width={1500} height={1500} className="w-auto h-auto max-h-[68vh] sm:max-h-[72vh] lg:max-h-[76vh] max-w-full object-contain mx-auto" />
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
