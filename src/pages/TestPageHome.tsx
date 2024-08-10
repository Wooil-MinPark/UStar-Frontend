import TestButton from 'components/TestButton';
import { Link } from 'react-router-dom';

const TestPageHome = () => {
  return (
    <div>
      <Link to={'/testpage'}>
        <TestButton title="테스트용 페이지로 가버렷 버튼" />
      </Link>
      <Link to={'/'}>
        <TestButton title="UStar 로그인 페이지로 가기" />
      </Link>
    </div>
  );
};

export default TestPageHome;
