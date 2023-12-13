const createURL = (path) => {
  return window.location.origin + path;
};

//  pass req.json in the createMission function

export const createMission = async ({ missionData }) => {
  try {
    console.log(missionData);

    const res = await fetch(
      new Request(createURL("/api/missions/create"), {
        method: "POST",
        body: JSON.stringify(missionData),
      })
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
