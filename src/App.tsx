import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Header } from './pages/components';
import { Main, Setting, Vote } from './pages';
import CreateVote from './pages/CreateVote';
import Footer from './pages/components/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginHandler } from './modules/login';
import NofiticationCenter from './components/NotificationCenter';
// export type LoginProps = boolean;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const localLogin = localStorage.getItem('isLogin');
    if (localLogin === 'true') {
      dispatch(loginHandler());
    }
  });

  console.log(process.env);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>

          <Route path="/createVote" element={<CreateVote />}></Route>

          <Route path="/vote/:id" element={<Vote></Vote>} />

          <Route path="/setting" element={<Setting />}></Route>
        </Routes>
        <NofiticationCenter />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
