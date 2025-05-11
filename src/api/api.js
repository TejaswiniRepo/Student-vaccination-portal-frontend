import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/student-vaccination-portal",
});

export const getStudents = (query = "") => api.get(`/students${query}`);
export const addStudent = (student) => api.post("/students", student);
export const updateStudent = (id, student) => api.put(`/students/${id}`, student);

export const getDrives = () => api.get("/drives");
export const addDrive = (drive) => api.post("/drives", drive);
export const updateDrive = (id, drive) => api.put(`/drives/${id}`, drive);


export const getEligibleStudents = (driveId) => api.get(`/drives/${driveId}/eligible-students`);
export const markStudentVaccinated = (studentId, driveId) => api.post(`/students/${studentId}/vaccinate/${driveId}`);
export const getVaccinationProgress = () => api.get("/dashboard/vaccination-progress");

export const downloadCsvReport = () => api.get("/reports/export/csv", { responseType: "blob" });

export const downloadPdfReport = () => api.get("/reports/export/pdf", { responseType: "blob" });

export const uploadStudentCsv = (formData) => api.post("/students/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export default api;
