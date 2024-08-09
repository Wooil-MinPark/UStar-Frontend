import TestPage from 'pages/TestPage';
import TestPageHome from 'pages/TestPageHome';
import LoginPage from 'pages/LoginPage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
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
