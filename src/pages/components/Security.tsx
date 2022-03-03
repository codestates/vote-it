import { useState } from 'react';
import styled from 'styled-components';
import { WithdrawalModal } from './WithdrawalModal';
import apiAxios from '../../utils/apiAxios';
import { useDispatch } from 'react-redux';
import { notify } from '../../modules/notification';
import { setServers } from 'dns';
import ServerErr from '../ServerErr';

const Container = styled.div`
  margin-top: 25vh;
  grid-column: 4 / span 8;
  display: flex;
  flex-direction: column;
  flex: 2 0 auto;
  padding: 8px;
  font-family: 'SUIT-Light';
  /* border: 1px solid green; */

  @media only screen and (max-width: 768px) {
    grid-column: 2 / span 11;
  }

  @media only screen and (max-width: 500px) {
    margin-top: 50px;
    grid-column: span 6;
  }
`;

const PassWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  > div {
    /* flex: 1 0 216px; */
    width: 120px;
    line-height: 30px;
    text-align: left;
    margin-right: 5px;
  }
  > input {
    &:focus {
      outline: none;
      border-bottom: 3px solid var(--main-color);
    }
    width: 200px;
    border: none;
    border-bottom: 3px solid #919191;
    padding: 5px;
    font-size: 15px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  button {
    &:hover {
      background-color: #7785c9;
    }
    min-width: 100px;
    margin-right: 20px;
    border-radius: 20px;
    height: 40px;
    color: white;
    background-color: var(--main-color);
  }
  div {
    text-align: center;
    min-width: 100px;
    border-radius: 20px;
    padding: 9px 0;
    color: #cf0000;
    background-color: #eee;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: #dbdbdb;
    }
  }
`;

const Warning = styled.div`
  font-size: smaller;
  font-weight: bolder;
  color: red;
`;

interface IProps {
  keyupHandler: (e: KeyboardEvent) => void;
}

const Security: React.FunctionComponent<IProps> = ({ keyupHandler }) => {
  const [isWithdrawal, setIsWithdrawal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkNew, setCheckNew] = useState('');
  const [isCheck, setIsCheck] = useState(true);
  const [err, setErr] = useState('');
  const dispatch = useDispatch();

  const WithdrawalModalHandler = () => {
    setIsWithdrawal(false);
  };

  const checkNewHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckNew(e.target.value);
    if (newPassword === e.target.value || e.target.value === '') {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  };

  const changePassword = () => {
    if (newPassword === '' || currentPassword === '') {
      dispatch(notify('비밀번호를 입력해주세요.'));
      return;
    }
    if (!isCheck) {
      dispatch(notify('비밀번호가 일치하지 않습니다.'));
      return;
    }
    const accessToken = localStorage.getItem('accessToken');
    apiAxios
      .patch(
        'users/me/password',
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        dispatch(notify('비밀번호 변경이 완료되었습니다.'));
        setCheckNew('');
        setNewPassword('');
        setCurrentPassword('');
      })
      .catch((err) => {
        if (err.response.status === 403) {
          dispatch(notify('이전 비밀번호가 잘못되었습니다.'));
        }
        if (err.response.status >= 500) {
          setErr(err.response.data.message);
        }
        console.log(err);
      });
  };

  return (
    <>
      {err === '' ? (
        <Container>
          {isWithdrawal ? (
            <WithdrawalModal WithdrawalModalHandler={WithdrawalModalHandler} />
          ) : (
            ''
          )}
          <PassWrapper>
            <InputWrapper>
              <div>이전 비밀번호</div>
              <input
                type={'password'}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
                onFocus={() => {
                  console.log('focused');
                  window.removeEventListener('keyup', keyupHandler);
                }}
                onBlur={() => {
                  console.log('blurred');
                  window.addEventListener('keyup', keyupHandler);
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <div>새 비밀번호</div>
              <input
                type={'password'}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                onFocus={() => {
                  console.log('focused');
                  window.removeEventListener('keyup', keyupHandler);
                }}
                onBlur={() => {
                  console.log('blurred');
                  window.addEventListener('keyup', keyupHandler);
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <div>새 비밀번호 확인</div>
              <input
                type="password"
                value={checkNew}
                onChange={checkNewHandler}
                onFocus={() => {
                  console.log('focused');
                  window.removeEventListener('keyup', keyupHandler);
                }}
                onBlur={() => {
                  console.log('blurred');
                  window.addEventListener('keyup', keyupHandler);
                }}
              />
            </InputWrapper>
            <Warning style={isCheck ? { display: 'none' } : {}}>
              비밀번호가 일치하지 않습니다.
            </Warning>
          </PassWrapper>

          <ButtonWrapper style={{ marginTop: '15px' }}>
            <button onClick={changePassword}>비밀번호 변경</button>

            <div
              onClick={() => {
                setIsWithdrawal(true);
              }}
              onFocus={() => {
                console.log('focused');
                window.removeEventListener('keyup', keyupHandler);
              }}
              onBlur={() => {
                console.log('blurred');
                window.addEventListener('keyup', keyupHandler);
              }}
            >
              회원 탈퇴
            </div>
          </ButtonWrapper>
        </Container>
      ) : (
        <ServerErr err={err} />
      )}
    </>
  );
};

export default Security;
