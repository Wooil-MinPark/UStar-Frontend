import style from 'styles/Userblock.module.css';

interface Props {
  name: string;
  nickname: string;
  profileIcon: React.ReactNode;
}

const Userblock: React.FC<Props> = ({ name, nickname, profileIcon }) => {
  return (
    <div className={style.container}>
      <div className={style.icon}>{profileIcon}</div>
      <div className={style.texts}>
        <div> {name} </div>
        <div>{nickname}</div>
      </div>
    </div>
  );
};

export default Userblock;
