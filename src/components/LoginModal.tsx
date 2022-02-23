import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginHandler } from '../modules/login';
import apiAxios from '../utils/apiAxios';
import { notify } from '../modules/notification';
import { RiGoogleFill, RiKakaoTalkFill } from 'react-icons/ri';
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
  flex-direction: column;
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
    font-family: 'SUIT-Light';
    text-align: center;
    font-size: 16px;
    width: 192px;
    height: 24px;
    margin: 16px;
    border: none;
    border-bottom: 2.5px solid rgba(0, 0, 0, 0.2);

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
  font-size: 13px;
  /* font-weight: bold; */
  width: 192px;
  height: 24px;
  margin-bottom: 8px;
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color};
  cursor: pointer;
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

console.log(process.env);

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
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };

  const handleButtonClick = () => {
    const { email, password } = inputValue;
    //! 테스트용 계정 시작
    if (email === 'test' && password === 'test') {
      dispatch(loginHandler());
      setModalOn({ isOn: false, isShow: false });
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('accessToken', 'test account token');
    }
    //! 테스트용 계정 끝
    else
      apiAxios
        .post(`auth/login`, { email, password })
        .then((res) => {
          dispatch(loginHandler());
          setModalOn({ isOn: false, isShow: false });
          localStorage.setItem('isLogin', 'true');
          localStorage.setItem('accessToken', res.data.accessToken);
          dispatch(notify('로그인이 완료되었습니다.'));
        })
        .catch((err) => {
          dispatch(notify('잘못된 아이디 혹은 비밀번호입니다.'));
          console.log(err);
        });
  };

  const handleOAuthLogin = () => {
    const redirectURI = 'https://localhost:3000';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_KEY}&redirect_uri=${redirectURI}&response_type=code`;
    window.open(link);
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
            <Button
              onClick={handleButtonClick}
              style={{ color: 'white' }}
              color="var(--main-color)"
            >
              이메일로 로그인
            </Button>
            <Button color="white">
              <RiGoogleFill
                style={{ marginRight: '10px', fontSize: '17px', color: 'red' }}
              />
              구글 로그인
            </Button>
            <Button color="white">
              <span
                style={{
                  marginRight: '5px',
                  color: '#19CE60',
                  fontSize: '15px',
                  fontFamily: 'KOHIBaeumOTF',
                }}
              >
                N
              </span>
              네이버 로그인
            </Button>
            <Button onClick={handleOAuthLogin} color="white">
              <RiKakaoTalkFill
                style={{
                  marginRight: '5px',
                  fontSize: '17px',
                  color: '#4e4600',
                }}
              />
              카카오 로그인
            </Button>
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
