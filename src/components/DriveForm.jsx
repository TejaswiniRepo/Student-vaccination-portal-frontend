import { useEffect, useState } from "react";
import "../index.css"

function DriveForm({ onSubmit, initialData, onClose }) {
  const [form, setForm] = useState({
    vaccineName: "",
    dateOfDrive: "",
    availableDoses: "",
    applicableClasses: "",
  });

  useEffect(() => {
    if (initialData) setForm({ ...initialData, applicableClasses: initialData.applicableClasses.join(",") });
  }, [initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...form,
      availableDoses: parseInt(form.availableDoses),
      applicableClasses: form.applicableClasses.split(",").map((c) => c.trim()),
    };
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">{initialData ? "Edit" : "Create"} Drive</h2>
      <input name="vaccineName" placeholder="Vaccine Name" value={form.vaccineName} onChange={handleChange} required className="input" />
      <input type="date" name="dateOfDrive" value={form.dateOfDrive} onChange={handleChange} required className="input mt-2" />
      <input name="availableDoses" type="number" value={form.availableDoses} onChange={handleChange} placeholder="Available Doses" className="input mt-2" required />
      <input name="applicableClasses" placeholder="Applicable Classes (e.g., 5,6,7)" value={form.applicableClasses} onChange={handleChange} className="input mt-2" required />
      <div className="mt-4 flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Save</button>
        <button onClick={onClose} type="button" className="bg-gray-400 text-white px-4 py-1 rounded">Cancel</button>
      </div>
    </form>
  );
}

export default DriveForm;
