import Image from "next/image";

interface DetailsBlockProps {
  selectedItem: {
    title: string;
    info: string;
    thumbnail: string;
    document: string;
    documentTitle: string;
    documentInfo: string;
    category: string;
  } | null;
  handleOpenModal: () => void;
  assets: string;
}

const DetailsBlock: React.FC<DetailsBlockProps> = ({
  selectedItem,
  handleOpenModal,
  assets,
}) => {
  if (!selectedItem) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 text-center">
        <div className="text-gray-400 text-6xl mb-4">📋</div>
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
          Select an item to view details
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Choose an award or certification from the list to see the document
          preview.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Document Image */}
      <div className="bg-[#ebebeb] dark:bg-[#0d0d0d] py-2 xl:py-[13.74px] flex justify-center relative group">
        <Image
          src={selectedItem.thumbnail}
          alt={selectedItem.title}
          width={500}
          height={500}
          className="object-contain w-auto h-[300px] md:h-[450px]"
        />

        {/* Overlay */}
        <div className="absolute inset-0 w-full h-full linear-gradient-to-r from-transparent to-black z-[5] opacity-[20]"></div>
        <div className="absolute inset-0 w-full h-full z-10 bg-black/63 flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={handleOpenModal} className="rounded-full bg-white w-15 h-15 xl:w-[91.73px] xl:h-[91.73px] flex items-center justify-center cursor-pointer transition-all duration-300"
          >
            <Image src={assets} alt={selectedItem.title} width={50} height={50} className="w-4 h-4 md:w-6 md:h-6 xl:w-auto xl:h-8 transition-all duration-300" />
          </button>
        </div>
        <button
          className="xl:hidden h-fit  mt-auto align-self-end absolute bottom-4 right-4 z-20 bg-white/80 p-3 rounded-full opacity-90 hover:opacity-100 transition-opacity duration-300"
          onClick={() => window.open(selectedItem.document, "_blank")}
        >
          <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path
              d="M8.97079 16.1716L15.2248 22.444L21.5051 16.1716M1.47266 21.441V26.0966C1.47266 26.9458 1.76102 27.6584 2.33776 28.2345C2.91449 28.8105 3.62677 29.0985 4.4746 29.0985H25.999C26.8468 29.0985 27.5591 28.8105 28.1358 28.2345C28.7126 27.6584 29.0009 26.9458 29.0009 26.0966V21.441M15.2416 1.61658V22.433"
              stroke="black" strokeWidth="2" strokeLinecap="round" className="group-hover:stroke-primary dark:stroke-gray-400 dark:group-hover:stroke-primary" />
          </svg>
        </button>
      </div>

      {/* Document Details */}
      <div className="pt-0 xl:pt-[19.74px]">
        <div className="flex align-items-end justify-between mb-0 pb-2 xl:pb-[22.9px] group border-b dark:border-white/20 hover:border-primary transition-colors duration-300">
          <div>
            <h3 className="hidden xl:block text-xl leading-normal font-normal text-black dark:text-white mb-2 xl:mb-[11.22px]">
              {selectedItem.documentTitle}
            </h3>
            <p className="hidden xl:block text-black dark:text-white/70 font-light text-19">
              {selectedItem.documentInfo}
            </p>
          </div>
          <button
            className="hidden xl:block h-fit mt-auto align-self-end cursor-pointer"
            onClick={() => window.open(selectedItem.document, "_blank")}
          >
            <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <path
                d="M8.97079 16.1716L15.2248 22.444L21.5051 16.1716M1.47266 21.441V26.0966C1.47266 26.9458 1.76102 27.6584 2.33776 28.2345C2.91449 28.8105 3.62677 29.0985 4.4746 29.0985H25.999C26.8468 29.0985 27.5591 28.8105 28.1358 28.2345C28.7126 27.6584 29.0009 26.9458 29.0009 26.0966V21.441M15.2416 1.61658V22.433"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                className="group-hover:stroke-primary dark:stroke-gray-400 dark:group-hover:stroke-primary"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsBlock;
