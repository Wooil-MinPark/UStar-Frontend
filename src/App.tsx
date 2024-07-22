import TestPage from 'pages/TestPage';
import TestPageHome from 'pages/TestPageHome';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* 테스트 부분 */}
      <h1>리엑트 첫 부분 App.tsx</h1>
      <Router>
        <Routes>
          <Route path="/UStar-Frontend" element={<TestPageHome />}></Route>
          <Route path="/testpage" element={<TestPage />}></Route>
        </Routes>
      </Router>
      {/* 테스트 부분 */}
    </div>
  );
}

export default App;
