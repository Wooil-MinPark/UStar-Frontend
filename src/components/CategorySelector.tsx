import { useEffect, useState } from 'react';
import style from '../styles/CategorySelector.module.css';
import CategoryBtn from './CategoryBtn';
import { createCategory, deleteCategory, getCategories } from 'api';
import CreateCartegoryForm from './CreateCartegoryForm';

interface Category {
  categoryUid: number;
  categoryName: string;
  categoryColor: string;
}

const CategorySelector = () => {
  const [authToken, setAuthToken] = useState<string>('');

  const testItems = { 공부: 'cadetblue', 운동: 'antiquewhite', 독서: 'chartreuse', 묵상: 'aqua' };

  const [cartegories, setCartegories] = useState<Category[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>('black');
  const [isclicked, setIsClicked] = useState<boolean>(false);
  const [isAddClicked, setIsAddClicked] = useState<boolean>(false);

  const handleCategoryClick = (color: string) => {
    setSelectedCategory(color);
  };

  const onClickBar = () => {
    if (isclicked === false) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
      if (isAddClicked == true) {
        setIsAddClicked(false);
      }
    }
  };

  const onClickAddBtn = () => {
    if (isAddClicked === false) {
      setIsAddClicked(true);
    } else {
      setIsAddClicked(false);
    }
  };

  //카테고리삭제
  deleteCategory(7);

  const fetchCategories = async () => {
    const categoriesData = await getCategories(); // getCategorys에서 반환된 데이터 받기
    setCartegories(categoriesData);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={style.container}>
      <div className={`${style.bar} ${isclicked ? '' : style.circle}`}>
        {/* 타이틀과 컬러는 서버에서 요청받아서 넣어줄것. */}
        {/* map 함수 가지고 나열할 예정 */}
        <div
          className={`${style.item} ${style.switch} ${isclicked ? style.rotateR : style.rotateL}`}
          onClick={onClickBar}
        >
          <i className="fa-solid fa-star" style={{ color: selectedCategory }}></i>
        </div>

        {/* {Object.entries(testItems).map(([item, color], index) => (
          <div key={index} className={style.item} onClick={onClickBar}>
            <CategoryBtn title={item} color={color} onCategoryClick={handleCategoryClick} />
          </div>
        ))} */}

        {cartegories.map(({ categoryName, categoryColor }, categoryUid) => (
          <div key={categoryUid} className={style.item} onClick={onClickBar}>
            <CategoryBtn title={categoryName} color={categoryColor} onCategoryClick={handleCategoryClick} />
          </div>
        ))}

        <div className={`${style.item} ${style.addBtn}`} onClick={onClickAddBtn}>
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>
      <div className={`${style.cartegoryForm} ${isAddClicked ? style.show : style.hide}`}>
        <CreateCartegoryForm upDatecategory={fetchCategories} />
      </div>
    </div>
  );
};

export default CategorySelector;
