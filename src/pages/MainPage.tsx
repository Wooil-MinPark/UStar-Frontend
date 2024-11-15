import { motion, AnimatePresence, useForceUpdate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { USER_API } from 'contants';
import axios from 'axios';

import Sidebar from 'components/Sidebar';
import Stopwatch from 'components/Stopwatch';
import style from 'styles/MainPage.module.css';

import bgImage from '../img/bgimg.png';
import Nsky from '../img/Nsky.png';

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
      const res = await axios.get<UserInfo>(USER_API + 'whoami', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

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
            <img src={Nsky} alt="backgroundimg" className={style.bgimg} />
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
            <Stopwatch />
            <img src={bgImage} alt="backgroundimg" className={style.bgimg} />
          </motion.div>
        )}
      </AnimatePresence>

      <Sidebar isSky={isSky} handleIsSky={handleIsSky} userEmail={userEmail} userName={userName} userUid={userUid} />
    </div>
  );
};

export default MainPage;
