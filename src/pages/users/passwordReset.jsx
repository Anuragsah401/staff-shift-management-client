import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import apiClient from "../../services/apiClient";

const UserPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [resetToken, setResetToken] = useState(null);

  const handleRequestToken = async () => {
    try {
      setStatus(null);
      const { data } = await apiClient.post("/auth/user/password-reset", { email });
      setResetToken(data.resetToken || null);
      setStatus(data.message || "Reset token generated.");
    } catch (error) {
      console.error(error);
      setStatus("Unable to generate reset token.");
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      setStatus(null);
      await apiClient.post("/auth/user/reset", { email, token, password });
      setStatus("Password updated successfully. You can log in now.");
      setToken("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setStatus("Reset failed. Please check the token and try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-slate-100 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-sm text-gray-600">
            Request a reset token and set a new password. (For now, tokens are returned in the
            response.)
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <Button type="button" variant="outline" onClick={handleRequestToken}>
            Generate Reset Token
          </Button>
          {resetToken && (
            <p className="text-xs text-gray-500 break-all">Reset token: {resetToken}</p>
          )}
        </div>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Token</label>
            <input
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="Paste reset token"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="New password"
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <Button type="submit">Reset Password</Button>
        </form>

        {status && <p className="text-sm text-gray-600">{status}</p>}
      </div>
    </div>
  );
};

export default UserPasswordReset;
