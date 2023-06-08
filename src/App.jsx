import { useState, useEffect } from 'react'
// import img from './images/RTA7xXGTL.gif'
import './App.css'
import Lottie from 'lottie-react'
import animationData from "./assets/137709-timer.json"

function App() {
    // State variables to manage countdown time, remaining time, and countdown state
    const [countdownTime, setCountdownTime] = useState('');
    const [remainingTime, setRemainingTime] = useState(0);
    const [isCounting, setIsCounting] = useState(false);

    // Function to calculate the remaining time based on the target countdown time
    const calculateTimeRemaining = () => {
        const targetDate = new Date(countdownTime).getTime(); // Convert countdownTime to milliseconds
        const currentTime = new Date().getTime(); // Get the current time in milliseconds
        // const timeRemaining = targetDate + currentTime; // Calculate the remaining time in milliseconds
        const timeRemaining = targetDate - currentTime; // Calculate the remaining time in milliseconds
        // Check if timeRemaining is zero or negative, indicating countdown has finished
        if (timeRemaining <= 0) {
            setIsCounting(false); // Stop the countdown
            setRemainingTime(0); // Set remainingTime to 0
        } else {
            setRemainingTime(timeRemaining); // Update remainingTime with the calculated value
        }
    };

    // useEffect hook to start the countdown interval when isCounting state changes
    useEffect(() => {
        if (isCounting) {
            const countdownInterval = setInterval(calculateTimeRemaining, 1000); // Run calculateTimeRemaining every second
            return () => clearInterval(countdownInterval); // Cleanup function to clear the interval when component unmounts
        }
    }, [isCounting]);

    // Function to handle countdown start button click
    const handleCountdownStart = () => {
        setIsCounting(true); // Set isCounting to true, starting the countdown
    };
    // Function to handle countdown reset button click
    const handleCountdownReset = () => {
        setIsCounting(false); // Set isCounting to false, stopping the countdown
        setRemainingTime(0); // Set remainingTime to 0
        setCountdownTime(''); // Reset countdownTime to empty string
    };

    // Function to format time values with leading zeros if necessary
    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time; // If time is less than 10, prepend a '0', otherwise return the time as is
    };

    // Calculate the days, hours, minutes, and seconds based on the remainingTime
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24)); // function is used to round down the result to the nearest integer value, as we're only interested in whole days.
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return ( 
      <div className="container"> 
        <div >
            <h2 className="state">Countdown Timer</h2>
            <div className="input">
                <input type="datetime-local" value={countdownTime} onChange={(e) => setCountdownTime(e.target.value)} />
                <button onClick={handleCountdownStart} disabled={!countdownTime || isCounting}>Start</button>
                <button onClick={handleCountdownReset} disabled={!isCounting}>Reset</button>
            </div>
        <div className="content">
          {isCounting ? (
            <div>
              <h3 className="state">Time Remaining:</h3>

              <div className="count-down">
                 <div className="box">
                 <h3 id="day">{formatTime(days)} </h3>
                     <span>days</span>
                 </div>
                 <div className="box">
                 <h3 id="hour">{formatTime(hours)}</h3>
                     <span>hours</span>
                 </div>
                 <div className="box">
                     <h3 id="minute">{formatTime(minutes)}</h3>
                     <span>minutes</span>
                 </div>
                 <div className="box">
                     <h3 id="second">{formatTime(seconds)}</h3>
                     <span>seconds</span>
                 </div>
             </div>


              <p> ::</p>
            </div>
          ) : (
            <div>
              <h3 className="state">Timer:</h3>
              <div className="count-down">
                 <div className="box">
                 <h3 id="day">{formatTime(days)} </h3>
                     <span>days</span>
                 </div>
                 <div className="box">
                 <h3 id="hour">{formatTime(hours)}</h3>
                     <span>hours</span>
                 </div>
                 <div className="box">
                     <h3 id="minute">{formatTime(minutes)}</h3>
                     <span>minutes</span>
                 </div>
                 <div className="box">
                     <h3 id="second">{formatTime(seconds)}</h3>
                     <span>seconds</span>
                 </div>
             </div>
            </div>
          )}
        </div>
      </div>
      
      <Lottie animationData={animationData} className="image"/>
      </div> 
    );
}


export default App;