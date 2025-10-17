import MsgGm from "./MsgGm";
import MsgChairman from "./MsgChairman";
import { MessageProps } from "./type";

const Index = ({ data }: MessageProps) => {
  return (
    <>
      <MsgChairman items={data.messageSection.items} />
      <MsgGm items={data.messageSection.items} />
    </>
  );
};

export default Index;
