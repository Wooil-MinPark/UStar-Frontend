import { Link } from 'react-router-dom';
import style from 'styles/MainHeader.module.css';

const MainHeader = () => {
  return (
    <div>
      <header className={style.container}>
        <div className={style.icon}>⭐</div>
        <div className={style.text}>U Star</div>

        <Link to={'/main'}>
          <button className={style.mainPagebtn}>Main Page</button>
        </Link>
      </header>
    </div>
  );
};

export default MainHeader;
