import React, { useEffect, useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import StatCard from "../../components/admin/StatCard";
import { fetchDashboard } from "../../services/dashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalShiftsToday: 0,
    pendingLeaveRequests: 0,
    employeesClockedIn: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchDashboard();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader title="Admin Dashboard" subtitle="Overview of today's workforce activity." />
      {loading ? (
        <div className="text-gray-500">Loading dashboard...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard label="Total Employees" value={stats.totalEmployees} />
          <StatCard label="Total Shifts Today" value={stats.totalShiftsToday} />
          <StatCard label="Pending Leave Requests" value={stats.pendingLeaveRequests} />
          <StatCard label="Employees Clocked In" value={stats.employeesClockedIn} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
