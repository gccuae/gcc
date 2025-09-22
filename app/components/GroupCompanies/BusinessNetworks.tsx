"use client"
import { groupCompaniesData } from "./data";
import BusinessNetworkCard from "./BusinessNetworkCard";
const BusinessNetworks = () => {

  return (
    <section className="py-57px">
      <div className="container">
        <div className="mb-5 xl:mb-[47px]">
          <h2 className="text-6xl leading-lh-title text-black mb-5 xl:mb-[27px]">Business Networks</h2>
          <p className="text-lg leading-lh-text19 text-black font-light mb-0">GCC emerged from the strategic partnership between two distinguished conglomerates Al Sharafi Group and United Eastern (UE) Group. This collaboration has laid the foundation for a strong and diversified organization with extensive capabilities across the construction, infrastructure, and industrial sectors.  Our associated and sister companies include the following.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-8 ">
          {groupCompaniesData.section2.items.map((item, index) => (
            <BusinessNetworkCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BusinessNetworks;