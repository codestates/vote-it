import styled from 'styled-components';

const Container = styled.div`
  grid-column: span 9;

  @media only screen and (max-width: 1200px) {
    grid-column: span 11;
  }

  @media only screen and (max-width: 500px) {
    margin-top: 50px;
    grid-column: span 6;
  }
`;

interface IProps {}

const Profile: React.FunctionComponent<IProps> = () => {
  return (
    <Container>
      <div>이메일</div>
      <div>이메일 보여줘야함</div>
      <div>닉네임</div>
      <div>닉네임 보여줘야함</div>
      <img src={''} alt="프사" />
      <button>프로필 업데이트</button>
    </Container>
  );
};

export default Profile;
