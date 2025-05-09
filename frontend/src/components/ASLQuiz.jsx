import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CameraFeed } from './cameraFeed';

const letters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];

export function ASLQuiz() {
    

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
            <p>Sign the Letter: </p>
            <div className='cameraBody'>
                <CameraFeed/>
            </div>
        </div>
    )
}

