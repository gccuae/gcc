import ContactForm from "./ContactForm";
const Main = () => {
  return ( 
    <section className="pb-57px dark:bg-black">
      <div className="container">
        <div className="grid grid-cols-1 xl:grid-cols-[387px_auto] gap-6 xl:gap-12">
          <div className="">
            <h3 className="text-3xl leading-[1.5625] text-black dark:text-white">Message Us</h3>
            <p className="text-lg leading-[1.5625] dark:text-white">Fill out the form to send us a message.</p>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
   );
}
 
export default Main;