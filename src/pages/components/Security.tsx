import { useState } from 'react';
import styled from 'styled-components';
import { WithdrawalModal } from './WithdrawalModal';

const Container = styled.div`
  grid-column: span 9;
  display: flex;
  flex-direction: column;
  flex: 2 0 auto;
  padding: 8px;
  font-family: 'SUIT-Light';
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
  margin: 20px;
  > div {
    flex: 1 0 216px;
    width: 150px;
    line-height: 30px;
    text-align: left;
    margin-right: 5px;
  }
  > input {
    &:focus {
      outline: none;
      border-bottom: 3px solid var(--main-color);
    }
    width: 250px;
    border: none;
    border-bottom: 3px solid #919191;
    padding: 5px;
    font-size: 15px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  button {
    &:hover {
      background-color: #7785c9;
    }
    min-width: 100px;
    margin-right: 20px;
    border-radius: 20px;
    height: 40px;
    color: white;
    background-color: #5d6dbe;
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

interface IProps {}

const Security: React.FunctionComponent<IProps> = () => {
  const [isWithdrawal, setIsWithdrawal] = useState(false);

  const WithdrawalModalHandler = () => {
    setIsWithdrawal(false);
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
          <input />
        </InputWrapper>
        <InputWrapper>
          <div>새 비밀번호</div>
          <input />
        </InputWrapper>
        <InputWrapper>
          <div>새 비밀번호 확인</div>
          <input />
        </InputWrapper>
      </PassWrapper>
      <ButtonWrapper style={{ marginTop: '15px' }}>
        <button>비밀번호 변경</button>
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
