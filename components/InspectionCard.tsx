import Link from "next/link";
import Badge from "./BadgeComponent";

const InspectionCard = ({ mission, onDelete }) => {
  return (
    <div className="p-4 mb-4 rounded-md shadow-md">
      <p className="text-xl font-bold mb-2">
        <Link href={`/missions/${mission.id}`}>{mission.name}</Link>
      </p>
      <div className="flex flex-row">
        <p className="text-gray-600 font-bold mr-2">Status:</p>
        {<Badge status={mission.status} />}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {new Date(mission.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};

export default InspectionCard;
