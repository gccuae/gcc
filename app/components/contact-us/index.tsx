import StandardBnr from "@/app/components/common/StandardBnr";
import Main from "./Main";
import ContactInfo from "./ContactInfo";
import { contactType } from "./type";

const Index = ({ data }: { data: contactType }) => {
  return (
    <>
      {!data.firstSection.hidden && (
        <>
          <section className="pt-57px dark:bg-black">
            <div className="container">
              <StandardBnr title={data.firstSection.pageTitle} />
            </div>
          </section>
          {/* <Main data={data.firstSection} /> */}
        </>
      )}
      {!data.secondSection.hidden && <ContactInfo data={data.secondSection} />}
    </>
  );
};

export default Index;
