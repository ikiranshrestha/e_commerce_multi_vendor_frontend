# Multi-Merchant E-Commerce Platform Frontend

This React-based frontend provides a streamlined interface for merchants to manage bulk product operations, specifically focusing on CSV ingestion and real-time processing feedback.

---

## 1. Overview
The frontend is designed to handle long-running backend processes gracefully through:
* **Asynchronous File Uploads:** Efficient multi-part form handling for large CSVs.
* **Real-Time Progress Tracking:** Intelligent polling mechanism to provide instant feedback.
* **Component-Based Architecture:** Modular design for high maintainability.
* **Reactive UI:** Automatic state transitions based on import lifecycle.

---

## 2. Tech Stack
* **Framework:** React 18 (Vite)
* **HTTP Client:** Axios
* **Styling:** Tailwind CSS
* **State Management:** React Hooks (useState, useEffect)
* **Polling Logic:** Interval-based API synchronization

---

## 3. Project Setup

### Requirements
* Node.js >= 18
* NPM or Yarn

### Installation Steps
1. **Clone and Enter Repository:**
   git clone <repo-url>
   cd ecommerce-frontend

2. **Install Dependencies:**
   npm install

3. **Environment Configuration:**
   Ensure the API base URL in src/api/axios.js points to your local backend:
   baseURL: "http://localhost:8000/api"

4. **Start Development Server:**
   npm run dev

---

## 4. Project Structure



src/
├─ api/            # Axios instance and interceptors
├─ components/     # Logic-heavy UI components (ImportForm, ImportStatus)
├─ pages/          # View-level components (ImportPage)
├─ App.jsx         # Application entry and routing
└─ main.jsx        # DOM mounting

---

## 5. Core Functionality

### A. Bulk CSV Upload
The ImportForm component handles the multi-part form submission. Upon a successful upload, the backend returns a unique importId, which is then passed to the status tracker.

### B. Progress Polling
The system uses a non-blocking polling strategy to fetch updates every 3 seconds.

**Polling Logic Flow:**
1. Component mounts with importId.
2. setInterval triggers an Axios GET request.
3. UI updates processed_rows and progress_percentage.
4. Polling clears automatically when status is completed or failed.

---

## 6. API Integration

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | /merchants/{id}/products/import | Uploads CSV and initializes background job. |
| **GET** | /imports/{id} | Fetches current progress and row counts. |

### Sample Status Response
{
  "id": 12,
  "status": "processing",
  "processed_rows": 420,
  "failed_rows": 3,
  "total_rows": 1000,
  "progress": 42
}

---

## 7. Component Communication
The frontend maintains a clean data flow between the upload form and the status display:

// Example logic in ImportPage.jsx
<ImportForm 
  merchantId={merchantId} 
  onStart={(id) => setImportId(id)} 
/>

{importId && (
  <ImportStatus importId={importId} />
)}

---

## 8. Error Handling
* **Validation Errors:** Displays immediate feedback if the file type is not CSV.
* **Network Failures:** Axios interceptors handle 500/404 errors during polling to prevent UI crashes.
* **Partial Failures:** The UI distinguishes between Processed and Failed rows sent from the backend.

---

## 9. Summary
This frontend provides a robust user experience for merchant operations by abstracting the complexity of background queuing and offering clear, real-time visual progress.
