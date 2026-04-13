import MsgGm from "./MsgGm";
import MsgChairman from "./MsgChairman";
import { MessageProps } from "./type";
import LeadersShowcase from "./LeadersShowcase";

const Index = ({ data }: MessageProps) => {
  return (
    <>
      {!data.firstSection.hidden && <LeadersShowcase data={data.firstSection} />}
      {!data.messageSection.hidden && <MsgChairman items={data.messageSection.items} />}
      {!data.messageSection.hidden && <MsgGm items={data.messageSection.items} />}
    </>
  );
};

export default Index;
