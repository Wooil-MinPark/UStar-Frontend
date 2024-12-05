import style from '../styles/CategoryBtn.module.css';

interface Props {
  title: string;
  color: string;
  onCategoryClick: (color: string) => void;
}

const CategoryBtn: React.FC<Props> = ({ title, color, onCategoryClick }) => {
  const inlinestyle = {
    backgroundColor: color,
  };

  return (
    <div className={style.container}>
      <button className={style.btn} style={inlinestyle} onClick={() => onCategoryClick(color)}>
        {title}
      </button>
    </div>
  );
};

export default CategoryBtn;
