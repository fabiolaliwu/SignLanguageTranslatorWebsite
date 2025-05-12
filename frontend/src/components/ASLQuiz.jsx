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
        <div className="quizPage">
            <div className='logo'> 
                <h3>ASL Quiz</h3>
            </div>
            <div style={{ marginTop: '10px' }}>
                <Link to="/">
                    <button style={{
                        padding: "8px 16px",
                        fontSize: "1rem",
                        backgroundColor: "#f1d6ff",
                        border: "1px solid black",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginBottom: "10px",
                    }}>Go to Home</button>
                </Link>
            </div>
            <p>Sign the Letter: <span style={{fontWeight: 'bold', fontSize: '2rem'}}>{quizLetter}</span></p>
            <p>
                Detected Letter:{" "}
                <span style={{fontWeight: 'bold', fontSize: '2rem', color: '#6a1b9a'}}>
                    {detectedLetter ? detectedLetter.toUpperCase() : "None"}
                </span>
            </p>
            <div className='cameraBody'>
                <CameraFeed setDetectedLetter={setDetectedLetter}/>
            </div>
        </div>
    )
}

