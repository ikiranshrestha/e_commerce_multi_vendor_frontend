import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ImportStatus({ importId }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await api.get(`/imports/${importId}/status`);
        setStatus(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 3000); // poll every 3 seconds
    return () => clearInterval(interval);
  }, [importId]);

  if (!status) return <p>Loading...</p>;

  return (
    <div>
      <p>Status: {status.status}</p>
      <p>
        Progress: {status.processed_rows}/{status.total_rows} (
        {Math.round((status.processed_rows / status.total_rows) * 100)}%)
      </p>
      <p>Failed Rows: {status.failed_rows}</p>
    </div>
  );
}
