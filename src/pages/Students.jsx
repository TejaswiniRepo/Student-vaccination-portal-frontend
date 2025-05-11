import { useEffect, useState } from "react";
import { getStudents, addStudent, updateStudent, uploadStudentCsv } from "../api/api";
import StudentForm from "../components/StudentForm";
import "../index.css"

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadStudents = () => {
    const query = search ? `?search=${search}` : "";
    getStudents(query).then((res) => setStudents(res.data));
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleAdd = () => {
    setSelectedStudent(null);
    setShowForm(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setShowForm(true);
  };

  const handleSave = async (studentData) => {
    if (selectedStudent) {
      await updateStudent(selectedStudent.id, studentData);
    } else {
      await addStudent(studentData);
    }
    setShowForm(false);
    loadStudents();
  };

  function handleCsvUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    uploadStudentCsv(formData)
      .then(res => {
        alert(res.data);
      })
      .catch(() => alert("Upload failed"));
  }


  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Students</h1>
        <button className="bg-green-600 text-white px-4 py-1 rounded" onClick={handleAdd}>Add Student</button>
      </div>
      <input
        type="text"
        className="border p-1 rounded w-1/3 mb-3"
        placeholder="Search by name/class"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && loadStudents()}
      />
      <div className="my-4">
        <label className="block mb-2 font-semibold">Import Students (CSV)</label>
        <input
          type="file"
          accept=".csv"
          onChange={handleCsvUpload}
          className="border rounded px-4 py-2"
        />
      </div>
      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Student ID</th>
            <th className="p-2 border">Class</th>
            <th className="p-2 border">Vaccinated</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td className="p-2 border">{s.name}</td>
              <td className="p-2 border">{s.studentId}</td>
              <td className="p-2 border">{s.studentClass}</td>
              <td className="p-2 border">{s.vaccinated ? "Yes" : "No"}</td>
              <td className="p-2 border">
                <button className="text-blue-600" onClick={() => handleEdit(s)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <StudentForm
            initialData={selectedStudent}
            onSubmit={handleSave}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}
    </div>
  );
}

export default Students;
