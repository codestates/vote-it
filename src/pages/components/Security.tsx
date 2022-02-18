import { useState } from 'react';
import styled from 'styled-components';
import { WithdrawalModal } from './WithdrawalModal';
import apiAxios from '../../utils/apiAxios';

const Container = styled.div`
  grid-column: span 9;
  display: flex;
  flex-direction: column;
  flex: 2 0 auto;
  padding: 8px;
  /* border: 1px solid green; */

  @media only screen and (max-width: 1200px) {
    grid-column: span 11;
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
  margin: 4px;
  > div {
    flex: 1 0 216px;
    width: 150px;
    text-align: left;
    margin-right: 8px;
  }
  > input {
    width: 150px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  button {
    text-align: center;
    margin-right: 20px;
    border: 1px solid black;
    min-width: 100px;
    padding: 5px 0;
    /* color: red; */
    border-radius: 10px;
    background-color: #eee;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: #dbdbdb;
    }
  }
  div {
    text-align: center;
    border: 1px solid black;
    min-width: 100px;
    padding: 5px 0;
    color: red;
    border-radius: 10px;
    margin-right: 20%;
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

interface IProps {}

const Security: React.FunctionComponent<IProps> = () => {
  const [isWithdrawal, setIsWithdrawal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkNew, setCheckNew] = useState('');
  const [isCheck, setIsCheck] = useState(true);

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
      alert('비밀번호를 입력해주세요.');
      return;
    }
    if (!isCheck) {
      alert('비밀번호가 일치하지 않습니다');
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
        alert('비밀번호 변경이 완료되었습니다');
        setCheckNew('');
        setNewPassword('');
        setCurrentPassword('');
      })
      .catch((err) => alert(err));
  };

  return (
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
          />
        </InputWrapper>
        <InputWrapper>
          <div>새 비밀번호 확인</div>
          <input type="password" value={checkNew} onChange={checkNewHandler} />
        </InputWrapper>
        <Warning style={isCheck ? { display: 'none' } : {}}>
          비밀번호가 일치하지 않습니다.
        </Warning>
      </PassWrapper>
      <ButtonWrapper>
        <button onClick={changePassword}>비밀번호 변경</button>
        <div
          onClick={() => {
            setIsWithdrawal(true);
          }}
        >
          회원 탈퇴
        </div>
      </ButtonWrapper>
    </Container>
  );
};

export default Security;
