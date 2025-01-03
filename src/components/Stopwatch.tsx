import { useState, useEffect } from 'react';

import style from 'styles/Stopwatch.module.css';
import { formatTime } from 'utils';

interface StopwatchState {
  // 시간 값을 int 또는 Date 객체로 사용하기는 걸 생각 해보자~
  elapsedTime: number;
  isRunning: boolean;
  intervalId: number | null;
}

interface StopwatchProps {
  onTimeUpdate: (time: number) => void;
}

// 할 일을 0초부다 다시 하고 싶을때

const Stopwatch: React.FC<StopwatchProps> = ({ onTimeUpdate }) => {
  const [state, setState] = useState<StopwatchState>({
    elapsedTime: 0,
    isRunning: false,
    intervalId: null,
  });

  const handleResetButton = () => {
    if (state.elapsedTime === 0) {
      return;
    }

    const confirm = window.confirm('할 일을 제출 하시겠습니까?');
    if (!confirm) {
      return;
    }

    setState({
      elapsedTime: 0,
      isRunning: false,
      intervalId: null,
    });
    onTimeUpdate(0);
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
        setState((prevState) => {
          const newElapsedTime = prevState.elapsedTime + 1;
          onTimeUpdate(newElapsedTime);
          return {
            ...prevState,
            elapsedTime: newElapsedTime,
          };
        });
      }, 1000);

      setState((prevState) => ({
        ...prevState,
        isRunning: true,
        intervalId: id,
      }));
    }
  };

  //  const formatTime = (time: number): string => {
  //     const hours = Math.floor(time / 3600);
  //     const minutes = Math.floor((time % 3600) / 60);
  //     const seconds = time % 60;

  //     const formatNumber = (num: number) => num.toString().padStart(2, '0');

  //     return `${formatNumber(hours)} : ${formatNumber(minutes)} : ${formatNumber(seconds)} `;
  //   };

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
        <div className={style.btn} onClick={handleButtonClick}>
          {state.isRunning ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
        </div>

        {state.isRunning ? (
          ''
        ) : (
          <div className={style.btn} onClick={handleResetButton}>
            <i className="fa-solid fa-stop"></i>
          </div>
        )}
      </div>

      <div className={style.campfire} onClick={handleButtonClick}>
        {state.isRunning ? '💥' : '💤'}
      </div>
    </div>
  );
};

export default Stopwatch;
