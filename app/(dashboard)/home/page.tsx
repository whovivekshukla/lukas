import schedule from "node-schedule";
import { prisma } from "@/lib/db";
import { getUserFromClerkId } from "@/lib/auth";
import { performScheduledInspection } from "@/lib/api";

const scheduleInspection = async () => {
  const user = await getUserFromClerkId();
  const missionToPerform = await prisma.mission.findFirst({
    where: {
      userId: user.id,
      status: "pending",
    },
    orderBy: {
      InspectionTime: "desc",
    },
  });

  if (!missionToPerform) {
    return "No mission to perform";
  }
  console.log(missionToPerform.InspectionTime);
  console.log(new Date());
  schedule.scheduleJob(missionToPerform.InspectionTime, async () => {
    await performScheduledInspection(missionToPerform);
  });
};

scheduleInspection();

const HomePage = async () => {
  return (
    <div>
      <h1>Mission Inspection Status</h1>
    </div>
  );
};
export default HomePage;
