import { useEffect, useState } from "react";
import api from "../api/api";
import '../index.css';
import { getVaccinationProgress } from "../api/api";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";
import { downloadCsvReport, downloadPdfReport } from "../api/api";

function Dashboard() {
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    api.get("/dashboard/summary").then((res) => setData(res.data));
    getVaccinationProgress().then(res => {
      setProgress(res.data.map(item => ({
        ...item,
        dateLabel: new Date(item.date).toLocaleDateString(),
      })));
    });
  }, []);
  

  function handleDownload(apiCall, filename, type) {
    apiCall().then(res => {
      const blob = new Blob([res.data], { type });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }


  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded">Total Students: {data.totalStudents}</div>
        <div className="bg-green-100 p-4 rounded">Vaccinated: {data.vaccinatedStudents}</div>
        <div className="bg-yellow-100 p-4 rounded">Vaccination Rate: {data.vaccinationRate.toFixed(2)}%</div>
      </div>
      <h2 className="mt-6 text-lg font-semibold">Upcoming Drives</h2>
      <ul>
        {data.upcomingDrives.map((drive) => (
          <li key={drive.id}>
            {drive.vaccineName} on {drive.dateOfDrive} (Classes: {drive.applicableClasses.join(", ")})
          </li>
        ))}
      </ul>
      <h2 className="text-lg font-semibold mb-2">Vaccination Progress Over Time</h2>
      <div className="bg-white p-4 rounded shadow mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progress}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="dateLabel" />
            <YAxis unit="%" />
            <Tooltip />
            <Line type="monotone" dataKey="percentage" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handleDownload(downloadCsvReport, "report.csv", "text/csv")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>

        <button
          onClick={() => handleDownload(downloadPdfReport, "report.pdf", "application/pdf")}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
