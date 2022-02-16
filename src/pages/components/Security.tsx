import { useState } from 'react';
import styled from 'styled-components';
import { WithdrawalModal } from './WithdrawalModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2 0 auto;
  padding: 8px;
  border: 1px solid green;
`;

const PassWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
`;

const InputWrapper = styled.div`
  display: flex;
  margin: 4px;
  div {
    flex: 1 0 216px;
    width: 216px;
    text-align: right;
    margin-right: 8px;
  }
  input {
    flex: 2 0 auto;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  button {
    flex: 1 0 auto;
    margin-right: 10px;
    border-radius: 10px;
    border: 1px solid black;
  }
  span {
    flex: 10 0 auto;
  }
  div {
    text-align: center;
    border: 1px solid black;
    flex: 1 0 auto;
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
        <span />
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
