import { useState } from 'react';
import style from '../styles/CreateCartegoryForm.module.css';
import { createCategory } from 'api';

interface Props {
  upDatecategory: () => void;
}

const CreateCartegoryForm: React.FC<Props> = ({ upDatecategory }) => {
  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryColor, setCategoryColor] = useState<string>('');

  const handleOnClick = () => {
    createCategory(categoryName, categoryColor);
    upDatecategory();
  };

  return (
    <div className={style.container}>
      <input
        type="color"
        className={style.colorinput}
        value={categoryColor}
        onChange={(e) => setCategoryColor(e.target.value)}
      />
      <input
        type="text"
        className={style.titleinput}
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <button className={style.createBtn} onClick={handleOnClick}>
        생성
      </button>
    </div>
  );
};

export default CreateCartegoryForm;
