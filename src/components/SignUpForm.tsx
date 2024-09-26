import axios from 'axios';
import { useState } from 'react';
import style from 'styles/SignupForm.module.css';

const API = '/api/user/signup';

interface ApiResponse {
  data: null | any;
  errorCode: null | string;
  errorMessage: null | string;
  ok: boolean;
}

interface SignupProps {
  onBackToLoginClick: () => void;
  onSuccess: () => void;
}

interface UserSignUpInfo {
  userId: string;
  userName: string;
  userEmail: string;
  userPassword: string;
}

const SignUpForm: React.FC<SignupProps> = ({ onBackToLoginClick, onSuccess }) => {
  const [userId, setUserId] = useState<string>(''); //유저 아이디 (로그인할 때 쓰는 아이디)
  const [userName, setUserName] = useState<string>(''); //유저 이름 (= 닉네임)
  const [userEmail, setUserEmail] = useState<string>(''); //유저 이메일
  const [userPassword, setUserPassword] = useState<string>(''); //유저 암호 (로그인할 때 쓰는 암호)
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // 암호 확인
  const [isChecking, setIsChecking] = useState<boolean>(false); // 이름 , 이메일 확정 됐을때

  // 유저 정보 객체로
  // const [userSUInfo, setUserSUInfo] = useState<UserSignUpInfo>({
  //   userId: '',
  //   userName: '',
  //   userEmail: '',
  //   userPassword: '',
  // });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userPassword !== confirmPassword) {
      // 이 에러를 consolo로 말고 다르게 표현하는걸 생각해보자
      console.log('Passwords do not match.');
      return;
    }

    try {
      const res = await axios.post<ApiResponse>(API, {
        userId: userId,
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassword,
      });

      if (!res.data.ok) {
        onSuccess();
      } else {
        console.log('회원가입 실패');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckUsername = async () => {
    setIsChecking(true);

    try {
      const res = await axios.post<ApiResponse>(API + '/userNameDup', { userName: userId });

      if (!res.data.ok) {
        // 이 에러를 consolo로 말고 다르게 표현하는걸 생각해보자
        console.log('중복된 이름입니다.');
      }
    } catch (error) {
      console.log(error);
    }
    setIsChecking(false);
  };

  const handleCheckEmail = async () => {
    setIsChecking(true);

    try {
      const res = await axios.post<ApiResponse>(API + '/userEmailDup', { userName: userName });

      if (!res.data.ok) {
        // 이 에러를 consolo로 말고 다르게 표현하는걸 생각해보자
        console.log('중복된 이메일 입니다.');
      }
    } catch (error) {
      console.log(error);
    }
    setIsChecking(false);
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2>Sign up</h2>
        <i className="fa-solid fa-circle-chevron-left" onClick={onBackToLoginClick}></i>
      </div>

      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.usernameEail}>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            className={style.input}
          />
          <button className={style.check} onClick={handleCheckUsername} disabled={isChecking}>
            중복확인
          </button>
        </div>

        <div className={style.usernameEail}>
          <input
            type="email"
            id="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Email"
            className={style.input}
          />
          <button className={style.check} onClick={handleCheckEmail} disabled={isChecking}>
            중복확인
          </button>
        </div>

        <input
          type="password"
          id="userPassword"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          placeholder="Password"
          className={style.input}
        />
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className={style.input}
        />

        <button type="submit" className={style.register}>
          Register
        </button>

        <div className={style.dividingline}>
          <div className={style.line}></div>
          <div className={style.lineinfo}>Or sign up with</div>
          <div className={style.line}></div>
        </div>

        <div className={style.snscontaner}>
          <button className={style.sns}>
            <i className="fa-brands fa-google fa-xl"></i>
          </button>
          <button className={style.sns}>
            <i className="fa-brands fa-facebook fa-xl"></i>
          </button>
        </div>

        <div className={style.haveAnAccount}>
          <span>Already have an account?</span>
          <span onClick={onBackToLoginClick}>Sign in</span>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
