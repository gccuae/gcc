"use client";

import { aboutData } from "./data";
import { Accordion } from "./Accordion";
const VMV = () => {
  const vmvItems = Object.values(aboutData.vmv).map(item => ({
    title: item.title,
    content: item.desc,
    icon: item.icon,
  }));
  return ( 
    <section className="py-57px dark:bg-black">
      <div className="container">
       <div className="border-b border-smgray pb-8 xl:pb-57px">
          <h2 className="text-6xl leading-lh-title text-black dark:text-white mb-[17px]">Vision, Mission & Values</h2>
          <h3 className="text-2xl leading-[1.2] lg:leading-[1.5625] dark:text-white">Guided by Purpose, Powered by Principles</h3>
       </div>
        <div>
          <Accordion items={vmvItems} />
        </div>
      </div>
    </section>
   );
}
 
export default VMV;