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
