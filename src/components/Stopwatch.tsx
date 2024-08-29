import React, { useState, useEffect } from 'react';

interface StopwatchState {
  elapsedTime: number;
  isRunning: boolean;
  intervalId: number | null;
}

const Stopwatch: React.FC = () => {
  const [state, setState] = useState<StopwatchState>({
    elapsedTime: 0,
    isRunning: false,
    intervalId: null,
  });

  const handleButtonClick = () => {
    if (state.isRunning) {
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }
      setState((prevStete) => ({
        ...prevStete,
        isRunning: false,
        intervalId: null,
      }));
    } else {
      const id = window.setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          elapsedTime: prevState.elapsedTime + 1,
        }));
      }, 1000);

      setState((prevState) => ({
        ...prevState,
        isRunning: true,
        intervalId: id,
      }));
    }
  };

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formatNumber = (num: number) => num.toString().padStart(2, '0');

    return `${formatNumber(hours)} : ${formatNumber(minutes)} : ${formatNumber(seconds)} `;
  };

  useEffect(() => {
    return () => {
      if (state.intervalId) {
        window.clearInterval(state.intervalId);
      }
    };
  }, [state.intervalId]);

  return (
    <div>
      <h1>{formatTime(state.elapsedTime)}</h1>
      <button onClick={handleButtonClick}>{state.isRunning ? 'Stop' : 'Start'}</button>
      <div> {state.isRunning ? '💥' : '💤'} </div>
    </div>
  );
};

export default Stopwatch;
