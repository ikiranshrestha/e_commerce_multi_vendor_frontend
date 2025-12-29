import { useState, useEffect } from "react";
import api from "../api/axios";

export default function useImportStatus(importId, interval = 3000) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!importId) return;
    const fetchStatus = async () => {
      try {
        const res = await api.get(`/imports/${importId}`);
        setStatus(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStatus();
    const id = setInterval(fetchStatus, interval);
    return () => clearInterval(id);
  }, [importId, interval]);

  return status;
}
