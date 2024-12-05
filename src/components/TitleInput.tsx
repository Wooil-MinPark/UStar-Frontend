import style from '../styles/TitleInput.module.css';

interface TitleInputProps {
  title: string;
  setTitle: (title: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ title, setTitle }) => {
  return (
    <div className={style.container}>
      <label>제목</label>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
    </div>
  );
};

export default TitleInput;
