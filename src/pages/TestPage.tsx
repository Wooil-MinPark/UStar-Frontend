import TestButton from 'components/TestButton';
import styles from '../styles/TestPage.module.css';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Loding {
  loding: boolean;
}
interface Data<T> {
  [key: string]: T;
}

const TestPage = <T,>() => {
  const [data, setData] = useState<Data<T>>({} as Data<T>);
  const [loding, setLoding] = useState<Loding>({ loding: false });

  // 이 코드는 아님 ㅇㅇ
  // const getDataTest = async () => {
  //   const res = await fetch('https://175.215.180.100:8000/', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //     credentials: 'include', // 필요한 경우 쿠키 포함
  //   });
  //   console.log(res);
  // };

  // 아래 코드가 진짜임 ㅇㅇ
  const getDataTest = async () => {
    const json = await axios.get('http://112.172.161.117:8080/api/test/hello');

    console.log(json.data);
  };

  useEffect(() => {
    getDataTest();
  }, []);

  useEffect(() => {
    // setLoding({ loding: true });
    console.log('바뀌는중');
  }, []);

  return (
    <div>
      {loding.loding ? (
        <div>
          <h1 className={styles.title}>테스트용 페이지</h1>
          <NavLink to={'/UStar-Frontend'}>
            <TestButton title="홈으로 가버렷" />
          </NavLink>
        </div>
      ) : (
        <div>
          <h1>로딩중</h1>
          <h1>서버와 연결 해야함</h1>
        </div>
      )}
    </div>
  );
};

export default TestPage;
