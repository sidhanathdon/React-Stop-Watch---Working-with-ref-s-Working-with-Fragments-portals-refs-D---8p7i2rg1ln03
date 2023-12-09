'use client'
import React, { useRef, useState, useEffect } from 'react'

function Home() {

  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const lapsRef = useRef([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [lapClicked, setLapClicked] = useState(false);


  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const startHandler = () => {
    if (intervalRef.current !== 0) return;

    startTime.current = Date.now() - currentTime;
    intervalRef.current = setInterval(() => {
      setCurrentTime(Date.now() - startTime.current);
    }, 10);
  };
  const lapHandler = () => {
    lapsRef.current.push(currentTime);
    setLaps([...lapsRef.current]);
    setLapClicked(true);
  };

  const stopHandler = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
  };


  const resetHandler = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = 0;
    setCurrentTime(0);
    setLaps([]);
    lapsRef.current = [];
  };

  return (
    <div id="main">
      <section>
        <h1 className='seconds-elapsed'>{(currentTime / 1000).toFixed(3)}</h1>
        <section className='buttons'>
          <button className="start-btn" onClick={startHandler}>START</button>
          <button className="stop-btn" onClick={stopHandler}>STOP</button>
          <button className="lap-btn" onClick={lapHandler}>LAP</button>
          <button className="reset-btn" onClick={resetHandler}>RESET</button>
        </section>
      </section>
      <section className='lap-section'>
        {lapClicked && <h2>Laps</h2>}
        {laps.length > 0 && lapClicked && (
          <section className='laps'>
            {laps.map((lap, index) => (
              <p key={index}>{(lap / 1000).toFixed(3)}</p>
            ))}
          </section>
        )}
      </section>

    </div>
  )
}

export default Home
