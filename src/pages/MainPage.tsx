import Sidebar from 'components/Sidebar';
import Stopwatch from 'components/Stopwatch';
import TestStopwatch from 'components/TestStopwatch';
import style from 'styles/MainPage.module.css';

import bgImage from '../img/bgimg.png';

const MainPage = () => {
  return (
    <div className={style.container}>
      <img src={bgImage} alt="backgroundimg" className={style.bgimg} />

      <Stopwatch />

      <Sidebar />

      {/* <TestStopwatch /> */}
    </div>
  );
};

export default MainPage;
