import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CameraFeed } from "./components/cameraFeed";
import { ASLQuiz } from "./components/ASLQuiz";
import './App.css'

function HomePage() {
  const [letters, setLetters] = useState([]);

  const handleBackspace = () => {
    setLetters((prev) => prev.slice(0, -1));
  };

  const handleClearAll = () => {
    setLetters([]);
  };

  return (
    <>
      <div className='wholePage'>
        <div className='logo'> 
          <h3>ASL Translator</h3>
        </div>
        <div style={{ margin: '10px' }}>
          <Link to="/quiz">
            <button style={{
                  padding: "8px 16px",
                  fontSize: "1rem",
                  backgroundColor: "#f1d6ff",
                  border: "1px solid black",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginBottom: "10px",
                }}>Take ASL Quiz</button>
          </Link>
        </div>
        <div className='cameraBody'>
          <CameraFeed setLetters={setLetters}/>
        </div>
        <div style={{ textAlign: "center"}}>
          <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Detected Letters:
          </div>
          <div style={{ fontSize: "1.5rem", marginTop: "10px" }}>
            {letters.join(" ")}
            <div style={{ marginTop: "15px" }}>
              <button
                onClick={handleBackspace}
                style={{
                  padding: "8px 16px",
                  fontSize: "1rem",
                  backgroundColor: "#ff9999",
                  border: "1px solid black",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                  marginTop: "10px",
                }}
              >
                ⌫ DELETE
              </button>
              <button
                onClick={handleClearAll}
                style={{
                  padding: "8px 16px",
                  fontSize: "1rem",
                  backgroundColor: "#ccffcc",
                  border: "1px solid black",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                CLEAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<ASLQuiz />} />
      </Routes>
    </Router>
  );
}

export default App
