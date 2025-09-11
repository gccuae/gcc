const JobSpecs = () => {
  return ( 
    <section className="dark:bg-black pt-57px">
      <div className="container">
        <div className="pb-57px">
          <h2 className="text-2xl leading-lh-text32 text-black dark:text-white">Job Specifications</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-[63px] pb-57px border-b border-smgray">
          <div className="pt-27px border-t border-smgray">
            <h3 className=" leading-[1.5625] font-light uppercase text-black dark:text-white">Job Title</h3>
            <p className="text-lg leading-[1.842105263157895] font-medium dark:text-white">Site Engineer</p>
          </div>
          <div className="pt-27px border-t border-smgray">
            <h3 className=" leading-[1.5625] font-light uppercase text-black dark:text-white">Department</h3>
            <p className="text-lg leading-[1.842105263157895] font-medium dark:text-white">Site Engineer</p>
          </div>
          <div className="pt-27px border-t border-smgray">
            <h3 className=" leading-[1.5625] font-light uppercase text-black dark:text-white">Location</h3>
            <p className="text-lg leading-[1.842105263157895] font-medium dark:text-white">Site Engineer</p>
          </div>
          <div className="pt-27px border-t border-smgray">
            <h3 className=" leading-[1.5625] font-light uppercase text-black dark:text-white">Employment Type</h3>
            <p className="text-lg leading-[1.842105263157895] font-medium dark:text-white">Site Engineer</p>
          </div>
        </div>
      </div>
    </section>
   );
}
 
export default JobSpecs;