const MissionCard = ({ mission }) => {
  return (
    <div className="bg-white p-4 mb-4 rounded-md shadow-md">
      {" "}
      <p className="text-xl font-bold mb-2">{mission.name}</p>{" "}
      <p className="text-gray-600">{mission.status}</p>{" "}
      <p className="text-gray-600">{mission.waypoints}</p>{" "}
      <p className="text-gray-600">{mission.altitude}</p>{" "}
      <p className="text-gray-600">{mission.speed}</p>{" "}
      <div className="mt-4 flex items-center justify-between">
        {" "}
        <span className="text-sm text-gray-500">{mission.createdAt}</span>{" "}
        <button className="text-blue-500 hover:underline">Delete</button>{" "}
      </div>{" "}
    </div>
  );
};

export default MissionCard;