import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from 'styles/LoginForm.module.css';

interface LoginFormProps {
  onSignupClick: () => void;
}

interface ApiResponse {
  data: null | any;
  errorCode: null | string;
  errorMessage: null | string;
  token: string;
  ok: boolean;
}
// 로그인 API 만들어지면 넣기
const API = 'http://172.30.1.29:8080/api/user/signup';

const LoginForm: React.FC<LoginFormProps> = ({ onSignupClick }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post<ApiResponse>(API, { email, password });

      localStorage.setItem('token', res.data.token);

      // navigate('/main');
    } catch (error) {
      console.log(error);
    }

    console.log(email, password);
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={style.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

        <button className={style.signupButton} onClick={onSignupClick}>
          Sign up
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
