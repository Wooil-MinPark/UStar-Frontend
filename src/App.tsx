import TestPage from 'pages/TestPage';
import TestPageHome from 'pages/TestPageHome';
import LoginPage from 'pages/LoginPage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>리엑트 첫 부분 App.tsx</h1>
      <h2>빌드 _ 커밋 _ 디플로이</h2>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          {/* 테스트 부분 */}
          <Route path="/UStar-Frontend" element={<TestPageHome />}></Route>
          <Route path="/testpage" element={<TestPage />}></Route>
          {/* 테스트 부분 */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
