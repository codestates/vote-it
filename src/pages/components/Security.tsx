import styled from 'styled-components';

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
  }
  span {
    flex: 3 0 auto;
  }
  div {
    flex: 1 0 auto;
    text-align: right;
  }
`;

interface IProps {}

const Security: React.FunctionComponent<IProps> = () => {
  return (
    <Container>
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
        <span />
        <div>회원 탈퇴</div>
      </ButtonWrapper>
    </Container>
  );
};

export default Security;
