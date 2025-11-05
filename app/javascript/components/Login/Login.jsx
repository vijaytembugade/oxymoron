import React, { useState } from "react";
import authApi from "../../apis/auth";
import { setAuthHeaders, setToLocalStorage } from "../../apis/axios";

// Basic login component with controlled email & password inputs.
// Props:
//   onSubmit(credentials) -> optional callback receiving { email, password }
// Controlled pattern: local component state drives input value & updates.
const Login = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitting(true);
    try {
      const response = await authApi.login({ email, password });
      await setToLocalStorage({
        authToken: response?.data?.authentication_token,
        email: email.toLowerCase(),
        userId: response.data.id,
        userName: response.data.name,
      });
      await setAuthHeaders();
      window.location.href = "/";
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-sm mx-auto p-4 border rounded"
    >
      <div>
        <label htmlFor="login-email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mt-1 w-full border rounded px-2 py-1"
          placeholder="you@example.com"
          required
        />
      </div>
      <div>
        <label htmlFor="login-password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mt-1 w-full border rounded px-2 py-1"
          placeholder="••••••••"
          required
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 text-white rounded py-2 disabled:opacity-50"
      >
        {submitting ? "Logging in…" : "Login"}
      </button>
    </form>
  );
};

export default Login;
