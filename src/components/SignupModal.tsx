import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import apiAxios from '../utils/apiAxios';
import { useDispatch } from 'react-redux';
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
  height: var(--modal-height) + 50px;
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
  align-items: center;
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
  /* flex: 1 0 auto; */
`;
export const Warning = styled.div`
  font-family: 'SUIT-Light';
  font-size: 12px;
  margin-top: -10px;
  color: red;
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
  const [email, setEmail] = useState('');
  const [isEmail, setIsEmail] = useState(true);
  const [name, setName] = useState('');
  const [isName, setIsName] = useState(true);
  const [password, setPassword] = useState('');
  const [isPass, setIsPass] = useState(true);
  const [checkPass, setCheckPass] = useState('');
  const [isCheck, setIsCheck] = useState(true);

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

  const EmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    const CheckEmail = (email: string): boolean => {
      return email.includes('@') || email.length === 0;
    };
    if (!CheckEmail(event.target.value)) {
      setIsEmail(false);
    } else {
      setIsEmail(true);
    }
  };
  const NameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    const CheckId = (name: string): boolean => {
      return (name.length <= 14 && name.length >= 4) || name.length === 0;
    };
    if (!CheckId(event.target.value)) {
      setIsName(false);
    } else {
      setIsName(true);
    }
  };
  const PasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    const CheckPass = (password: string): boolean => {
      return (
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,128}$/.test(
          password,
        ) || password.length === 0
      );
    };
    if (!CheckPass(event.target.value)) {
      setIsPass(false);
    } else {
      setIsPass(true);
    }
  };

  const CheckPassHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPass(event.target.value);
    if (password === event.target.value || password.length === 0) {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  };

  const SignupHandler = () => {
    apiAxios
      .post('auth/signup', { email, nickname: name, password })
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
              value={email}
              onChange={EmailHandler}
              // onChange={handleInputValue('email')}
            />
            <Warning style={isEmail ? { display: 'none' } : {}}>
              이메일 형식으로 입력해주세요.
            </Warning>
            <input
              type="text"
              placeholder="nickname"
              value={name}
              onChange={NameHandler}
              // onChange={handleInputValue('nickname')}
            />
            <Warning style={isName ? { display: 'none' } : {}}>
              닉네임은 4~14글자 입니다.
            </Warning>
            {/* <div>비밀번호</div> */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={PasswordHandler}
              // onChange={handleInputValue('password')}
            />
            <Warning style={isPass ? { display: 'none' } : {}}>
              8 ~ 128자의 영문 대소문자, 숫자, 특수문자만 사용 가능합니다.
            </Warning>
            <input
              type="password"
              placeholder="Password"
              value={checkPass}
              onChange={CheckPassHandler}
              // onChange={handleInputValue('password')}
            />
            <Warning style={isCheck ? { display: 'none' } : {}}>
              비밀번호가 일치하지 않습니다.
            </Warning>
          </InputWrapper>
          <ButtonWrapper>
            <Button
              style={{ color: 'white' }}
              color="var(--main-color)"
              onClick={SignupHandler}
            >
              이메일로 계정 만들기
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
            <Button color="white">
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
            <div onClick={handleClick('login')}>이미 계정이 있나요? 로그인</div>
          </SubWrapper>
        </Wrapper>
      </View>
    </>
  );
};

export default SignupModal;
