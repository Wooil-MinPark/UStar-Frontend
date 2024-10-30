import style from 'styles/Menubtn.module.css';

interface Props {
  icon: React.ReactNode;
  text: String | null;
  Clikfunction?: () => void;
}

const Menubtn: React.FC<Props> = ({ icon, text, Clikfunction }) => {
  return (
    <button className={style.container} onClick={Clikfunction}>
      <div>{icon}</div>
      <div>{text}</div>
    </button>
  );
};

export default Menubtn;
