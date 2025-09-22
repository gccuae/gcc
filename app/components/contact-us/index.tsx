import StandardBnr from "@/app/components/common/StandardBnr";
import Main from "./Main";
import ContactInfo from "./ContactInfo";
const Index = () => {
  return (
    <>
      <section className="pt-57px dark:bg-black">
        <div className="container">
          <StandardBnr title="Let’s Connect with GCC" />
        </div>
      </section>
      <Main />
      <ContactInfo />
    </>
  );
};

export default Index;
