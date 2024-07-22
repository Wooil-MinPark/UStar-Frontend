import TestButton from 'components/TestButton';
import styles from '../styles/TestPage.module.css';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Loding {
  loding: boolean;
}
interface Data<T> {
  [key: string]: T;
}

const TestPage = <T,>() => {
  const [data, setData] = useState<Data<T>>({} as Data<T>);
  const [loding, setLoding] = useState<Loding>({ loding: false });

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

  const getDataTest = async () => {
    const json = await (await fetch('https://175.215.180.100:8000/')).json();

    console.log(json.message);
    setData(json.message);
  };

  useEffect(() => {
    getDataTest();
  }, []);

  useEffect(() => {
    setLoding({ loding: true });
    console.log('바뀌는중');
  }, [data]);

  return (
    <div>
      {loding ? (
        <div>
          <h1 className={styles.title}>테스트용 페이지</h1>
          <NavLink to={'/'}>
            <TestButton title="홈으로 가버렷" />
          </NavLink>
        </div>
      ) : (
        <h1>로딩중</h1>
      )}
    </div>
  );
};

export default TestPage;
