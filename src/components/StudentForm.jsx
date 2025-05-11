import { useState, useEffect } from "react";
import "../index.css"

function StudentForm({ onSubmit, initialData, onClose }) {
  const [form, setForm] = useState({
    name: "",
    studentId: "",
    studentClass: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">{initialData ? "Edit" : "Add"} Student</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="input" />
      <input name="studentId" placeholder="Student ID" value={form.studentId} onChange={handleChange} required className="input mt-2" />
      <input name="studentClass" placeholder="Class" value={form.studentClass} onChange={handleChange} required className="input mt-2" />
      <div className="mt-4 flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Save</button>
        <button onClick={onClose} type="button" className="bg-gray-400 text-white px-4 py-1 rounded">Cancel</button>
      </div>
    </form>
  );
}

export default StudentForm;
