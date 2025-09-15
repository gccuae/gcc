import {
  firstSection,
  secondSection,
  thirdSection,
  fourthSection,
  fifthSection,
} from "./data";
import Main from "./sections/Main";
import QualityAssurance from "./sections/QualityAssurance";
import HealthandSafety from "./sections/HealthandSafety";
import WhyQhse from "./sections/WhyQhse";
import EnvironmentResponsibility from "./sections/EnvironmentResponsibility";

const Index = () => {
  return (
    <>
      <Main
        title={firstSection.title}
        subtitle={firstSection.subtitle}
        description={firstSection.description}
      />
      <QualityAssurance
        title={secondSection.title}
        description={secondSection.description}
        image={secondSection.image}
        certifications={secondSection.certifications}
      />
      <HealthandSafety
        title={thirdSection.title}
        description={thirdSection.description}
        measures={thirdSection.measures}
      />
      <EnvironmentResponsibility
        title={fourthSection.title}
        description={fourthSection.description}
        matters={fourthSection.matters}
      />
      <WhyQhse
        title={fifthSection.title}
        description={fifthSection.description}
        matters={fifthSection.matters}
      />
    </>
  );
};

export default Index;
