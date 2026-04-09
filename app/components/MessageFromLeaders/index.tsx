import MsgGm from "./MsgGm";
import MsgChairman from "./MsgChairman";
import { MessageProps } from "./type";
import LeadersShowcase from "./LeadersShowcase";

const Index = ({ data }: MessageProps) => {
  return (
    <>
    <LeadersShowcase data={data.firstSection}/>
      <MsgChairman items={data.messageSection.items} />
      <MsgGm items={data.messageSection.items} />
    </>
  );
};

export default Index;
