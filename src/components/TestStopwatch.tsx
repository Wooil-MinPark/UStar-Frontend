import { useEffect } from 'react';

const TestStopwatch = () => {
  const start = new Date();

  window.setTimeout(() => {
    console.log('3번쨰');
  }, 5000);
  window.setTimeout(() => {
    console.log('2번쨰');
  }, 3000);
  window.setTimeout(() => {
    console.log('1번쨰');
  }, 1000);

  const end = new Date();

  const elapsed = end.getTime() - start.getTime();

  useEffect(() => {}, [elapsed]);

  return (
    <div>
      <h1> 테스트 스톱워치 </h1>
      <h2> start : {start.getTime()} </h2>
      <h2> end : {end.getTime()} </h2>
      <h2> 걸렸던 시간 : {elapsed}</h2>
    </div>
  );
};

export default TestStopwatch;
