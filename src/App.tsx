import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Header } from './pages/components';
import { Main, Setting, Vote, OAuth } from './pages';
import CreateVote from './pages/CreateVote';
import Footer from './pages/components/Footer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { darkHandler, loginHandler, userHandler } from './modules/login';
import NofiticationCenter from './components/NotificationCenter';
import { kakaoInit } from './lib/initialize';
import { notify } from './modules/notification';
import { MainEmpty } from './pages/MainEmpty';
import ServerErr from './pages/ServerErr';
// import { RootState } from './modules';
// export type LoginProps = boolean;

type Modal = {
  isOn: boolean;
  isShow: boolean;
};

function App() {
  const dispatch = useDispatch();
  const [headerVisibility, setHeaderVisibility] = useState(true);
  const [modalOn, setModalOn] = useState<Modal>({
    isOn: false,
    isShow: false,
  });

  useEffect(() => {
    const localLogin = localStorage.getItem('isLogin');
    const userColorTheme = localStorage.getItem('color-theme');
    const localUser = localStorage.getItem('userId');
    document.documentElement.setAttribute(
      'color-theme',
      userColorTheme || 'light',
    );
    if (localLogin === 'true') {
      dispatch(loginHandler(true));
    }
    if (!!localUser) {
      dispatch(userHandler(+localUser));
    }
    if (userColorTheme === 'dark') {
      dispatch(darkHandler(true));
    } else if (userColorTheme === 'light') {
      dispatch(darkHandler(false));
    }
  }, []);

  useEffect(() => {
    kakaoInit();
  }, []);

  useEffect(() => {
    window.location.href.includes('access_token') && GetUser();
    function GetUser() {
      const location = window.location.href.split('=')[1];
      const token = location.split('&')[0];
      console.log('token: ', token);
      const login = localStorage.getItem('isLogin');
      if (login === 'false') {
        dispatch(notify('로그인이 완료되었습니다.'));
      }
      dispatch(loginHandler(true));
      localStorage.setItem('isLogin', 'true');
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <>
          {headerVisibility ? (
            <Header modalOn={modalOn} setModalOn={setModalOn} />
          ) : null}
          <Routes>
            <Route path="/*" element={<Main />} />
            <Route
              path="/oauth"
              element={<OAuth setHeaderVisibility={setHeaderVisibility} />}
            />

            <Route
              path="/createVote"
              element={<CreateVote setModalOn={setModalOn} />}
            ></Route>

            <Route path="/vote/:id" element={<Vote></Vote>} />

            <Route path="/setting" element={<Setting />}></Route>

            <Route path="/emptymain" element={<MainEmpty />} />
          </Routes>
          <NofiticationCenter />
          {headerVisibility ? <Footer /> : null}
        </>
      </div>
    </Router>
  );
}

export default App;
