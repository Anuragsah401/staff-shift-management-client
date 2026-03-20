import React, { useCallback, useEffect, useMemo, useState } from "react";
import CurrentTime from "./CurrentTime";
import CurrentStatus from "./CurrentStatus";
import TimeClockButtons from "./TimeClockButtons";
import MonthlyStats from "./MonthlyStats";
import WeeklyOverview from "./WeeklyOverview";
import WorkHistory from "./WorkHistory";
import LeaveRequestForm from "./LeaveRequestForm";
import {
  fetchUserShifts,
  fetchUserTimesheets,
  clockIn,
  clockOut,
  requestLeave,
} from "../../services/userService";
import { getUserInfo } from "../../services/userAuthService";

const UserLayout = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const user = getUserInfo();
  const employeeId = user?.id;
  const [shifts, setShifts] = useState([]);
  const [timesheets, setTimesheets] = useState([]);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const loadUserData = useCallback(async () => {
    if (!employeeId) return;
    setLoading(true);
    try {
      const [shiftData, timesheetData] = await Promise.all([
        fetchUserShifts(),
        fetchUserTimesheets(),
      ]);
      setShifts(shiftData);
      setTimesheets(timesheetData);

      const openEntry = timesheetData.find((entry) => !entry.clock_out);
      setCheckInTime(openEntry ? new Date(openEntry.clock_in) : null);
      setCheckOutTime(openEntry?.clock_out ? new Date(openEntry.clock_out) : null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const handleClockIn = async () => {
    await clockIn();
    await loadUserData();
  };

  const handleClockOut = async () => {
    await clockOut();
    await loadUserData();
  };

  const handleLeaveRequest = async (payload) => {
    await requestLeave(payload);
  };

  const workHistory = useMemo(
    () =>
      timesheets.map((entry) => {
        const clockInDate = new Date(entry.clock_in);
        const clockOutDate = entry.clock_out ? new Date(entry.clock_out) : null;
        return {
          id: entry.id,
          date: clockInDate.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          checkIn: clockInDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          checkOut: clockOutDate
            ? clockOutDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-",
          totalHours: entry.hours_worked ? `${entry.hours_worked}h` : "-",
        };
      }),
    [timesheets],
  );

  const totalHours = useMemo(
    () => timesheets.reduce((sum, entry) => sum + Number(entry.hours_worked || 0), 0),
    [timesheets],
  );
  const daysWorked = useMemo(
    () => timesheets.filter((entry) => entry.clock_out).length,
    [timesheets],
  );
  const averageHours = daysWorked ? totalHours / daysWorked : 0;

  const weeklyData = useMemo(() => {
    const buckets = {};
    timesheets.forEach((entry) => {
      const date = new Date(entry.clock_in);
      const label = `Week ${getWeekOfMonth(date)}`;
      buckets[label] = (buckets[label] || 0) + Number(entry.hours_worked || 0);
    });
    return Object.keys(buckets).length
      ? Object.entries(buckets).map(([week, hours]) => ({ week, hours }))
      : [{ week: "Week 1", hours: 0 }];
  }, [timesheets]);

  const todaysShift = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const shift = shifts.find((item) => item.date === today);
    return shift ? `${shift.start_time} - ${shift.end_time}` : null;
  }, [shifts]);

  const monthLabel = currentTime.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className=" lg:px-8 py-8 px-6 space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Employee Portal</h2>
          <p className="text-sm text-gray-500">
            Welcome back{user?.name ? `, ${user.name}` : ""}. Your data is loaded from your account.
          </p>
        </div>
        <button
          onClick={loadUserData}
          className="px-4 py-2 rounded-md bg-orange-500 text-white font-semibold"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>
      {/* Current Time */}
      <CurrentTime currentTime={currentTime} />

      {/* Time Clock Section */}

      <div className="flex flex-col md:flex-row gap-6 items-stretch bg-white rounded-lg shadow-md mb-6  py-4">
        <div className="flex-1 md:p-6 md:border-r border-gray-200">
          <CurrentStatus checkInTime={checkInTime} todaysShift={todaysShift} />
          {/* Check In / Check Out Buttons */}
          <TimeClockButtons
            checkInTime={checkInTime}
            checkOutTime={checkOutTime}
            onClockIn={handleClockIn}
            onClockOut={handleClockOut}
          />
        </div>
        <div className="flex-1 md:px-6">
          <MonthlyStats
            monthLabel={monthLabel}
            totalHours={totalHours}
            daysWorked={daysWorked}
            averageHours={averageHours}
          />
        </div>
      </div>

      {/* Weekly Overview */}
      <WeeklyOverview weeklyData={weeklyData} />

      <LeaveRequestForm onSubmit={handleLeaveRequest} />

      {/* Work History */}
      <WorkHistory entries={workHistory} />
    </div>
  );
};

const getWeekOfMonth = (date) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const day = date.getDate() + start.getDay() - 1;
  return Math.floor(day / 7) + 1;
};

export default UserLayout;
