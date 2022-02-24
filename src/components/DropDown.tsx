import React, { Dispatch, SetStateAction, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { darkHandler, loginHandler } from '../modules/login';
import { Toggle } from './ToggleButton';
// import { notify } from '../modules/notification';

const Canvas = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  min-height: 100vh;
  width: 100vw;
  /* background-color: #ccc; */
  opacity: 0;
`;

const Container = styled.div`
  font-family: 'SUIT-Light';
  position: absolute;
  top: 67px;
  min-height: 184px;
  width: 160px;

  background-color: var(--menu-bg);
  box-shadow: -1px -1px 2px var(--box-shadow),
    3px 3px 8px var(--box-shadow-darker);
  border-radius: 10px;

  z-index: 999;
`;

const Divider = styled.div`
  margin: 4px 0;
  max-height: 0px;

  border-top: 1px solid var(--border-lighter);
`;

const Button = styled.div`
  padding: 0 16px;
  text-align: left;
  cursor: pointer;
  :hover {
    color: white;
    background-color: var(--main-color);
    transition: all 0.3s;
  }
`;

const InputWrapper = styled.div`
  /* cursor: pointer; */
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
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const userColorTheme = localStorage.getItem('color-theme');
  const [darkMode, setDarkMode] = useState<boolean>(userColorTheme === 'dark');

  const handleButtonClick =
    (key: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      if (key === 'logout') {
        dispatch(loginHandler(false));
        localStorage.setItem('isLogin', 'false');
        localStorage.setItem('accessToken', '');
        localStorage.setItem('color-theme', 'light');
        setDropOn(false);
        dispatch(darkHandler(false));
        // dispatch(notify('로그아웃이 완료되었습니다.'));
        window.location.href = '/';
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
    dispatch(darkHandler(!darkMode));
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
        <InputWrapper>
          {/* <input type="checkbox" checked={darkMode} /> 다크모드 */}
          <Toggle darkMode={darkMode} handleDarkMode={handleDarkMode} />
        </InputWrapper>
        {/* <Toggle /> */}
        <Divider />
        <Button onClick={handleButtonClick('logout')}>로그아웃</Button>
      </Container>
    </>
  );
};

export default DropDown;
