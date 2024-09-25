import TestButton from 'components/TestButton';
import styles from '../styles/TestPage.module.css';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://112.172.161.117:8080/api/test/hello';

interface Loading {
  loading: boolean;
}

interface Data {
  data: string | undefined;
}

const TestPage = () => {
  const [data, setData] = useState<Data>();
  const [loading, setLoading] = useState<Loading>({ loading: false });

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
    const json = await axios.get<Data>(API);
    console.log(json.data);
    setData(json.data);
  };

  useEffect(() => {
    getDataTest();
  }, []);

  useEffect(() => {
    if (data !== undefined) setLoading({ loading: true });

    console.log(data);
    console.log('데이터 바뀜');
  }, [data]);

  return (
    <div>
      {loading.loading ? (
        <div>
          <h1 className={styles.title}>테스트용 페이지</h1>
          <h2 className={styles.title}>서버 통신 성공!</h2>
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
