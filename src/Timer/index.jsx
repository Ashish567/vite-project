import { useState, useEffect, useRef } from "react";

function Timer() {
  const timerSecRef = useRef();
  const [timerSec, setTimerSec] = useState(0);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hour, setHour] = useState(0);
  const [flip, setFlip] = useState(true);
  useEffect(() => {
    timerSecRef.current = setInterval(() => {
      setTimerSec((timerSec) => timerSec + 1);
    }, 1000);
    return () => clearInterval(timerSecRef.current);
  }, []);

  useEffect(() => {
    if (sec < 60) setSec(sec + 1);
    if (sec === 60) {
      setSec(0);
      setMin(min + 1);
    }
    if (min === 60) {
      setMin(0);
      setHour(hour + 1);
    }
  }, [timerSec]);

  return (
    <div>
      <div className="clock">
        <div>
          <input type="text" value={hour} readOnly />
          <input type="text" value={min} readOnly />
          <input type="text" value={sec + " Seconds"} readOnly />
        </div>
        <p>
          <button
            onClick={() => {
              setFlip(!flip);
              if (flip) {
                clearInterval(timerSecRef.current);
              } else {
                timerSecRef.current = setInterval(() => {
                  setTimerSec((timerSec) => timerSec + 1);
                }, 1000);
              }
            }}
          >
            {flip ? "Stop Timer" : "Start Timer"}
          </button>
        </p>
      </div>
    </div>
  );
}
export default Timer;
