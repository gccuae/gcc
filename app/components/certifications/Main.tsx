"use client";
import { useEffect, useState } from "react";
import { certificationsData } from "./data";
import Image from "next/image";
import { assets } from "@/public/assets/assets";

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
  const [activeTab, setActiveTab] = useState('award');
  const [selectedItem, setSelectedItem] = useState<CertificationItem | null>(null);

  // Combine all items from both awards and certifications
  const allItems = [
    ...certificationsData.awards.items,
    ...certificationsData.certifications.items
  ];

  // Filter items based on active tab
  const filteredItems = allItems.filter(item => item.category === activeTab);

  // Set default selected item when tab changes
  useEffect(() => {
    if (filteredItems.length > 0) {
      setSelectedItem(filteredItems[0]);
    }
  }, [activeTab]);

  const tabs = [
    { id: 'award', label: 'Awards & Recognitions' },
    { id: 'certification', label: 'ISO Certifications' }
  ];

  return (
    <section className="py-25 xl:py-50">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl leading-[1.205882352941176] text-black dark:text-white pb-6 xl:pb-[57px] ">
          {certificationsData.title}
        </h2>
      </div>

      <div className="bg-light-white dark:bg-gray-900 pt-57px">
        <div className="container">
          {/* Tab Navigation */}
          <div className="flex border-y border-smgray dark:border-gray-700 ">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium text-xl leading-[2.173913043478261] transition-all duration-300 border-t-4 whitespace-nowrap ${activeTab === tab.id
                  ? 'text-black dark:text-green-400 border-accent dark:border-green-400'
                  : ' dark:text-gray-400 border-transparent hover:text-black '
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[3fr_1.9fr]">

            {/* Left Column - Tabs and List */}
            <div className="border-r border-smgray dark:border-gray-700 pr-6 xl:pr-[67px] pt-6 xl:pt-[47px]">
              {/* Items List */}
              <div className="space-y-1">
                {filteredItems.map((item, index) => (
                  <button
                    key={`${item.category}-${index}`}
                    onClick={() => setSelectedItem(item)}
                    className={`w-full text-left flex items-center justify-between pb-4 xl:pb-[27px] mb-4 xl:mb-[27px] border-b border-smgray last:border-b-0 dark:border-gray-700 transition-all duration-200 group ${selectedItem === item
                      ? 'border-b-primary'
                      : ''
                      }`}
                  >
                    <div>
                      <h3 className={`font-medium text-xl leading-normal mb-1 group-hover:text-black ${selectedItem === item
                        ? 'text-black dark:text-white'
                        : 'dark:text-white'
                        }`}>
                        {item.title}
                      </h3>
                      <p className="text-lg leading-lh-text19 text-gray-600 dark:text-gray-400 group-hover:text-black">
                        {item.info}
                      </p>
                    </div>
                    <div>
                      <Image src={assets.linkArrowGreen} alt={item.title} width={50} height={50} className={`w-4 h-4 xl:w-[19.08px] xl:h-[19.05px]
                       opacity-0 group-hover:opacity-100 -translate-x-2 translate-y-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 ${selectedItem === item ? 'opacity-100 translate-x-0' : ''}`} /> 
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Document Preview */}
            <div className="pl-12 pt-6 xl:pl-[67px] xl:pt-[47px]">
              {selectedItem ? (
                <div className="overflow-hidden">
                  {/* Document Image */}
                  <div className="bg-[#ebebeb] dark:bg-gray-700 py-2 xl:py-[13.74px] flex  justify-center">
                    {/* Certificate/Award Document Mockup */}
                    <Image src={selectedItem.thumbnail} alt={selectedItem.title} width={500} height={500} className="object-contain w-auto h-[300px]" />
                    <div className="w-full max-w-md bg-white dark:bg-gray-100 shadow-lg transform rotate-1 hidden">
                      <div className="bg-red-600 text-white text-xs p-2 text-center font-semibold">
                        {selectedItem.category === 'award' ? 'AWARD CERTIFICATE' : 'ISO CERTIFICATION'}
                      </div>
                      <div className="p-6 text-black">
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                            <span className="text-2xl">
                              {selectedItem.category === 'award' ? '🏆' : '📋'}
                            </span>
                          </div>
                          <h4 className="font-bold text-lg mb-2">
                            {selectedItem.documentTitle}
                          </h4>
                          <p className="text-sm text-gray-600 mb-4">
                            {selectedItem.documentInfo}
                          </p>
                        </div>

                        <div className="border-t pt-4 text-xs text-gray-500 text-center">
                          <p>This certificate validates compliance with</p>
                          <p className="font-semibold">industry standards and best practices</p>
                        </div>

                        <div className="mt-4 flex justify-between items-center text-xs">
                          <div className="text-gray-500">
                            <p>Certificate ID: {selectedItem.category.toUpperCase()}-{String(Date.now()).slice(-6)}</p>
                          </div>
                          <div className="w-12 h-12 border border-gray-300 flex items-center justify-center">
                            <span className="text-xs">SEAL</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Document Details */}
                  <div className="pt-4 xl:pt-[19.74px]">
                    <div className="flex align-items-end justify-between mb-4 pb-3 xl:pb-[22.9px] group border-b border-smgray">
                     <div>
                        <h3 className="text-xl leading-normal font-normal text-gray-900 dark:text-white mb-2 xl:mb-[11.22px]">
                          {selectedItem.documentTitle}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 ">
                          {selectedItem.documentInfo}
                        </p>
                     </div>
                      <button className="h-fit align-self-end text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={() => window.open(selectedItem.document, '_blank')} >
                        <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.97079 16.1716L15.2248 22.444L21.5051 16.1716M1.47266 21.441V26.0966C1.47266 26.9458 1.76102 27.6584 2.33776 28.2345C2.91449 28.8105 3.62677 29.0985 4.4746 29.0985H25.999C26.8468 29.0985 27.5591 28.8105 28.1358 28.2345C28.7126 27.6584 29.0009 26.9458 29.0009 26.0966V21.441M15.2416 1.61658V22.433" stroke="black" strokeWidth="2" strokeLinecap="round" className="group-hover:stroke-primary dark:stroke-gray-400 dark:group-hover:stroke-gray-200" />
                        </svg>

                      </button>
                    </div>


                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                  <div className="text-gray-400 text-6xl mb-4">📋</div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                    Select an item to view details
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose an award or certification from the list to see the document preview.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;