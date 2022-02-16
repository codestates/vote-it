import { useState } from 'react';
import styled from 'styled-components';
import { WithdrawalModal } from './WithdrawalModal';

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
  justify-content: center;
  button {
    min-width: 100px;
    margin-right: 10px;
    border-radius: 10px;
    border: 1px solid black;
  }
  div {
    text-align: center;
    border: 1px solid black;
    min-width: 100px;
    padding: 5px 0;
    color: red;
    border-radius: 10px;
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
      <ButtonWrapper>
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
