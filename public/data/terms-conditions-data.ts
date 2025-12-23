import type { TermsConditionsType } from "@/app/components/Terms-and-conditions/type";

export type TermsConditionsDataType = {
  metaTitle: string;
  metaDescription: string;
  banner: string;
  bannerAlt: string;
  pageTitle: string;
  firstSection: { title: string; description: string; image: string; imageAlt: string };
  secondSection?: { title: string; description: string; image: string; imageAlt: string };
  thirdSection?: { title: string; description: string; image: string; imageAlt: string };
  fourthSection?: { title: string; description: string; image: string; imageAlt: string };
};