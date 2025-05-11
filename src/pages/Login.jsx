// src/pages/Login.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hardcoded login
    if (username === "admin" && password === "admin123") {
      login();
      navigate("/dashboard");
    } else {
      alert("Invalid credentials. Try admin/admin123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
        <h1 className="text-xl font-bold mb-4 text-center">School Vaccination Portal</h1>
        <input className="input w-full mb-3" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input className="input w-full mb-4" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="bg-blue-600 text-white w-full py-2 rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;
