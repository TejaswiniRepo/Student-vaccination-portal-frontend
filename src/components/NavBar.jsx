import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex gap-6">
      <Link to="/">Dashboard</Link>
      <Link to="/students">Students</Link>
      <Link to="/drives">Drives</Link>
      <Link to="/mark-vaccination">MarkVaccination</Link>
    </nav>
  );
}

export default Navbar;
