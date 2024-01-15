export const createCronJob = async (jobData) => {
  try {
    const res = await fetch("https://api.cron-job.org/jobs", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CRON_JOB_API_KEY}`,
      },
      body: JSON.stringify(jobData),
    });

    if (res.ok) {
      const responseData = await res.json();
      return responseData;
    } else {
      // Handle non-ok responses
      console.error("Failed to create cron job:", res.status, res.statusText);
      throw new Error(
        `Failed to create cron job: ${res.status} ${res.statusText}`
      );
    }
  } catch (error) {
    console.error("Error creating cron job:", error);
  }
};

export const getCronJob = async (cronJobId) => {
  try {
    const res = await fetch(`https://api.cron-job.org/jobs/${cronJobId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.CRON_JOB_API_KEY}`,
      },
    });

    if (res.ok) {
      const responseData = await res.json();
      return responseData;
    } else {
      console.error("Failed to get cron job:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Error getting cron job:", error);
  }
}

export const deleteCronJob = async (cronJobId) => {
  try {
    const res = await fetch(`https://api.cron-job.org/jobs/${cronJobId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.CRON_JOB_API_KEY}`,
      },
    });

    if (res.ok) {
      const responseData = await res.json();
      return responseData;
    } else {
      console.error("Failed to delete cron job:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Error deleting cron job:", error);
  }
};

export const updateCronJob = async (cronJobId) => {
  try {
    const res = await fetch(`https://api.cron-job.org/jobs/${cronJobId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.CRON_JOB_API_KEY}`,
      },
    });

    if (res.ok) {
      const responseData = await res.json();
      return responseData;
    } else {
      console.error("Failed to update cron job:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Error updating cron job:", error);
  }
};
