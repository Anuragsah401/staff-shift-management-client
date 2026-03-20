import React, { useEffect, useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import { Button } from "../../components/ui/Button";
import { fetchLeaves, approveLeave, rejectLeave } from "../../services/leaveService";

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLeaves = async () => {
    try {
      const data = await fetchLeaves();
      setLeaves(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const handleApprove = async (id) => {
    await approveLeave(id);
    await loadLeaves();
  };

  const handleReject = async (id) => {
    await rejectLeave(id);
    await loadLeaves();
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Leave Requests" subtitle="Approve or reject employee leave requests." />

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-left">Start</th>
              <th className="px-4 py-3 text-left">End</th>
              <th className="px-4 py-3 text-left">Reason</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  Loading leave requests...
                </td>
              </tr>
            ) : leaves.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No leave requests.
                </td>
              </tr>
            ) : (
              leaves.map((leave) => (
                <tr key={leave.id} className="border-t border-gray-100">
                  <td className="px-4 py-3">{leave.employee_name || leave.employee_id}</td>
                  <td className="px-4 py-3">{leave.start_date}</td>
                  <td className="px-4 py-3">{leave.end_date}</td>
                  <td className="px-4 py-3">{leave.reason || "-"}</td>
                  <td className="px-4 py-3 capitalize">{leave.status}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleApprove(leave.id)}>
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleReject(leave.id)}>
                      Reject
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaves;
