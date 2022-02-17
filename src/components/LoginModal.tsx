import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginHandler } from '../modules/login';
import apiAxios from '../utils/apiAxios';

const Canvas = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.5s;
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
  height: var(--modal-height);
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

type InputValue = {
  email: string;
  password: string;
};

const LoginModal: React.FunctionComponent<IProps> = ({
  modalOn,
  setModalOn,
  setModalClass,
}) => {
  const [inputValue, setInputValue] = useState<InputValue>({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleModalOff = () => {
    console.log('Modal Off');
    setModalOn({ isOn: false, isShow: false });
  };

  const handleClick =
    (key: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      if (key === 'signup') {
        setModalClass(1);
      }
    };

  const handleInputValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue({ ...inputValue, [key]: e.target.value });
    };

  const handleButtonClick = () => {
    const { email, password } = inputValue;
    apiAxios
      .post(`auth/login`, { email, password })
      .then((res) => {
        dispatch(loginHandler());
        setModalOn({ isOn: false, isShow: false });
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('accessToken', res.data.accessToken);
      })
      .catch((err) => {
        console.log(err);
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
            {/* <div>비밀번호</div> */}
            <input
              type="password"
              placeholder="Password"
              onChange={handleInputValue('password')}
            />
          </InputWrapper>
          <ButtonWrapper>
            <Button onClick={handleButtonClick} color="rgb(199,199,199)">
              이메일로 로그인
            </Button>
            <Button color="rgb(234,067,053)">구글 로그인</Button>
            <Button color="rgb(45, 180, 0)">네이버 로그인</Button>
            <Button color="rgb(249, 224, 0)">카카오 로그인</Button>
          </ButtonWrapper>
          <SubWrapper>
            <div onClick={handleClick('signup')}>회원가입</div>
            <div>계정 찾기</div>
          </SubWrapper>
        </Wrapper>
      </View>
    </>
  );
};

export default LoginModal;
