import style from '../styles/NightSky.module.css';
import Constellation from './Constellation';

const NigthSky = () => {
  return (
    <div className={style.container}>
      <div className={style.monthItem}>
        <Constellation />
      </div>

      <div className={style.monthItem}></div>
      <div className={style.monthItem}></div>
      <div className={style.monthItem}></div>
      <div className={style.monthItem}></div>
      <div className={style.monthItem}></div>
      <div className={style.monthItem}></div>
      <div className={style.monthItem}></div>
      <div className={style.monthItem}></div>
      <div className={style.monthItem}></div>
      <div className={style.monthItem}></div>
      <div className={style.monthItem}></div>
    </div>
  );
};

export default NigthSky;
