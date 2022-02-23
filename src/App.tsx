import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Header } from './pages/components';
import { Main, Setting, Vote, Loading } from './pages';
import CreateVote from './pages/CreateVote';
import Footer from './pages/components/Footer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { darkHandler, loginHandler } from './modules/login';
import NofiticationCenter from './components/NotificationCenter';
import { kakaoInit } from './lib/initialize';
// import { RootState } from './modules';
// export type LoginProps = boolean;

function App() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  //! axios 세팅 이후 로딩 컴포넌트 세팅해야함

  useEffect(() => {
    const localLogin = localStorage.getItem('isLogin');
    const userColorTheme = localStorage.getItem('color-theme');
    document.documentElement.setAttribute(
      'color-theme',
      userColorTheme || 'light',
    );
    if (localLogin === 'true') {
      dispatch(loginHandler());
    }
    if (userColorTheme === 'dark') {
      dispatch(darkHandler(true));
    } else if (userColorTheme === 'light') {
      dispatch(darkHandler(false));
    }
  });

  useEffect(() => {
    kakaoInit();
  }, []);

  return (
    <Router>
      <div className="App">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Main />}></Route>

              <Route path="/createVote" element={<CreateVote />}></Route>

              <Route path="/vote/:id" element={<Vote></Vote>} />

              <Route path="/setting" element={<Setting />}></Route>
            </Routes>
            <NofiticationCenter />
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
