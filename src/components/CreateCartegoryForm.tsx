import { useState } from 'react';
import style from '../styles/CreateCartegoryForm.module.css';
import { createCategory } from 'api';

interface CreateCategoryFormProps {
  onSubmit: (newCategory: { categoryName: string; categoryColor: string }) => void;
}

const CreateCartegoryForm: React.FC<CreateCategoryFormProps> = ({ onSubmit }) => {
  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryColor, setCategoryColor] = useState<string>('#000000');

  const handleAddCategory = () => {
    if (!categoryName.trim()) {
      //trim() 입력데이터에 공백을 제거함(유효성 검사용으로 많이 쓰임)
      alert('카테고리 이름을 입력해주세요.');
      return;
    }

    if (categoryColor === '#ffffff' || categoryColor === '#000000') {
      alert('다른 색으로 지정해 주세요');
      return;
    }

    onSubmit({
      categoryName,
      categoryColor,
    });

    setCategoryName('');
    setCategoryColor('#000000');
  };

  return (
    <div className={style.container}>
      <input
        type="color"
        className={style.colorinput}
        value={categoryColor}
        onChange={(e) => setCategoryColor(e.target.value)}
        required
      />
      <input
        type="text"
        className={style.titleinput}
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        required
      />
      <button className={style.createBtn} onClick={handleAddCategory}>
        생성
      </button>
    </div>
  );
};

export default CreateCartegoryForm;
