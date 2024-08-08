import ImageSection from 'components/ImageSection';
import LoginForm from 'components/LoginForm';
import style from 'styles/LoginPage.module.css';

const LoginPage = () => {
  return (
    <div>
      <div className={style.container}>
        <div className={style.leftPanel}>
          <LoginForm />
        </div>
        <div className={style.rightPanel}>
          <ImageSection />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
