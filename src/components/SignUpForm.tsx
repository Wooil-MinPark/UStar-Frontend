import axios from 'axios';
import { useEffect, useState } from 'react';
import style from 'styles/SignupForm.module.css';

// 응답 받을때 ok가 다 true (data가 null이든 있든) _ false는 예상치 못한 에러

const API = 'http://localhost:8080/api/user/signup';
// 172.30.1.29 우일빌라에서 쓰는 주소
//112.172.161.117 외부에서 쓰는 주소
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
  // const [userId, setUserId] = useState<string>(''); //유저 아이디 (로그인할 때 쓰는 아이디)
  const [userName, setUserName] = useState<string>(''); //유저 이름 (= 닉네임)
  const [userEmail, setUserEmail] = useState<string>(''); //유저 이메일 (로그인을 이메일로 할 것)
  const [userPassword, setUserPassword] = useState<string>(''); //유저 암호 (로그인할 때 쓰는 암호)
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // 암호 확인
  const [emIsChecking, setEmIsChecking] = useState<boolean>(false); //  이메일 확정 됐을 때
  const [nIsChecking, setNIsChecking] = useState<boolean>(false); // 이름 확정 됐을 때

  // 유저 정보 객체로
  // const [userSUInfo, setUserSUInfo] = useState<UserSignUpInfo>({
  //   userId: '',
  //   userName: '',
  //   userEmail: '',
  //   userPassword: '',
  // });

  // **비밀번호 전송시 암호화**
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userPassword !== confirmPassword) {
      // 이 에러를 consolo로 말고 다르게 표현하는걸 생각해보자
      console.log('Passwords do not match.');
      return;
    }

    try {
      const res = await axios.post<ApiResponse>(
        API,
        {
          userName: userName,
          userEmail: userEmail,
          userPassword: userPassword,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.data.data === null && res.data.errorCode === null && res.data.errorMessage === null) {
        console.log(res.data);
        onSuccess();
      } else {
        console.log(res.data);
        console.log('회원가입 실패');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckEmail = async () => {
    // const res = await axios.post<ApiResponse>(API + '/userEmailDup', { userEmail: userEmail });
    console.log('try문 전');
    const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegExp.test(userEmail)) {
      console.log('이메일 형식이 틀렸어이눔아');
      return;
    }

    try {
      console.log('try문 시작');
      const res = await axios.post<ApiResponse>(API + '/userEmailDup', { userEmail: userEmail });

      if (res.data.data) {
        // 이 에러를 consolo로 말고 다르게 표현하는걸 생각해보자
        console.log(res);
        console.log('중복된 이메일 입니다.');
        return;
      }
      setEmIsChecking(true);
      console.log(res);
      console.log('사용 가능한 이메일 입니다.');
      console.log('입력한 userNameEmail : ', userEmail);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckUsername = async () => {
    if (userName === '') {
      console.log('공백 이름은 안된다 이놈아!');
      return;
    }

    try {
      const res = await axios.post<ApiResponse>(API + '/userNameDup', { userName: userName });

      if (res.data.data) {
        // 이 에러를 consolo로 말고 다르게 표현하는걸 생각해보자
        console.log(res);
        console.log('중복된 이름입니다.');
        return;
      }
      setNIsChecking(true);
      console.log('사용 가능한 이름 입니다.');
      console.log('입력한 userName : ', userName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 변경 확인 코드
    console.log('이메일 : ', emIsChecking);
    console.log('닉네임 : ', nIsChecking);
  }, [emIsChecking, nIsChecking]);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2>Sign up</h2>
        <i className="fa-solid fa-circle-chevron-left" onClick={onBackToLoginClick}></i>
      </div>

      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.usernameEail}>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Email"
            required
            className={style.input}
            disabled={emIsChecking}
          />
          <button className={style.check} onClick={handleCheckEmail} disabled={emIsChecking}>
            중복확인
          </button>
        </div>

        <div className={style.usernameEail}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            required
            className={style.input}
            disabled={nIsChecking}
          />
          <button className={style.check} onClick={handleCheckUsername} disabled={nIsChecking}>
            중복확인
          </button>
        </div>
        <input
          type="password"
          id="userPassword"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          placeholder="Password"
          required
          className={style.input}
        />
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
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
