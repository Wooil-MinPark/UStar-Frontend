import { motion, AnimatePresence, useForceUpdate } from 'framer-motion';

import Sidebar from 'components/Sidebar';
import Stopwatch from 'components/Stopwatch';
import style from 'styles/MainPage.module.css';

import bgImage from '../img/bgimg.png';
import Nsky from '../img/Nsky.png';
import { useState } from 'react';

const MainPage: React.FC = () => {
  const [isSky, setIsSky] = useState<boolean>(false);

  const handleIsSky = () => {
    if (isSky) {
      setIsSky(false);
    } else {
      setIsSky(true);
    }
  };

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
      <Sidebar isSky={isSky} handleIsSky={handleIsSky} />
    </div>
  );
};

export default MainPage;
