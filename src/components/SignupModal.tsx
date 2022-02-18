import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import apiAxios from '../utils/apiAxios';
import { useDispatch } from 'react-redux';
import { notify } from '../modules/notification';

const Canvas = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: all 0.5s;
  &.show {
    opacity: 1;
  }
`;

const View = styled.div`
  /* display: flex; */
  flex-direction: column;
  position: absolute;
  left: calc(50vw - var(--modal-width) / 2);
  top: calc(50vh - var(--modal-height) / 2);
  height: var(--modal-height) + 50px;
  width: var(--modal-width);
  background-color: var(--modal-bg);
  border-radius: 16px;
  border: var(--modal-border);
  box-shadow: 0 0 8px 8px gray;
  z-index: 999;
  opacity: 0;
  transition: all 0.5s;
  &.show {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex: 100 0 auto;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* flex: 1 0 auto; */
  padding: 16px 0;
  margin-bottom: 8px;
  div {
    flex: 1 0 auto;
    text-align: left;
  }
  input {
    text-align: center;
    font-size: 16px;
    width: 192px;
    height: 24px;
    margin: 16px;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    :focus {
      outline: none;
      border-bottom-color: rgba(0, 0, 0);
      transition: all 0.5s;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* flex: 1 0 auto; */
`;

const Button = styled.button`
  font-size: 12px;
  font-weight: bold;
  width: 192px;
  height: 24px;
  margin-bottom: 8px;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => props.color};
  cursor: pointer;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.4);
  :hover {
    opacity: 0.7;
  }
`;

const SubWrapper = styled.div`
  display: flex;
  margin: 8px;
  div {
    margin: 8px;
    cursor: pointer;
    :hover {
      opacity: 0.7;
    }
  }
  /* flex: 1 0 auto; */
`;

interface IModalOn {
  isOn: boolean;
  isShow: boolean;
}

interface IProps {
  modalOn: IModalOn;
  setModalOn: Dispatch<SetStateAction<IModalOn>>;
  setModalClass: Dispatch<SetStateAction<number>>;
}

const SignupModal: React.FunctionComponent<IProps> = ({
  modalOn,
  setModalOn,
  setModalClass,
}) => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    nickname: '',
  });

  const dispatch = useDispatch();

  const handleModalOff = () => {
    console.log('Modal Off');
    setModalOn({ isOn: false, isShow: false });
  };

  const handleClick =
    (key: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      if (key === 'login') {
        setModalClass(0);
      }
    };

  const handleInputValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue({ ...inputValue, [key]: e.target.value });
    };

  const SignupHandler = () => {
    apiAxios
      .post('auth/signup', inputValue)
      .then((res) => {
        console.log(res.data);
        // window.location.href = './';
        dispatch(notify('회원가입이 완료되었습니다.'));
        setModalOn({ isOn: false, isShow: false });
      })
      .catch((err) => {
        dispatch(notify('올바른 양식으로 입력해주세요.'));
      });
  };

  return (
    <>
      <Canvas
        className={modalOn.isShow ? 'canvas show' : 'canvas'}
        onClick={handleModalOff}
      />
      <View
        className={modalOn.isShow ? 'modal-view show' : 'modal-view'}
        onClick={(e) => e.preventDefault()}
      >
        <Wrapper>
          <div className="exit-wrapper" onClick={handleModalOff}>
            &times;
          </div>
          <InputWrapper>
            {/* <div>이메일</div> */}
            <input
              type="email"
              placeholder="E-mail"
              onChange={handleInputValue('email')}
            />
            <input
              type="text"
              placeholder="nickname"
              onChange={handleInputValue('nickname')}
            />
            {/* <div>비밀번호</div> */}
            <input
              type="password"
              placeholder="Password"
              onChange={handleInputValue('password')}
            />
          </InputWrapper>
          <ButtonWrapper>
            <Button color="rgb(199,199,199)" onClick={SignupHandler}>
              이메일로 계정 만들기
            </Button>
            <Button color="rgb(234,067,053)">구글 로그인</Button>
            <Button color="rgb(45, 180, 0)">네이버 로그인</Button>
            <Button color="rgb(249, 224, 0)">카카오 로그인</Button>
          </ButtonWrapper>
          <SubWrapper>
            <div onClick={handleClick('login')}>이미 계정이 있나요? 로그인</div>
          </SubWrapper>
        </Wrapper>
      </View>
    </>
  );
};

export default SignupModal;
