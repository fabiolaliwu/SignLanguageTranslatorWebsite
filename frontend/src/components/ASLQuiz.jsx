import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CameraFeed } from './cameraFeed';

const letters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];

export function ASLQuiz({ detectedLetter, setDetectedLetter }) {
    const [quizLetter, setQuizLetter] = useState('');
    const [feedback, setFeedback] = useState('');

    // Pick a random letter when the component mounts or when quizLetter changes
    useEffect(() => {
        setQuizLetter(letters[Math.floor(Math.random() * letters.length)]);
        setFeedback('');
        setDetectedLetter(""); // Clear previous detection
    }, []);

    // Check for correct answer
    useEffect(() => {
        if (detectedLetter && detectedLetter.toUpperCase() === quizLetter) {
            setFeedback('✅ Correct!');
            // Move to next letter after a short delay
            setTimeout(() => {
                setQuizLetter(letters[Math.floor(Math.random() * letters.length)]);
                setFeedback('');
                setDetectedLetter("");
            }, 1500);
        } else if (detectedLetter) {
            setFeedback('❌ Try again!');
        }
    }, [detectedLetter, quizLetter, setDetectedLetter]);
   
    return (
        <div className='wholePage'>
            <div className='logo'> 
                <h3>ASL Quiz</h3>
            </div>
            <div className='cameraBody'>
                <CameraFeed setDetectedLetter={setDetectedLetter}/>
                <div className='letterPart'>
                    <div style={{ fontSize: "1.5rem", fontWeight: "bold", width: "100%"}}>
                        Sign this letter:
                    </div>
                    <div style={{ 
                        fontSize: "3rem", 
                        fontWeight: "bold", 
                        color: "#6a1b9a",
                        margin: "20px 0"
                    }}>
                        {quizLetter}
                    </div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "bold", width: "100%"}}>
                        Your sign:
                    </div>
                    <div style={{ 
                        fontSize: "2rem", 
                        fontWeight: "bold", 
                        color: "#6a1b9a",
                        margin: "10px 0"
                    }}>
                        {detectedLetter ? detectedLetter.toUpperCase() : "None"}
                    </div>
                    <div style={{ 
                        fontSize: "1.5rem", 
                        fontWeight: "bold", 
                        color: feedback.includes('✅') ? "#4CAF50" : "#f44336",
                        margin: "10px 0"
                    }}>
                        {feedback}
                    </div>
                    <div className="letter-actions">
                        <Link to="/">
                            <button
                                style={{
                                    padding: "8px 16px",
                                    fontSize: "1rem",
                                    backgroundColor: "#f1d6ff",
                                    border: "1px solid black",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginRight: "10px",
                                    marginTop: "10px",
                                }}
                            >
                                ← HOME
                            </button>
                        </Link>
                        <button
                            onClick={() => {
                                setQuizLetter(letters[Math.floor(Math.random() * letters.length)]);
                                setFeedback('');
                                setDetectedLetter("");
                            }}
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
                            NEXT LETTER
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

