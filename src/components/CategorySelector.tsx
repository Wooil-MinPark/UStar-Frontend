import { useEffect, useState } from 'react';
import style from '../styles/CategorySelector.module.css';
import CategoryBtn from './CategoryBtn';
import { createCategory, deleteCategory, getCategories, refreshAccessToken } from 'api';
import CreateCartegoryForm from './CreateCartegoryForm';
import { motion, AnimatePresence } from 'framer-motion';

interface Category {
  categoryUid: number;
  categoryName: string;
  categoryColor: string;
}

const CategorySelector = () => {
  const testItems = { 공부: 'cadetblue', 운동: 'antiquewhite', 독서: 'chartreuse', 묵상: 'aqua' };

  const [cartegories, setCartegories] = useState<Category[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>('black');

  const [isclicked, setIsClicked] = useState<boolean>(false);
  const [isAddClicked, setIsAddClicked] = useState<boolean>(false);
  const [isDelet, setIsDelet] = useState<boolean>(false);

  // 카테고리 선택시 color 변경
  const handleCategoryClick = (color: string) => {
    setSelectedCategory(color);
  };

  // 카테고리 메뉴bar 컨트롤러
  const onClickBar = () => {
    if (isclicked === false) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
      if (isAddClicked === true) {
        setIsAddClicked(false);
      }
    }
  };

  // 카테고리 생성 Form 조작
  const onClickAddBtn = () => {
    if (isAddClicked === false) {
      setIsAddClicked(true);
      console.log(isAddClicked);
    } else {
      setIsAddClicked(false);
      console.log(isAddClicked);
    }
  };

  // 카테고리 삭제버튼 조작
  const onClickDeletBtn = () => {
    if (isDelet === false) {
      setIsDelet(true);
    } else {
      setIsDelet(false);
    }
  };

  // 카테고리 업데이트
  const fetchCategories = async () => {
    const categoriesData = await getCategories(); // getCategorys에서 반환된 데이터 받기
    console.log(categoriesData);
    if (categoriesData && Array.isArray(categoriesData)) {
      setCartegories([...categoriesData]);
    } else {
      console.log('Invalid categories data', categoriesData);
      setCartegories([]);
    }
  };

  // 카테고리 생성
  const onAddCategory = async (newCategory: { categoryName: string; categoryColor: string }) => {
    if (cartegories.length === 7) {
      alert('카테고리를 더 이상 생성 할 수 없습니다.');
      return;
    }

    try {
      await createCategory(newCategory.categoryName, newCategory.categoryColor);
      await fetchCategories();
    } catch (error) {
      console.log('카테고리 추가 실패', error);
    }
  };

  // 카테고리 삭제
  const onDeletCategory = async (categoryUid: number) => {
    const confirm = window.confirm('카테고리를 삭제 하시겠습니까?');

    if (!confirm) {
      return;
    }

    try {
      await deleteCategory(categoryUid);
      await fetchCategories();
      setIsDelet(false);
    } catch (error) {
      console.log('카테고리 삭제 실패', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={style.container}>
      <div className={`${style.bar} ${isclicked ? '' : style.circle}`}>
        <div
          className={`${style.item} ${style.switch} ${isclicked ? style.rotateR : style.rotateL}`}
          onClick={onClickBar}
        >
          <i className="fa-solid fa-star" style={{ color: selectedCategory }}></i>
          {/* <i className="fa-solid fa-star" style={{ color: selectedCategory }}></i> */}
        </div>

        {/* {Object.entries(testItems).map(([item, color], index) => (
          <div key={index} className={style.item} onClick={onClickBar}>
            <CategoryBtn title={item} color={color} onCategoryClick={handleCategoryClick} />
          </div>
        ))} */}

        {cartegories.map(({ categoryName, categoryColor, categoryUid }) => (
          <div key={categoryUid} className={style.item} onClick={onClickBar}>
            <CategoryBtn title={categoryName} color={categoryColor} onCategoryClick={handleCategoryClick} />
            {isDelet ? (
              <div
                className={style.categoryDeletBtn}
                onClick={() => {
                  onDeletCategory(categoryUid);
                }}
              >
                <i className="fa-solid fa-circle-minus fa-2xs" style={{ color: '#f96262' }}></i>
              </div>
            ) : (
              ''
            )}
          </div>
        ))}

        <div className={`${style.item} ${style.addBtn}`} onClick={onClickAddBtn}>
          <i className="fa-solid fa-plus"></i>
        </div>
        <div className={`${style.item} ${style.deletBtn}`} onClick={onClickDeletBtn}>
          <i className="fa-solid fa-trash-can"></i>
        </div>
      </div>

      <AnimatePresence>
        {isAddClicked && (
          <motion.div
            key="categorySelector"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '10px', // top 값 설정
              left: '1100px', // left 값 설정
            }}
          >
            <CreateCartegoryForm
              onSubmit={(newCategory) => {
                onAddCategory(newCategory);
                setIsAddClicked(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategorySelector;
