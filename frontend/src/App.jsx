import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CameraFeed } from "./components/cameraFeed";
import { ASLQuiz } from "./components/ASLQuiz";
import './App.css'

function HomePage({ detectedLetter, setDetectedLetter, letters, setLetters }) {
  const handleBackspace = () => {
    setLetters((prev) => prev.slice(0, -1));
  };

  const handleClearAll = () => {
    setLetters([]);
  };

  const handleLetterDetected = (letter) => {
    setDetectedLetter(letter);
  };

  return (
    <>
      <div className='wholePage'>
        <div className='logo'> 
          <h3>ASL Translator</h3>
        </div>
        <div className='cameraBody'>
          <CameraFeed setLetters={setLetters}/>
          <div className='letterPart'>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", width: "100%"}}>
              detected letters
            </div>
            <div className="outputLetters">
              {letters.join(" ")}
            </div>
            <div className="letter-actions">
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
      <div className="quiz-float-btn">
        <Link to="/quiz">
          <button>
            TAKE ASL QUIZ
          </button>
        </Link>
      </div>
    </>
  )
}

function App() {
  const [detectedLetter, setDetectedLetter] = useState("");
  const [letters, setLetters] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <HomePage
            detectedLetter={detectedLetter}
            setDetectedLetter={setDetectedLetter}
            letters={letters}
            setLetters={setLetters}
          />
        } />
        <Route path="/quiz" element={<ASLQuiz detectedLetter={detectedLetter} setDetectedLetter={setDetectedLetter} />} />
      </Routes>
    </Router>
  );
}

export default App
