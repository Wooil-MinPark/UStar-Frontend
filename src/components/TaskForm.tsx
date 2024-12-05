import { useState } from 'react';
import style from '../styles/TaskForm.module.css';
import Stopwatch from './Stopwatch';
import CategorySelector from './CategorySelector';
import axiosInstance from 'axiosInstance';
import TitleInput from './TitleInput';

interface Category {
  categoryName: string;
  categoryColor: string;
}

const TaskForm: React.FC = () => {
  // category 객체로 보내기 id, name, color
  // const [categoryName, setCategoryName] = useState<string>('');
  // const [categoryColor, setCategoryColor] = useState<string>('#000000');

  // 카테고리 객체화 - id , color , name
  const [category, setCategory] = useState<Category>({
    categoryName: '',
    categoryColor: '#000000',
  });

  // tilte이 아닌 디테일로(상세정보 or 메모)
  const [messeage, setMesseage] = useState<string>('');

  const [timeDuration, setTimeDuaration] = useState<number>(0);

  const now = new Date();
  const kstDate = new Date(now.getTime() + 9 * 60 * 60 * 1000);

  //시간이 필요하면 split('T')[0] 제거 후 .replace('Z', '+09:00')
  const todaysDate = kstDate.toISOString().split('T')[0];

  // 깃 커밋 하는 것처럼 서버에 데이터 보낼때 추가 설명 적는 기능
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const taskData = {
    //   // 카테고리 설정에 대해서
    //   // main 화면에서 카테고리를 만들고 바로 쓴다
    //   // 다른 page (설정?) 에서 카테고리를 만든다
    //   // category 객체로 보내기 id, name, color
    //   categoryName,
    //   categoryColor,
    //   messeage,
    //   timeDuration, // 초(number)로 보낼지 포멧해서 string 아니면 number로 보낼지
    //   todaysDate,
    // };

    const taskData = {
      category,
      messeage,
      timeDuration, // 초(number)로 보낼지 포멧해서 string 아니면 number로 보낼지
      todaysDate,
    };

    try {
      // 유저 작업 데이터를 서버에 보냄
      // const res = await axiosInstance.post('taskData/save', taskData);
      // console.log(res.data);
    } catch (error) {
      //데이터 저장 실패
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.container}>
      <span>{todaysDate}</span>
      {/* <span>{to}</span> */}
      {/* <div className={style.stopwatch}> */}
      <Stopwatch onTimeUpdate={setTimeDuaration} />
      {/* </div> */}
      {/* <TitleInput messeage={messeage} setMesseage={setMesseage} /> */}
      {/* <div className={style.category}> */}
      <CategorySelector />
      {/* </div> */}
    </form>
  );
};

export default TaskForm;
