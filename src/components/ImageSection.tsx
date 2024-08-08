import style from 'styles/ImageSection.module.css';

const ImageSection = () => {
  return (
    <div className={style.container}>
      {/* <div className={style.stars}> 배경에 별을 표현하기 위한 예제 </div> */}
      <p className={style.text}>나의 꿈과 소망이 담긴 별을 만들어보세요!</p>
      <p className={style.subText}>설명 부분</p>
      <div className={style.navigation}>
        <button className={style.navButton}>←</button>
        <button className={style.navButton}>→</button>
      </div>
    </div>
  );
};

export default ImageSection;
