import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from 'styles/LoginForm.module.css';
import axios from 'axios';
import { USER_API } from 'contants';

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

const LoginForm: React.FC<LoginFormProps> = ({ onSignupClick }) => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userEmail && !userPassword) {
      setEmailError(true);
      setPasswordError(true);
      return;
    }

    if (!userEmail) {
      setEmailError(true);
      return;
    } else setEmailError(false);

    if (!userPassword) {
      setPasswordError(true);
      return;
    } else setPasswordError(false);

    try {
      const res = await axios.post<ApiResponse>(
        USER_API + 'login',
        { userEmail, userPassword },
        { withCredentials: true }
      );

      if (res.data.errorCode === 'USER_003' || res.data.errorCode === 'USER_004') {
        alert('이메일 또는 페스워드를 확인해 주세요');
        return;
      }

      console.log(res);
      localStorage.setItem('authToken', res.data.data.accessToken);

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
          style={emailError ? { borderColor: 'red' } : {}}
        />

        <input
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          placeholder="Password"
          className={style.input}
          style={passwordError ? { borderColor: 'red' } : {}}
        />

        {emailError ? <div className={style.emailAlert}>이메일을 입력해주세요</div> : ''}
        {passwordError ? <div className={style.passwordAlert}>비밀번호를 입력해주세요</div> : ''}

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
