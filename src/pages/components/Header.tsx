import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import {
  LoginModal,
  SignupModal,
  DropDown,
  Feed,
  Toggle,
} from '../../components';
import { FaPlus, FaUserCircle, FaBell, FaSearch } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { darkHandler } from '../../modules/login';
import { useRef } from 'react';

const Container = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  box-shadow: -2px -2px 4px var(--box-shadow),
    3px 3px 8px var(--box-shadow-darker);
  height: 48px;
  z-index: 1500;
  background-color: var(--menu-bg-tp);
  backdrop-filter: blur(5px);
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 1200px;
  grid-gap: 24px;
  padding: 8px;
  align-items: center;
  #logo {
    /* color: var(--font); */

    grid-column: 1 / span 1;
    width: 80px;
    height: 32px;
  }

  @media only screen and (max-width: 500px) {
    width: 360px;
  }
`;

const SearchWrapper = styled.div<{ slashVisible: boolean }>`
  /* flex: 2 0 auto; */
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 3 / span 7;
  /* border: 1px solid blue; */

  @media only screen and (max-width: 768px) {
    grid-column: 4 / span 4;
  }

  @media only screen and (max-width: 500px) {
    display: none;
  }
  .shortcut-wrapper {
    display: inline-block;
    position: absolute;
    width: 0;
    height: 14px;
  }
  .search-shortcut {
    user-select: none;
    display: ${(props) => (props.slashVisible ? 'block' : 'none')};
    position: absolute;
    font-size: 12px;
    padding: 1px 2px 2px 2px;
    width: 14px;
    height: 14px;
    top: -2px;
    left: 24px;
    line-height: 14px;
    color: var(--font-lighter);
    border: 1px solid var(--border-lighter);
    border-radius: 4px;
    cursor: text;
  }
`;

const Search = styled.input`
  /* flex: 1 0 auto; */
  min-width: 128px;
  width: 128px;
  height: 24px;
  padding: 4px;
  padding-left: 15px;
  border-radius: 8px;
  border: none;
  box-shadow: inset 1px 1px 2px 1px var(--box-shadow-darker);

  background-color: var(--box-bg-lighter);
  transition: all 0.3s;

  :focus {
    width: 70%;
    transition: all 0.3s;
  }

  /* @media only screen and (max-width: 768px) {
    width: 100%;
  } */
`;

const SettingWrapper = styled.div`
  user-select: none;
  display: flex;
  /* flex: 1 0 auto; */
  grid-column: 11 / span 4;
  justify-content: space-around;
  svg {
    transform: translate(0, 6px);
    :hover {
      color: var(--font-lighter);
    }
  }
  > div {
    height: 32px;
    line-height: 32px;
  }
  > a > div {
    height: 32px;
    line-height: 32px;
  }
  @media only screen and (max-width: 1200px) {
    grid-column: 10 / span 8;
  }

  @media only screen and (max-width: 768px) {
    grid-column: 8 / span 6;
  }

  @media only screen and (max-width: 501px) {
    grid-column: 4 / span 9;
  }
`;

const SearchIcon = styled.div`
  &:hover {
    color: var(--main-color);
  }

  display: none;
  cursor: pointer;
  /* margin-top: 10px; */

  @media only screen and (max-width: 500px) {
    display: block;
  }
`;

const Notice = styled.div`
  &:hover {
    color: var(--main-color);
  }
  svg:hover {
    color: var(--main-color);
  }
  /* flex: 1 0 auto; */
  cursor: pointer;
  /* margin-top: 10px; */
`;

const Setting = styled.div`
  &:hover {
    color: var(--main-color);
  }
  svg:hover {
    color: var(--main-color);
  }
  justify-content: center;
  /* flex: 1 0 auto; */
  cursor: pointer;
  /* margin-top: 10px; */
`;

const TextButton = styled.div`
  /* flex: 1 0 auto; */
  &:hover {
    color: var(--main-color);
  }
  font-family: 'SUIT-Medium';
  /* margin-top: 5px; */
  margin-right: 5px;
  font-size: 15px;
  cursor: pointer;
`;

const CreateVoteBtn = styled.div`
  &:hover {
    color: var(--main-color);
  }
  svg:hover {
    color: var(--main-color);
  }
  /* margin-top: 10px; */

  color: var(--font);
`;

const LoginWrapper = styled.div`
  display: flex;
  /* flex: 1 0 auto; */
  grid-column: 11 / span 2;
  justify-content: space-around;
  div {
    height: 32px;
    line-height: 32px;
  }

  @media only screen and (max-width: 768px) {
    grid-column: 8 / span 4;
  }

  @media only screen and (max-width: 500px) {
    grid-column: 6 / span 7;
  }
`;

const SearchBox = styled.div`
  margin-left: 10px;
  padding: 7px 10px 5px 10px;
  border-radius: 10px;
  /* border: 1px solid #dbdbdb; */
  /* box-shadow: inset 2px 2px 3px 2px var(--box-shadow-darker); */
  background-color: var(--main-color);
  cursor: pointer;
  &:hover {
    background-color: var(--main-color-tint);
  }

  @media only screen and (max-width: 500px) {
    display: none;
  }
`;

const MiniSearchContainer = styled.div`
  width: 80%;
  height: 48px;
  z-index: 999;
  position: absolute;
  top: 48px;
  left: auto;
  background-color: var(--box-bg);
  display: none;
  box-shadow: 2px 2px 4px 1px var(--box-shadow-darker);
  border-radius: 0 0 8px 8px;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 501px) {
    display: flex;
  }
`;

const CloseMiniSearch = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const MiniSearch = styled.input`
  width: 70%;
  height: 35px;
  border: none;
  padding-left: 10px;
  border-radius: 10px;
  box-shadow: inset 2px 2px 3px 2px var(--box-shadow-darker);
`;

const MiniSearchIcon = styled.div`
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #dbdbdb;
  /* box-shadow: inset 2px 2px 3px 2px var(--box-shadow-darker); */
  background-color: var(--main-color);
  cursor: pointer;
  &:hover {
    background-color: var(--main-color-tint);
  }
`;

type Modal = {
  isOn: boolean;
  isShow: boolean;
};

interface Props {
  keyupHandler: (e: KeyboardEvent) => void;
  finderRef: React.MutableRefObject<HTMLInputElement | null>;
  modalOn: Modal;
  setModalOn: Dispatch<SetStateAction<Modal>>;
}

// type TDrop = {
//   isOn: boolean;
//   isShow: boolean;
// };

const Header: React.FunctionComponent<Props> = ({
  keyupHandler,
  finderRef,
  modalOn,
  setModalOn,
}) => {
  // const [modalOn, setModalOn] = useState<Modal>({
  //   isOn: false,
  //   isShow: false,
  // });
  const [slashVisible, setSlashVisible] = useState(true);
  const [dropOn, setDropOn] = useState(false);
  const [noticeOn, setNoticeOn] = useState(false);
  const [modalClass, setModalClass] = useState<number>(0);
  const [isMiniOpen, setIsMiniOpen] = useState(false);

  const disableModal = () => {
    setDropOn(false);
    setNoticeOn(false);
  };

  const isLogin = useSelector((state: RootState) => state.login.isLogin);

  const dispatch = useDispatch();

  const isDark = useSelector((state: RootState) => state.login.isDark);

  const userColorTheme = localStorage.getItem('color-theme');
  const [darkMode, setDarkMode] = useState<boolean>(userColorTheme === 'dark');

  const handleDarkMode = () => {
    localStorage.setItem('color-theme', darkMode ? 'light' : 'dark');
    document.documentElement.setAttribute(
      'color-theme',
      darkMode ? 'light' : 'dark',
    );
    dispatch(darkHandler(!darkMode));
    setDarkMode(!darkMode);
  };

  const handleModal =
    (key: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      if (key === 'login') {
        setModalOn({ isShow: false, isOn: true });
        setModalClass(0);
        setTimeout(() => {
          setModalOn({ isOn: true, isShow: true });
        }, 50);
      }
      if (key === 'signup') {
        setModalOn({ isShow: false, isOn: true });
        setModalClass(1);
        setTimeout(() => {
          setModalOn({ isOn: true, isShow: true });
        }, 50);
      }
    };

  const handleNoticeClick = () => {
    disableModal();
    setNoticeOn(!noticeOn);
  };
  const handleSettingClick = () => {
    disableModal();
    setDropOn(!dropOn);
  };

  const inputESC = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      finderRef.current?.blur();
    }
  };

  useEffect(() => {
    const dark = localStorage.getItem('color-theme');
    if (dark === 'dark') {
      dispatch(darkHandler(true));
    } else {
      dispatch(darkHandler(false));
    }
  }, [dispatch]);

  // const keyupHandler = (e: KeyboardEvent) => {
  //   if (e.key === '/') {
  //     focusHandler(finderRef);
  //   } else {
  //     console.log('/ 키를 눌러 검색해보세요');
  //   }
  // };

  useEffect(() => {
    window.addEventListener('keyup', keyupHandler);
    return () => {
      window.removeEventListener('keyup', keyupHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {isMiniOpen ? (
        <MiniSearchContainer>
          <CloseMiniSearch
            onClick={() => {
              setIsMiniOpen(false);
            }}
          >
            <FiX />
          </CloseMiniSearch>
          <MiniSearch type={'text'} />
          <MiniSearchIcon>
            <FaSearch />
          </MiniSearchIcon>
        </MiniSearchContainer>
      ) : (
        ''
      )}
      <Wrapper>
        <Link to="/" onClick={disableModal}>
          <img
            id="logo"
            src={
              isDark
                ? `${process.env.PUBLIC_URL}/vote-it_LOGO-dark.png`
                : `${process.env.PUBLIC_URL}/vote-it_LOGO.png`
            }
            alt="vote-it logo"
          />
        </Link>
        <SearchWrapper slashVisible={slashVisible}>
          <Search
            ref={finderRef}
            onFocus={() => {
              setSlashVisible(false);
              window.removeEventListener('keyup', keyupHandler);
              window.addEventListener('keyup', inputESC);
            }}
            onBlur={() => {
              setTimeout(() => {
                setSlashVisible(true);
              }, 300);

              window.addEventListener('keyup', keyupHandler);
              window.removeEventListener('keyup', inputESC);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                // Search 함수
              }
            }}
            type={'text'}
            placeholder={'검색...'}
          />
          <div className="shortcut-wrapper">
            <div
              onClick={() => {
                finderRef.current?.focus();
              }}
              className="search-shortcut"
            >
              /
            </div>
          </div>
          <SearchBox>
            <FaSearch style={{ color: 'white' }} />
          </SearchBox>
        </SearchWrapper>
        {isLogin ? (
          <SettingWrapper>
            <Toggle darkMode={darkMode} handleDarkMode={handleDarkMode} />
            <SearchIcon
              onClick={() => {
                setIsMiniOpen(!isMiniOpen);
              }}
            >
              <FaSearch />
            </SearchIcon>
            <Link to="/createVote" onClick={disableModal}>
              <CreateVoteBtn>
                <FaPlus style={{ fontSize: '18px' }} />
              </CreateVoteBtn>
            </Link>
            <Notice onClick={handleNoticeClick}>
              <FaBell style={{ fontSize: '18px' }} />
            </Notice>
            <Feed noticeOn={noticeOn} setNoticeOn={setNoticeOn} />
            <Setting onClick={handleSettingClick}>
              <FaUserCircle style={{ fontSize: '18px' }} />
            </Setting>
            <DropDown dropOn={dropOn} setDropOn={setDropOn} />
          </SettingWrapper>
        ) : (
          <LoginWrapper>
            <Toggle darkMode={darkMode} handleDarkMode={handleDarkMode} />
            <SearchIcon
              onClick={() => {
                setIsMiniOpen(true);
              }}
              style={{ marginTop: '5px' }}
            >
              <FaSearch />
            </SearchIcon>
            <TextButton onClick={handleModal('login')}>LOGIN</TextButton>
            <TextButton onClick={handleModal('signup')}>SIGNUP</TextButton>
          </LoginWrapper>
        )}
      </Wrapper>
      {modalOn.isOn ? (
        modalClass === 1 ? (
          <SignupModal
            modalOn={modalOn}
            setModalOn={setModalOn}
            setModalClass={setModalClass}
          />
        ) : (
          <LoginModal
            modalOn={modalOn}
            setModalOn={setModalOn}
            setModalClass={setModalClass}
          />
        )
      ) : null}
    </Container>
  );
};

export default Header;
