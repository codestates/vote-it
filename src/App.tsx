import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Header } from './pages/components';
import { Main } from './pages';
import { useState } from 'react';
import CreateVote from './pages/CreateVote';
// export type LoginProps = boolean;

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <Router>
      <div className="App">
        <Header isLogin={isLogin} setIsLogin={setIsLogin} />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/createVote" element={<CreateVote />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
