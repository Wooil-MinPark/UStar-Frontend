import style from 'styles/Sidebar.module.css';
import Menubtn from './Menubtn';
import Userblock from './Userblock';

const userIcon = <i className="fa-regular fa-circle-user"></i>;

const Sidebar: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <Userblock name="홍길동" nickname="호부호형" profileIcon={userIcon} />
      </div>

      <div className={style.body}>
        <div className={style.btn}>
          <Menubtn icon={userIcon} text="테스트1" />
          <Menubtn icon={userIcon} text="테스트2" />
          <Menubtn icon={userIcon} text="테스트3" />
          <Menubtn icon={userIcon} text="테스트4" />
          <Menubtn icon={userIcon} text="테스트5" />
        </div>

        <div className={style.logout}>
          <Menubtn icon={userIcon} text="Log out" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
