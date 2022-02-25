import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import {
  LoginModal,
  SignupModal,
  DropDown,
  Feed,
  // Scheduler,
} from '../../components';
import { FaPlus, FaUserCircle, FaBell, FaSearch } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { darkHandler } from '../../modules/login';

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
  z-index: 1;
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
  img {
    /* color: var(--font); */

    grid-column: 1 / span 1;
    width: 80px;
    height: 32px;
  }

  @media only screen and (max-width: 500px) {
    width: 360px;
  }
`;

const SearchWrapper = styled.div`
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
`;

const Search = styled.input`
  /* flex: 1 0 auto; */
  width: 70%;
  height: 24px;

  padding: 4px;
  padding-left: 15px;
  border-radius: 10px;
  border: none;
  box-shadow: inset 2px 2px 3px 2px var(--box-shadow-darker);

  background-color: var(--box-bg-lighter);

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const SettingWrapper = styled.div`
  display: flex;
  /* flex: 1 0 auto; */
  grid-column: 11 / span 2;
  justify-content: space-between;
  svg {
    transform: translate(0, 6px);
    :hover {
      color: var(--font-lighter);
    }
  }
  div {
    height: 32px;
    line-height: 32px;
  }

  @media only screen and (max-width: 500px) {
    grid-column: 7 / span 6;
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
  /* flex: 1 0 auto; */
  cursor: pointer;
  /* margin-top: 10px; */
`;

const Setting = styled.div`
  &:hover {
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

  /* margin-top: 10px; */

  color: var(--font);
`;

const LoginWrapper = styled.div`
  display: flex;
  /* flex: 1 0 auto; */
  grid-column: 11 / span 2;
  justify-content: space-between;
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
  padding: 5px 10px;
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
  width: 100%;
  height: 48px;
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--box-bg);
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 60%;
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

// type TDrop = {
//   isOn: boolean;
//   isShow: boolean;
// };

const Header: React.FunctionComponent = () => {
  const [modalOn, setModalOn] = useState<Modal>({
    isOn: false,
    isShow: false,
  });
  const [dropOn, setDropOn] = useState(false);
  const [noticeOn, setNoticeOn] = useState(false);
  const [modalClass, setModalClass] = useState<number>(0);
  const [isMiniOpen, setIsMiniOpen] = useState(false);

  const isLogin = useSelector((state: RootState) => state.login.isLogin);

  const dispatch = useDispatch();

  const isDark = useSelector((state: RootState) => state.login.isDark);

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
    setNoticeOn(!noticeOn);
  };
  const handleSettingClick = () => {
    setDropOn(!dropOn);
  };

  useEffect(() => {
    const dark = localStorage.getItem('color-theme');
    if (dark === 'dark') {
      dispatch(darkHandler(true));
    } else {
      dispatch(darkHandler(false));
    }
  }, [dispatch]);
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
        <Link to="/">
          <img
            src={
              isDark
                ? `${process.env.PUBLIC_URL}/vote-it_LOGO-dark.png`
                : `${process.env.PUBLIC_URL}/vote-it_LOGO.png`
            }
            alt="vote-it logo"
          />
        </Link>
        <SearchWrapper>
          <Search type={'text'}></Search>
          <SearchBox>
            <FaSearch />
          </SearchBox>
        </SearchWrapper>
        {isLogin ? (
          <SettingWrapper>
            <SearchIcon
              onClick={() => {
                setIsMiniOpen(true);
              }}
            >
              <FaSearch />
            </SearchIcon>
            <Link to="/createVote">
              <CreateVoteBtn>
                <FaPlus style={{ fontSize: '18px' }} />
              </CreateVoteBtn>
            </Link>
            <Notice onClick={handleNoticeClick}>
              <FaBell style={{ fontSize: '18px' }} />
            </Notice>
            {noticeOn ? <Feed setNoticeOn={setNoticeOn} /> : null}
            <Setting onClick={handleSettingClick}>
              <FaUserCircle style={{ fontSize: '18px' }} />
            </Setting>
            {dropOn ? <DropDown dropOn={dropOn} setDropOn={setDropOn} /> : null}
          </SettingWrapper>
        ) : (
          <LoginWrapper>
            <SearchIcon
              onClick={() => {
                setIsMiniOpen(true);
              }}
            >
              <FaSearch style={{ fontSize: '18px' }} />
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
