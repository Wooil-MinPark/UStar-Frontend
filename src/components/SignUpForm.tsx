import style from 'styles/SignupForm.module.css';

interface SignupProps {
  onBackToLoginClick: () => void;
}

const SignUpForm: React.FC<SignupProps> = ({ onBackToLoginClick }) => {
  return (
    <div className={style.container}>
      <h2 className={style.header}>Sign up</h2>

      <div className={style.form}>
        <div className={style.usernameEail}>
          <input type="text" placeholder="Username" className={style.input} />
          <div className={style.check}>중복확인</div>
        </div>

        <div className={style.usernameEail}>
          <input type="email" placeholder="Email" className={style.input} />
          <div className={style.check}>중복확인</div>
        </div>

        <input type="password" placeholder="Password" className={style.input} />
        <input type="password" placeholder="Confirm Password" className={style.input} />

        {/* 서버랑 통신 해서 이러쿵 저러쿵 해야함 */}
        <button className={style.register}>Register</button>
        <div onClick={onBackToLoginClick} className={style.BacktoLogin}>
          ← Back to Login
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
