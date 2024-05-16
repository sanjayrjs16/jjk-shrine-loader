import { useState } from "react";
import ShrineFullScreenLoader from "./components/ShrineFullScreenLoader/ShrineFullScreenLoader";
import "./App.css";

function App() {
  const [showLoader, setShowLoader] = useState(false);

  return (
    <>
      <div className="card">
        <h1>Enter Sukuna's domain</h1>
        <button onClick={() => setShowLoader(true)}>
          Use Malovalent shrine
        </button>
      </div>
      {showLoader && <ShrineFullScreenLoader setLoading={setShowLoader} />}
    </>
  );
}

export default App;
