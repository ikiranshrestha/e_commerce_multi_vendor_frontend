import { useState } from "react";
import api from "../api/axios";

export default function ImportForm({ merchantId, onStart }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a CSV file");

    const formData = new FormData();
    formData.append("csv_file", file);

    try {
      const res = await api.post(`/merchants/${merchantId}/products/import`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Import started successfully! ID: " + res.data.data.id);
      if (onStart) onStart(res.data.data.id);
    } catch (err) {
      console.error(err);
      setMessage("Failed to start import");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload CSV</button>
      {message && <p>{message}</p>}
    </form>
  );
}
