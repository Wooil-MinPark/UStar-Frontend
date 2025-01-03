import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import axiosInstance from 'axiosInstance';

import style from 'styles/MainPage.module.css';

import Sidebar from 'components/Sidebar';
import NigthSky from 'components/NightSky';
import TaskForm from 'components/TaskForm';

interface UserInfo {
  data: any;
  userEmail: string;
  userName: string;
  userUid: number;
}

const MainPage: React.FC = () => {
  const [isSky, setIsSky] = useState<boolean>(false);

  const [userEmail, setUserEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userUid, setUserUid] = useState<number>(0);

  const setUserInfo = (email: string, name: string, id: number) => {
    setUserEmail(email);
    setUserName(name);
    setUserUid(id);
  };

  const getUserInfo = async () => {
    try {
      const res = await axiosInstance.get<UserInfo>('user/whoami');

      setUserInfo(res.data.data.userEmail, res.data.data.userName, res.data.data.userUid);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIsSky = () => {
    if (isSky) {
      setIsSky(false);
    } else {
      setIsSky(true);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className={style.container}>
      <AnimatePresence>
        {isSky ? (
          <motion.div
            className={style.motion}
            key="main"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', bounce: 0.07 }}
          >
            <div className={style.NskyBgimg}>
              <NigthSky />
            </div>
          </motion.div>
        ) : (
          <motion.div
            className={style.motion}
            key="sky"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.07 }}
          >
            <div className={style.bgimg}>
              <TaskForm />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Sidebar isSky={isSky} handleIsSky={handleIsSky} userEmail={userEmail} userName={userName} userUid={userUid} />
    </div>
  );
};

export default MainPage;
