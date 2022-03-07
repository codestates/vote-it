import React, { Dispatch, SetStateAction } from 'react';
// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { darkHandler, loginHandler, userHandler } from '../modules/login';
import { useNavigate } from 'react-router-dom';
import { notify } from '../modules/notification';
// import { notify } from '../modules/notification';

const Canvas = styled.div<{ dropOn: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  min-height: 100vh;
  width: 100vw;
  z-index: -5;
  opacity: 0;
  visibility: ${(props) => (props.dropOn ? 'visible' : 'hidden')};
`;

const Container = styled.div<{ dropOn: boolean }>`
  font-family: 'SUIT-Light';
  position: fixed;
  top: 48px;
  min-height: 144px;
  width: 160px;
  background-color: var(--menu-bg);
  box-shadow: -1px -1px 2px var(--box-shadow),
    3px 3px 8px var(--box-shadow-darker);
  border-radius: 10px;
  z-index: 999;
  margin-right: -100px;
  visibility: ${(props) => (props.dropOn ? 'visible' : 'hidden')};
  transform: ${(props) => (props.dropOn ? 'scaleY(1)' : 'scaleY(0)')};
  transform-origin: 0 0 0;
  transition: all 0.3s;
  @media only screen and (max-width: 1200px) {
    margin-right: calc(100% - 110%);
  }
  /* @media only screen and (max-width: 768px) {
    margin-right: calc(100% - 120%);
  } */
  @media only screen and (max-width: 500px) {
    margin-right: calc(100% - 110%);
  }
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
  const navigate = useNavigate();

  // const userColorTheme = localStorage.getItem('color-theme');
  // const [darkMode, setDarkMode] = useState<boolean>(userColorTheme === 'dark');

  const handleButtonClick =
    (key: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      if (key === 'logout') {
        dispatch(loginHandler(false));
        localStorage.setItem('isLogin', 'false');
        localStorage.setItem('accessToken', '');
        // localStorage.setItem('color-theme', 'light');
        localStorage.setItem('userId', '-1');
        setDropOn(false);
        // dispatch(darkHandler(false));
        dispatch(userHandler(-1));
        dispatch(notify('로그아웃이 완료되었습니다.'));
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

  // const handleDarkMode = () => {
  //   localStorage.setItem('color-theme', darkMode ? 'light' : 'dark');
  //   document.documentElement.setAttribute(
  //     'color-theme',
  //     darkMode ? 'light' : 'dark',
  //   );
  //   dispatch(darkHandler(!darkMode));
  //   setDarkMode(!darkMode);
  // };
  return (
    <>
      <Canvas dropOn={dropOn} onClick={handleDropOff} />
      <Container dropOn={dropOn}>
        <Button onClick={handleButtonClick('profile')}>프로필 설정</Button>
        <Button onClick={handleButtonClick('activity')}>활동 기록</Button>
        <Button onClick={handleButtonClick('security')}>보안</Button>
        {/* <Divider />
        <InputWrapper>
          <Toggle darkMode={darkMode} handleDarkMode={handleDarkMode} />
        </InputWrapper> */}
        <Divider />
        <Button onClick={handleButtonClick('logout')}>로그아웃</Button>
      </Container>
    </>
  );
};

export default DropDown;
