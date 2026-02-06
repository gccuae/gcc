import Main from "@/app/components/vendor-registration/Main";
import PageBnr from "@/app/components/common/PageBnr";

const Index = () => {
    return (
        <>
            <PageBnr
                pageTitle="Vendor Registration"
                bannerImg="/assets/img/clients/bnr.jpg"
                bannerAlt=""
            />
            <Main />
        </>
    );
};

export default Index;