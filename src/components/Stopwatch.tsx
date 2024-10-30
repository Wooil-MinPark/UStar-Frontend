import React, { useState, useEffect } from 'react';

import style from 'styles/Stopwatch.module.css';

const PAUSE_ICON = <i className="fa-solid fa-pause"></i>;
const PLAY_ICON = <i className="fa-solid fa-play"></i>;
const STOP_ICON = <i className="fa-solid fa-stop"></i>;

interface StopwatchState {
  // 시간 값을 int 또는 Date 객체로 사용하기는 걸 생각 해보자~
  elapsedTime: number;
  isRunning: boolean;
  intervalId: number | null;
}

const Stopwatch = () => {
  const [state, setState] = useState<StopwatchState>({
    elapsedTime: 0,
    isRunning: false,
    intervalId: null,
  });

  const handleResetButton = () => {
    setState({
      elapsedTime: 0,
      isRunning: false,
      intervalId: null,
    });
  };

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
    <div className={style.container}>
      <div className={style.timer}>{formatTime(state.elapsedTime)}</div>

      <div className={style.btncontainer}>
        <button className={style.btn} onClick={handleButtonClick}>
          {state.isRunning ? PAUSE_ICON : PLAY_ICON}
        </button>

        {state.isRunning ? (
          ''
        ) : (
          <button className={style.btn} onClick={handleResetButton}>
            {STOP_ICON}
          </button>
        )}
      </div>

      <div className={style.campfire} onClick={handleButtonClick}>
        {state.isRunning ? '💥' : '💤'}
      </div>
    </div>
  );
};

export default Stopwatch;
