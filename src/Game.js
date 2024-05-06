import React, { useState } from 'react';
import GameScene from './GameScene'; // Import Code 1

function Game() {
    const [sessionId, setSessionId] = useState(null);
    const [counter, setCounter] = useState(null);
    const [session, setSession] = useState(null); // new state to store the latest session
    const [gameVisible, setGameVisible] = useState(false); // new state to control game visibility

    const startSession = () => {
        const newSessionId = Math.random().toString(36).substr(2, 9);
        const newCounter = Math.floor(Math.random() * (120 - 30 + 1)) + 30;
        const startTime = new Date().getTime(); // store start time
        setSessionId(newSessionId);
        setCounter(newCounter);
        setGameVisible(true); // show the game when session starts

        // Play clock sound
        const audio = new Audio('/assets/ClickSound.mp3');
        audio.play();// Decrease the counter every second
        const interval = setInterval(() => {
            setCounter((prevCounter) => {
                if (prevCounter === 1) {
                    clearInterval(interval);
                    const endTime = new Date().getTime(); // store end time
                    setSession({
                        sessionId: newSessionId,
                        startTime,
                        endTime,
                    });
                    setSessionId(null);
                    setGameVisible(false); // hide the game when counter reaches 0
                    return null;
                }
                return prevCounter - 1;
            });
        }, 1000);
    };

    return (
        <div>
            <h1>Session App</h1>
            {sessionId ? (
                <div>
                    <p>Session ID: {sessionId}</p>
                    <p>Counter: {counter}</p>
                </div>
            ) : (
                <button onClick={startSession}>Start Session</button>
            )}
            {session && (
                <div>
                    <h2>Latest Session:</h2>
                    <p>Session ID: {session.sessionId}</p>
                    <p>Started at {new Date(session.startTime).toLocaleTimeString()}</p>
                    <p>Ended at {new Date(session.endTime).toLocaleTimeString()}</p>
                </div>
            )}
            {gameVisible && <GameScene />}
        </div>
    );
}

export default Game;