import { useEffect } from 'react';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginHandler, userHandler } from '../modules/login';
import apiAxios from '../utils/apiAxios';
import { notify } from '../modules/notification';

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
  font-family: 'SUIT-Light';
  display: flex;
  flex-direction: column;
  justify-content: center;

  position: absolute;

  left: calc(50vw - var(--modal-width) / 2);
  top: calc(50vh - var(--modal-height) / 2);
  height: var(--modal-height);
  width: var(--modal-width);
  background-color: var(--modal-bg);
  border-radius: 16px;
  /* border: var(--modal-border); */
  box-shadow: -1px -1px 1px var(--box-shadow),
    2px 2px 6px var(--box-shadow-darker);
  z-index: 999;
  opacity: 0;
  transition: all 0.5s;
  &.show {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex: 100 0 auto;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  margin-top: 30px;
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
    font-family: 'SUIT-Light';
    text-align: center;
    font-size: 16px;
    width: 192px;
    height: 24px;
    margin: 16px;
    border: none;
    border-bottom: 2.5px solid var(--option-hover);

    :focus {
      outline: none;
      border-bottom-color: var(--main-color);
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
  font-family: 'OTWelcomeRA';
  font-size: 13px;
  /* font-weight: bold; */
  width: 192px;
  height: 33px;
  margin-bottom: 8px;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  cursor: pointer;
  color: white;
  box-shadow: -1px -1px 1px var(--box-shadow),
    1px 1px 3px var(--box-shadow-darker);
  :hover {
    opacity: 0.9;
  }
`;

const SubWrapper = styled.div`
  font-family: 'OTWelcomeRA';
  display: flex;
  margin: 8px;
  div {
    margin: 8px;
    cursor: pointer;
    :hover {
      opacity: 0.6;
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
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };

  const handleButtonClick = () => {
    const { email, password } = inputValue;
    //! 테스트용 계정 시작
    if (email === 'test' && password === 'test') {
      dispatch(loginHandler(true));
      setModalOn({ isOn: false, isShow: false });
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('accessToken', 'test account token');
    }
    //! 테스트용 계정 끝
    else
      apiAxios
        .post(`auth/login`, { email, password })
        .then((res) => {
          dispatch(loginHandler(true));
          setModalOn({ isOn: false, isShow: false });
          localStorage.setItem('isLogin', 'true');
          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem('userId', res.data.user.id);
          dispatch(notify('로그인이 완료되었습니다.'));
          dispatch(userHandler(res.data.user.id));
        })
        .catch((err) => {
          dispatch(notify('잘못된 아이디 혹은 비밀번호입니다.'));
          console.log(err);
        });
  };

  const modalESC = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleModalOff();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', modalESC);
    return () => {
      document.removeEventListener('keyup', modalESC);
    };
  }, []);

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
          <div
            className="exit-wrapper"
            style={{ fontSize: '15px' }}
            onClick={handleModalOff}
          >
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
              onKeyUp={handleKeyPress}
            />
          </InputWrapper>
          <ButtonWrapper>
            <Button onClick={handleButtonClick} color="var(--main-color)">
              로그인
            </Button>
          </ButtonWrapper>
          <SubWrapper>
            <div style={{ fontSize: '14px' }} onClick={handleClick('signup')}>
              회원가입
            </div>
            {/* <div>계정 찾기</div> */}
          </SubWrapper>
        </Wrapper>
      </View>
    </>
  );
};

export default LoginModal;
