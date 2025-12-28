import ImportPage from "./pages/ImportPage";

function App() {
  const merchantId = 1; // replace with real merchant context

  return (
    <div className="App">
      <ImportPage merchantId={merchantId} />
    </div>
  );
}

export default App;
