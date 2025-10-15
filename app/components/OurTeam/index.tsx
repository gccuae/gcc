import LeadersList from "./LeadersList";
import StaffList from "./StaffList";
import { OurTeamProps } from "./type";

const Index = ({ data }: OurTeamProps) => {
  return (
    <>
      <LeadersList data={data} />
      <StaffList data={data} />
    </>
  );
};

export default Index;
