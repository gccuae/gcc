import Main from "./sections/Main";
import QualityAssurance from "./sections/QualityAssurance";
import HealthandSafety from "./sections/HealthandSafety";
import WhyQhse from "./sections/WhyQhse";
import EnvironmentResponsibility from "./sections/EnvironmentResponsibility";
import { QhseType } from "./type";
import CertificationMain from "../certifications/Main";
import { AwardsPageData } from "../certifications/type";

const Index = ({
  data,
  certificationsData,
}: {
  data: QhseType;
  certificationsData: AwardsPageData;
}) => {
  return (
    <>
      {!data.firstSection.hidden && <Main
        title={data.firstSection.mainTitle}
        subtitle={data.firstSection.subTitle}
        description={data.firstSection.description}
        primaryColorText={data.firstSection.primaryColorText}
      />}
      {!data.secondSection.hidden && <QualityAssurance
        title={data.secondSection.title}
        description={data.secondSection.description}
        image={data.secondSection.image}
        certifications={data.secondSection.items}
      />}
      {!data.thirdSection.hidden && <HealthandSafety
        title={data.thirdSection.title}
        description={data.thirdSection.description}
        measures={data.thirdSection.items}
      />}
      {!data.forthSection.hidden && <EnvironmentResponsibility
        title={data.forthSection.title}
        description={data.forthSection.description}
        matters={data.forthSection.items}
      />}
      {!data.fifthSection.hidden && <WhyQhse
        title={data.fifthSection.title}
        description={data.fifthSection.description}
        matters={data.fifthSection.items}
      />}
      {!data.certificateHidden && <CertificationMain data={certificationsData} />}
    </>
  );
};

export default Index;
