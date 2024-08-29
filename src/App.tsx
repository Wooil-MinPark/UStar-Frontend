import TestPage from 'pages/TestPage';
import TestPageHome from 'pages/TestPageHome';
import LoginPage from 'pages/LoginPage';

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import { AnimatePresence, motion } from 'framer-motion';

// 에니메이션으로 page전환 하기 _ 미완성
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.5 }}>
              <LoginPage />
            </motion.div>
          }
        />
        <Route
          path="/main"
          element={
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.5 }}>
              <MainPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* 에니메이션으로 page전환 하기 _ 미완성 */}
          {/* <AnimatedRoutes /> */}

          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/main" element={<MainPage />}></Route>

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
