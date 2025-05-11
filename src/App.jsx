import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Drives from "./pages/Drives";
import MarkVaccination from "./pages/MarkVaccination";
// import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Link } from "react-router-dom";

function Layout({ children }) {
  const { logout } = useAuth();

  return (
    <div>
      <nav className="bg-gray-800 p-4 text-white flex justify-between">
        <div className="space-x-4">
        <Link to="/dashboard">Dashboard</Link>
      <Link to="/students">Students</Link>
      <Link to="/drives">Drives</Link>
      <Link to="/mark-vaccination">MarkVaccination</Link>
        </div>
        <button onClick={logout} className="bg-white text-blue-600 px-3 py-1 rounded">
          Logout
        </button>
      </nav>
      <div>{children}</div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
      {/* <Navbar /> */}
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={
            <PrivateRoute>
              <Layout><Dashboard /></Layout>
            </PrivateRoute>
          } />

          <Route path="/students" element={
            <PrivateRoute>
              <Layout><Students /></Layout>
            </PrivateRoute>
          } />

          <Route path="/drives" element={
            <PrivateRoute>
              <Layout><Drives /></Layout>
            </PrivateRoute>
          } />

          <Route path="/mark-vaccination" element={
            <PrivateRoute>
              <Layout><MarkVaccination /></Layout>
            </PrivateRoute>
          } />

          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
