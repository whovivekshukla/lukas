import Link from "next/link";

const MissionCard = ({ mission, onDelete }) => {
  return (
    <div className="bg-white p-4 mb-4 rounded-md shadow-md">
      <p className="text-xl font-bold mb-2">
        <Link href={`/missions/${mission.id}`}>{mission.name}</Link>
      </p>
      <p className="text-gray-600">Status: {mission.status}</p>
      <div className="max-h-32 overflow-y-auto">
        <p className="text-gray-600">{JSON.stringify(mission.waypoints)}</p>
      </div>
      <p className="text-gray-600">Altitude: {mission.altitude}</p>
      <p className="text-gray-600">Speed: {mission.speed}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {new Date(mission.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
        <button className="text-blue-500 hover:underline" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MissionCard;
