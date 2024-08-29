import style from 'styles/SignupForm.module.css';

interface SignupProps {
  onBackToLoginClick: () => void;
}

const SignUpForm: React.FC<SignupProps> = ({ onBackToLoginClick }) => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2>Sign up</h2>

        <i className="fa-solid fa-circle-chevron-left" onClick={onBackToLoginClick}></i>
      </div>

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
      </div>
    </div>
  );
};

export default SignUpForm;
