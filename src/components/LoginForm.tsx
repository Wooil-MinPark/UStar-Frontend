import style from 'styles/LoginForm.module.css';

interface LoginFormProps {
  onSignupClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSignupClick }) => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.heading}>Welcome Back 👋</h2>
        <p className={style.subHeading}>Log in your account</p>
      </div>

      <div className={style.form}>
        <input type="email" placeholder="Email" className={style.input} />
        <input type="password" placeholder="Password" className={style.input} />
        {/* 로그인 버튼을 누루면 서버랑 이러쿵 저러쿵 해야함 */}
        <button className={style.loginButton}>Login</button>

        <div className={style.dividingline}>
          <div className={style.line}></div>
          <div className={style.lineinfo}>OR</div>
          <div className={style.line}></div>
        </div>

        <button className={style.signupButton} onClick={onSignupClick}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
