import Index from '@/app/components/Terms-and-conditions';
import { TermsConditionsType } from '@/app/components/Terms-and-conditions/type';

export default function TermsAndConditionsPage() {
  const data: TermsConditionsType = {
    title: "Terms & Conditions",
    sections: [
      {
        heading: "",
        content: "",
      },
    ],
  };

  return <Index data={data} />;
}
