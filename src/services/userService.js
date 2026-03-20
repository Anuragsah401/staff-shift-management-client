import userApiClient from "./userApiClient";

export const fetchUserShifts = async () => {
  const { data } = await userApiClient.get("/user/shifts");
  return data.shifts;
};

export const fetchUserTimesheets = async () => {
  const { data } = await userApiClient.get("/user/timesheets");
  return data.timesheets;
};

export const clockIn = async () => {
  const { data } = await userApiClient.post("/user/clock-in");
  return data.timesheet;
};

export const clockOut = async () => {
  const { data } = await userApiClient.post("/user/clock-out");
  return data.timesheet;
};

export const requestLeave = async (payload) => {
  const { data } = await userApiClient.post("/user/leaves", payload);
  return data.leave;
};
