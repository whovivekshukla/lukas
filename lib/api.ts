const createURL = (path) => {
  return window.location.origin + path;
};


export const createMission = async ({ missionData }) => {
  try {
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

export const getAllMissions = async () => {
  try {
    const res = await fetch(
      new Request(createURL("/api/missions"), {
        method: "GET",
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
