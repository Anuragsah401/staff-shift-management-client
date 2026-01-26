import React, { useEffect, useState } from "react";
import UserHeader from "components/ui/UserHeader";
import CurrentTime from "./CurrentTime";
import CurrentStatus from "./CurrentStatus";
import TimeClockButtons from "./TimeClockButtons";
import MonthlyStats from "./MonthlyStats";
import WeeklyOverview from "./WeeklyOverview";
import WorkHistory from "./WorkHistory";

const UserLayout = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className=" lg:px-8 py-8 px-6">
      {/* Current Time */}
      <CurrentTime currentTime={currentTime} />

      {/* Time Clock Section */}

      <div className="flex flex-col md:flex-row gap-6 items-stretch bg-white rounded-lg shadow-md mb-6  py-4">
        <div className="flex-1 md:p-6 md:border-r border-gray-200">
          <CurrentStatus checkInTime={checkInTime} />
          {/* Check In / Check Out Buttons */}
          <TimeClockButtons
            checkInTime={checkInTime}
            setCheckInTime={setCheckInTime}
            checkOutTime={checkOutTime}
            setCheckOutTime={setCheckOutTime}
          />
        </div>
        <div className="flex-1 md:px-6">
          <MonthlyStats />
        </div>
      </div>

      {/* Weekly Overview */}
      <WeeklyOverview />

      {/* Work History */}
      <WorkHistory />
    </div>
  );
};

export default UserLayout;
