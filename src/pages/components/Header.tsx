import React, { Dispatch, SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  LoginModal,
  SignupModal,
  DropDown,
  Feed,
  Scheduler,
} from '../../components';
import { FaPlus, FaUserCircle, FaBell, FaSearch } from 'react-icons/fa';
const Container = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  box-shadow: -2px -2px 4px #ececec, 3px 3px 8px rgb(184, 184, 184);
  height: 48px;
  z-index: 1;
  background-color: #fff;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 1200px;
  grid-gap: 24px;
  padding: 8px;

  img {
    grid-column: 1 / span 1;
    width: 80px;
    height: 32px;
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

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const SettingWrapper = styled.div`
  display: flex;
  /* flex: 1 0 auto; */
  grid-column: 11 / span 2;
  justify-content: space-between;
  div {
    height: 32px;
    line-height: 32px;
  }

  @media only screen and (max-width: 500px) {
    grid-column: 8 / span 4;
  }
`;

const SearchIcon = styled.div`
  display: none;
  cursor: pointer;

  @media only screen and (max-width: 500px) {
    display: block;
  }
`;

const Notice = styled.div`
  /* flex: 1 0 auto; */
  cursor: pointer;
`;

const Setting = styled.div`
  /* flex: 1 0 auto; */
  cursor: pointer;
`;

const TextButton = styled.div`
  /* flex: 1 0 auto; */
  cursor: pointer;
`;

const CreateVoteBtn = styled.div``;

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
    grid-column: 7 / span 6;
  }
`;

const MiniSearchContainer = styled.div`
  width: 100%;
  height: 48px;
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
`;

const CloseMiniSearch = styled.div`
  width: 50px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const MiniSearch = styled.input`
  width: 75%;
  height: 35px;
`;

interface IProps {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

type Modal = {
  isOn: boolean;
  isShow: boolean;
};

// type TDrop = {
//   isOn: boolean;
//   isShow: boolean;
// };

const Header: React.FunctionComponent<IProps> = ({ isLogin, setIsLogin }) => {
  const [modalOn, setModalOn] = useState<Modal>({
    isOn: false,
    isShow: false,
  });
  const [dropOn, setDropOn] = useState(false);
  const [noticeOn, setNoticeOn] = useState(false);
  const [modalClass, setModalClass] = useState<number>(0);
  const [isMiniOpen, setIsMiniOpen] = useState(false);
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
  return (
    <Container>
      {isMiniOpen ? (
        <MiniSearchContainer>
          <CloseMiniSearch
            onClick={() => {
              setIsMiniOpen(false);
            }}
          >
            x
          </CloseMiniSearch>
          <MiniSearch type={'text'} />
        </MiniSearchContainer>
      ) : (
        ''
      )}
      <Wrapper>
        <Link to="/">
          <img
            src={`${process.env.PUBLIC_URL}/vote-it_LOGO.png`}
            alt="vote-it logo"
          />
        </Link>
        <SearchWrapper>
          <Search></Search>
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
                <FaPlus style={{ color: 'black' }} />
              </CreateVoteBtn>
            </Link>
            <Notice onClick={handleNoticeClick}>
              <FaBell />
            </Notice>
            {noticeOn ? <Feed setNoticeOn={setNoticeOn} /> : null}
            <Setting onClick={handleSettingClick}>
              <FaUserCircle />
            </Setting>
            {dropOn ? (
              <DropDown
                dropOn={dropOn}
                setDropOn={setDropOn}
                setIsLogin={setIsLogin}
              />
            ) : null}
          </SettingWrapper>
        ) : (
          <LoginWrapper>
            <SearchIcon
              onClick={() => {
                setIsMiniOpen(true);
              }}
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
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          />
        ) : (
          <LoginModal
            modalOn={modalOn}
            setModalOn={setModalOn}
            setModalClass={setModalClass}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          />
        )
      ) : null}
    </Container>
  );
};

export default Header;
