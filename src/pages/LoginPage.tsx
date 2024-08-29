import ImageSection from 'components/ImageSection';
import LoginForm from 'components/LoginForm';
import SignUpForm from 'components/SignUpForm';
import { useState } from 'react';
import style from 'styles/LoginPage.module.css';

import { motion, AnimatePresence } from 'framer-motion';

import MainHeader from 'components/MainHeader';

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);

  const handleSignupClick = () => {
    setIsSignup(true);
  };

  const handleBackToLoginClick = () => {
    setIsSignup(false);
  };

  return (
    <div>
      <div className={style.container}>
        <div className={style.leftPanel}>
          <MainHeader />
          <AnimatePresence>
            {isSignup ? (
              <motion.div
                className={style.motion}
                key="signup"
                initial={{ x: '100%' }} // 초기 위치 오른쪽 밖
                animate={{ x: 0 }} // 중앙으로 슬라이드
                exit={{ x: '105%' }} // 오른쪽으로 나가기
                transition={{ duration: 0.6 }}
              >
                <SignUpForm onBackToLoginClick={handleBackToLoginClick} />
              </motion.div>
            ) : (
              <motion.div
                className={style.motion}
                key="login"
                initial={{ x: '-100%' }} // 초기 위치 왼쪽 밖
                animate={{ x: 0 }} // 중앙으로 슬라이드
                exit={{ x: '-100%' }} // 왼쪽 나가기
                transition={{ duration: 0.6 }}
              >
                <LoginForm onSignupClick={handleSignupClick} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={style.rightPanel}>
          <ImageSection />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
