import { useEffect, useState } from "react";
import { getDrives, addDrive, updateDrive } from "../api/api";
import DriveForm from "../components/DriveForm";
import "../index.css"

function Drives() {
  const [drives, setDrives] = useState([]);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadDrives = () => {
    getDrives().then((res) => setDrives(res.data));
  };

  useEffect(() => {
    loadDrives();
  }, []);

  const isEditable = (driveDate) => {
    const now = new Date();
    const drive = new Date(driveDate);
    return drive > now;
  };

  const handleCreate = () => {
    setSelectedDrive(null);
    setShowForm(true);
  };

  const handleEdit = (drive) => {
    if (!isEditable(drive.dateOfDrive)) {
      alert("Cannot edit past drives.");
      return;
    }
    setSelectedDrive(drive);
    setShowForm(true);
  };

  const handleSave = async (driveData) => {
    if (selectedDrive) {
      await updateDrive(selectedDrive.id, driveData);
    } else {
      await addDrive(driveData);
    }
    setShowForm(false);
    loadDrives();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Vaccination Drives</h1>
        <button className="bg-green-600 text-white px-4 py-1 rounded" onClick={handleCreate}>Create Drive</button>
      </div>
      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Vaccine</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Doses</th>
            <th className="p-2 border">Classes</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drives.map((d) => (
            <tr key={d.id}>
              <td className="p-2 border">{d.vaccineName}</td>
              <td className="p-2 border">{d.dateOfDrive}</td>
              <td className="p-2 border">{d.availableDoses}</td>
              <td className="p-2 border">{d.applicableClasses.join(", ")}</td>
              <td className="p-2 border">
                {isEditable(d.dateOfDrive) && (
                  <button className="text-blue-600" onClick={() => handleEdit(d)}>Edit</button>
                )}
                {!isEditable(d.dateOfDrive) && <span className="text-gray-400">Expired</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <DriveForm
            initialData={selectedDrive}
            onSubmit={handleSave}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}
    </div>
  );
}

export default Drives;
