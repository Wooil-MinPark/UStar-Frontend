import Sidebar from 'components/Sidebar';
import Stopwatch from 'components/Stopwatch';
import TestStopwatch from 'components/TestStopwatch';
import style from 'styles/MainPage.module.css';

const MainPage = () => {
  return (
    <div className={style.container}>
      <h1>메인 페이지</h1>
      <Stopwatch />
      <Sidebar />
      <TestStopwatch />
    </div>
  );
};

export default MainPage;
