
import { clientsData } from "./data";
import Image from "next/image";
const ClientList = () => {
  return ( 
    <section className="pb-57px">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-l border-t border-smgray/56">
          {clientsData.clients.map((client, index) => (
            <div key={index} className="p-4 xl:p-6 flex items-center justify-center border-r border-b border-smgray/56 group h-30 xl:h-[380px]">
              <Image src={client} alt={`client-${index + 1}`} width={300} height={300} className="max-w-full h-full object-contain group-hover:scale-110 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
   );
}
 
export default ClientList;