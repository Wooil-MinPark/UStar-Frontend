import style from 'styles/LoginForm.module.css';
const LoginForm = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.heading}>Sign in</h2>
        <p className={style.subHeading}>enter your email</p>
      </div>

      <div className={style.form}>
        <input type="email" placeholder="Email" className={style.input} />
        <input type="password" placeholder="Password" className={style.input} />
        <button className={style.loginButton}>Login</button>
        <button className={style.signupButton}>Sign up</button>
      </div>
    </div>
  );
};

export default LoginForm;
