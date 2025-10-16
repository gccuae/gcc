import Main from "./sections/Main";
import QualityAssurance from "./sections/QualityAssurance";
import HealthandSafety from "./sections/HealthandSafety";
import WhyQhse from "./sections/WhyQhse";
import EnvironmentResponsibility from "./sections/EnvironmentResponsibility";
import { QhseType } from "./type";

const Index = ({data}: {data:QhseType}) => {
  return (
    <>
      <Main
        title={data.firstSection.mainTitle}
        subtitle={data.firstSection.subTitle}
        description={data.firstSection.description}
        primaryColorText={data.firstSection.primaryColorText}
      />
      <QualityAssurance
        title={data.secondSection.title}
        description={data.secondSection.description}
        image={data.secondSection.image}
        certifications={data.secondSection.items}
      />
      <HealthandSafety
        title={data.thirdSection.title}
        description={data.thirdSection.description}
        measures={data.thirdSection.items}
      />
      <EnvironmentResponsibility
        title={data.forthSection.title}
        description={data.forthSection.description}
        matters={data.forthSection.items}
      />
      <WhyQhse
        title={data.fifthSection.title}
        description={data.fifthSection.description}
        matters={data.fifthSection.items}
      />
    </>
  );
};

export default Index;
