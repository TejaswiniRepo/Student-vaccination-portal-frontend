import { useEffect, useState } from "react";
import {
  getDrives,
  getEligibleStudents,
  markStudentVaccinated,
} from "../api/api";

function MarkVaccination() {
  const [drives, setDrives] = useState([]);
  const [selectedDriveId, setSelectedDriveId] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getDrives().then((res) => setDrives(res.data));
  }, []);

  const handleDriveSelect = async (e) => {
    const driveId = e.target.value;
    setSelectedDriveId(driveId);
    if (driveId) {
      const res = await getEligibleStudents(driveId);
      setStudents(res.data);
    } else {
      setStudents([]);
    }
  };

  const handleMark = async (studentId) => {
    await markStudentVaccinated(studentId, selectedDriveId);
    // refresh the list
    const res = await getEligibleStudents(selectedDriveId);
    setStudents(res.data);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Mark Student as Vaccinated</h1>
      <select
        value={selectedDriveId}
        onChange={handleDriveSelect}
        className="border rounded p-2 mb-4 w-1/2"
      >
        <option value="">Select a Drive</option>
        {drives.map((d) => (
          <option key={d.id} value={d.id}>
            {d.vaccineName} - {d.dateOfDrive}
          </option>
        ))}
      </select>

      {selectedDriveId && (
        <table className="w-full border mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Student ID</th>
              <th className="p-2 border">Class</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-2 text-center">All students are vaccinated or no eligible students found.</td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s.id}>
                  <td className="p-2 border">{s.name}</td>
                  <td className="p-2 border">{s.studentId}</td>
                  <td className="p-2 border">{s.studentClass}</td>
                  <td className="p-2 border">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded"
                      onClick={() => handleMark(s.id)}
                    >
                      Mark Vaccinated
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MarkVaccination;
