import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from 'styles/LoginForm.module.css';
import axios from 'axios';

interface LoginFormProps {
  onSignupClick: () => void;
}

interface ApiResponse {
  data: null | any;
  errorCode: null | string;
  errorMessage: null | string;
  accessToken: string;
  refreshToken: string;
  ok: boolean;
}
// 로그인 API 만들어지면 넣기
const API = 'http://localhost:8080/api/user/login';

const LoginForm: React.FC<LoginFormProps> = ({ onSignupClick }) => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post<ApiResponse>(API, { userEmail, userPassword });

      if (res.data.errorCode === 'USER_003' || res.data.errorCode === 'USER_004') {
        alert('이메일 또는 페스워드를 확인해 주세요');
        return;
      }
      // 나중에 토큰은 어떻게 받을지 고민해보기
      console.log(res);
      localStorage.setItem('token', res.data.accessToken);
      navigate('/main');
    } catch (error) {
      console.log(error);
    }

    console.log(userEmail, userPassword);
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.heading}>Welcome Back 👋</h2>
        <p className={style.subHeading}>Log in your account</p>
      </div>

      <form className={style.form} onSubmit={handleSubmit}>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Email"
          className={style.input}
        />
        <input
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          placeholder="Password"
          className={style.input}
        />
        {/* 로그인 버튼을 누루면 서버랑 이러쿵 저러쿵 해야함 */}
        <button type="submit" className={style.loginButton}>
          Login
        </button>

        <div className={style.dividingline}>
          <div className={style.line}></div>
          <div className={style.lineinfo}>OR</div>
          <div className={style.line}></div>
        </div>
      </form>
      <button className={style.signupButton} onClick={onSignupClick}>
        Sign up
      </button>
    </div>
  );
};

export default LoginForm;
