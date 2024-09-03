import style from 'styles/Menubtn.module.css';

interface Props {
  icon: React.ReactNode;
  text: String;
}

const Menubtn: React.FC<Props> = ({ icon, text }) => {
  return (
    <button className={style.container}>
      <div>{icon}</div>
      <div>{text}</div>
    </button>
  );
};

export default Menubtn;
