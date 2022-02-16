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
import { FaRegPlusSquare } from 'react-icons/fa';
const Container = styled.div`
  display: flex;
  box-shadow: 0 0 8px 0 black;
  height: 48px;
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1 0 auto;
  padding: 8px;

  a {
    flex: 1 0 auto;
    max-width: 80px;
    border: 1px solid blue;
  }
  img {
    width: 80px;
    height: 32px;
  }
`;

const SearchWrapper = styled.div`
  flex: 2 0 auto;
  /* display: flex; */
  align-items: center;
  border: 1px solid blue;
`;

const Search = styled.input`
  /* flex: 1 0 auto; */
  min-width: 256px;
  max-width: 384px;
  height: 24px;
`;

const SettingWrapper = styled.div`
  display: flex;
  flex: 1 0 auto;
  border: 1px solid blue;
  div {
    height: 32px;
    line-height: 32px;
  }
`;

const Notice = styled.div`
  flex: 1 0 auto;
`;

const Setting = styled.div`
  flex: 1 0 auto;
  cursor: pointer;
`;

const TextButton = styled.div`
  flex: 1 0 auto;
  cursor: pointer;
`;

const CreateVoteBtn = styled.div``;

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

        <SettingWrapper>
          {isLogin ? (
            <>
              <Link to="/createVote">
                <CreateVoteBtn>
                  <FaRegPlusSquare style={{ fontSize: '25px' }} />
                </CreateVoteBtn>
              </Link>
              <Notice onClick={handleNoticeClick}>notice</Notice>
              {noticeOn ? <Feed setNoticeOn={setNoticeOn} /> : null}
              <Setting onClick={handleSettingClick}>Icon</Setting>
              {dropOn ? (
                <DropDown
                  dropOn={dropOn}
                  setDropOn={setDropOn}
                  setIsLogin={setIsLogin}
                />
              ) : null}
            </>
          ) : (
            <>
              <TextButton onClick={handleModal('login')}>LOGIN</TextButton>
              <TextButton onClick={handleModal('signup')}>SIGNUP</TextButton>
            </>
          )}
        </SettingWrapper>
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
