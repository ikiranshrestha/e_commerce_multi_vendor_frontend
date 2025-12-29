import { useState } from "react";
import ImportForm from "../components/ImportForm";
import ImportStatus from "../components/ImportStatus";

export default function ImportPage({ merchantId }) {
  const [importId, setImportId] = useState(null);

  return (
    <div>
      <h1>Import Products</h1>
      {!importId ? (
        <ImportForm merchantId={merchantId} onStart={(id) => setImportId(id)} />
      ) : (
        <ImportStatus importId={importId} />
      )}
    </div>
  );
}
