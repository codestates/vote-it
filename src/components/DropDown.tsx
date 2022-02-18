import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginHandler } from '../modules/login';

const Canvas = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  min-height: 100vh;
  width: 100vw;
  /* background-color: #ccc; */
`;

const Container = styled.div`
  position: absolute;
  top: 48px;
  min-height: 184px;
  width: 160px;
  background-color: white;
  box-shadow: 0 0 3px 0 gray;
  border-radius: 0 0 8px 8px;
  z-index: 999;
`;

const Divider = styled.div`
  margin: 4px 0;
  max-height: 0px;
  border-top: 1px solid gray;
`;

const Button = styled.div`
  padding: 0 16px;
  text-align: left;
  cursor: pointer;
  :hover {
    color: white;
    background-color: var(--main-color);
  }
`;

const InputWrapper = styled.div`
  cursor: pointer;
  :hover {
    color: #808080;
  }
`;

// interface IDropOn {
//   isOn: boolean;
//   isShow: boolean;
// }

interface IProps {
  dropOn: boolean;
  setDropOn: Dispatch<SetStateAction<boolean>>;
}

const DropDown: React.FunctionComponent<IProps> = ({ dropOn, setDropOn }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userColorTheme = localStorage.getItem('color-theme');
  const [darkMode, setDarkMode] = useState<boolean>(userColorTheme === 'dark');

  const handleButtonClick =
    (key: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      if (key === 'logout') {
        dispatch(loginHandler());
        localStorage.setItem('isLogin', 'false');
        localStorage.setItem('accessToken', '');
        setDropOn(false);
        navigate('/');
      } else {
        setDropOn(false);
        localStorage.setItem('setting', key);
        // navigate('/setting', { replace: true });
        window.location.replace('/setting');
      }
    };
  const handleDropOff = () => {
    setDropOn(false);
  };

  const handleDarkMode = () => {
    localStorage.setItem('color-theme', darkMode ? 'light' : 'dark');
    document.documentElement.setAttribute(
      'color-theme',
      darkMode ? 'light' : 'dark',
    );
    setDarkMode(!darkMode);
  };
  return (
    <>
      <Canvas onClick={handleDropOff} />
      <Container>
        <Button onClick={handleButtonClick('profile')}>프로필 설정</Button>
        <Button onClick={handleButtonClick('activity')}>활동 기록</Button>
        <Button onClick={handleButtonClick('security')}>보안</Button>
        <Divider />
        <InputWrapper onClick={handleDarkMode}>
          <input type="checkbox" checked={darkMode} /> 다크모드
        </InputWrapper>
        <Divider />
        <Button onClick={handleButtonClick('logout')}>로그아웃</Button>
      </Container>
    </>
  );
};

export default DropDown;
