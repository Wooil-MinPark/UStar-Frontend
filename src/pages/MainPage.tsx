import Stopwatch from 'components/Stopwatch';
import style from 'styles/MainPage.module.css';

const MainPage = () => {
  return (
    <div className={style.container}>
      <h1>메인 페이지</h1>
      <Stopwatch />
    </div>
  );
};

export default MainPage;
