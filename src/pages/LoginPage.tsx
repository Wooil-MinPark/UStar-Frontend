import ImageSection from 'components/ImageSection';
import LoginForm from 'components/LoginForm';
import SignUpForm from 'components/SignUpForm';
import { useState } from 'react';
import style from 'styles/LoginPage.module.css';

import { motion, AnimatePresence } from 'framer-motion';

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
        <div className={style.logo}>
          <div className={style.icon}>⭐</div>
          <div className={style.text}>U Star</div>
        </div>
        <div className={style.leftPanel}>
          <AnimatePresence>
            {isSignup ? (
              <motion.div
                className={style.motion}
                key="signup"
                initial={{ x: '100%' }} // 초기 위치 오른쪽 밖
                animate={{ x: 0 }} // 중앙으로 슬라이드
                exit={{ x: '100%' }} // 오른쪽으로 나가기
                transition={{ duration: 0.5 }}
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
                transition={{ duration: 0.5 }}
              >
                <LoginForm onSignupClick={handleSignupClick} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 에니메이션 없는 초기 버전 */}
          {/* {isSignup ? (
            <LoginForm onSignupClick={handleBackToLoginClick} />
          ) : (
            <SignUpForm onBackToLoginClick={handleSignupClick} />
          )} */}
        </div>

        <div className={style.rightPanel}>
          <ImageSection />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
