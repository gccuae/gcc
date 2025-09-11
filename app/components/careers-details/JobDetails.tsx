import BtnPrimary from "../common/BtnPrimary";


const JobDetails = () => {
  return ( 
    <section className="dark:bg-[#0d0d0d]">
      <div className="container">
        <div className="pt-47px pb-57px border-b border-smgray">
          <h2 className="text-2xl leading-lh-text32 text-black dark:text-white mb-27px">About the Role</h2>
          <p className="text-lg leading-lh-text19 mb-2 font-light">We’re seeking a skilled and proactive Site Engineer to join our dynamic Construction team based in Abu Dhabi. This role is ideal for someone with a solid foundation in engineering principles, a passion for hands-on construction execution, and a commitment to maintaining high standards of safety, quality, and efficiency.  </p>
          <p className="text-lg leading-lh-text19 mb-2 font-light">As a Site Engineer, you will play a pivotal role in overseeing daily site operations, managing on-ground technical activities, and ensuring that all work aligns with project specifications, timelines, and regulatory standards. You’ll collaborate closely with contractors, consultants, project managers, and site workers to streamline workflows, resolve technical challenges, and drive progress on site. Your ability to multitask, adapt to evolving conditions, and lead with precision will be key in successfully delivering high-quality construction projects.</p>
          <p className="text-lg leading-lh-text19 mb-2 font-light">This is a full-time, on-site opportunity designed for professionals who thrive in fast-paced environments and are eager to contribute meaningfully to landmark construction projects in the UAE.</p>
        </div>
        <div className="pt-47px pb-57px border-b border-smgray">
          <h2 className="text-2xl leading-lh-text32 text-black dark:text-white mb-27px">Key Responsibilities</h2>
        <div className="flex flex-col gap-37px">
            <div>
              <h3 className="text-lg leading-lh-text19 font-medium text-forground dark:text-white mb-3 xl:mb-5">Site Supervision & Execution</h3>
              <ul className="square-list list-inside ">
                <li className="text-lg leading-lh-text19 font-light ">Oversee construction activities including planning, scheduling, and execution of tasks</li>
                <li className="text-lg leading-lh-text19 font-light">Ensure work aligns with design specifications, blueprints, and quality standardsOversee construction activities including planning, scheduling, and execution of tasks</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg leading-lh-text19 font-medium text-forground dark:text-white mb-3 xl:mb-5">Quality Assurance & Control</h3>
              <ul className="square-list list-inside">
                <li className="text-lg leading-lh-text19 font-light">Monitor workmanship and materials to meet project quality requirements</li>
                <li className="text-lg leading-lh-text19 font-light">Conduct inspections and tests; document results and resolve issues proactively</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg leading-lh-text19 font-medium text-forground dark:text-white mb-3 xl:mb-5">Safety Management</h3>
              <ul className="square-list list-inside">
                <li className="text-lg leading-lh-text19 font-light">Enforce HSE policies and site safety regulations</li>
                <li className="text-lg leading-lh-text19 font-light">Conduct safety briefings, site audits, and ensure proper use of PPE</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg leading-lh-text19 font-medium text-forground dark:text-white mb-3 xl:mb-5">Required Qualifications</h3>
              <ul className="square-list list-inside">
                <li className="text-lg leading-lh-text19 font-light">Minimum of 5 years of experience in site engineering</li>
                <li className="text-lg leading-lh-text19 font-light">3–5 years of experience in a similar role within commercial or infrastructure projects</li>
                <li className="text-lg leading-lh-text19 font-light">Proficiency reading and interpreting construction drawings and specifications</li>
                <li className="text-lg leading-lh-text19 font-light">Familiarity with construction software (e.g., MS Project, AutoCAD, Primavera)</li>
                <li className="text-lg leading-lh-text19 font-light">Willingness to work on-site for extended periods</li>
              </ul>
            </div>
        </div>
        </div>
        <div className="pt-47px pb-57px border-b border-smgray">
          <h3 className="text-2xl leading-lh-text32 text-black dark:text-white mb-27px">Apply Now and Join Our Team</h3>
          <p className="text-lg leading-lh-text19 font-light dark:text-white mb-27px">Thank you for your interest in becoming a part of Gulf Contractors Company. We’re excited to learn more about your qualifications and look forward to exploring how you can contribute to our ongoing success.</p>
          <BtnPrimary link="#" text="Apply Now" bgtrans={true} />
        </div>

      </div>
    </section>
   );
}
 
export default JobDetails;