import styled from 'styled-components';

const Container = styled.div`
  flex: 2 0 auto;
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
