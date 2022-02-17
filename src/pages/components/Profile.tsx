import { useState } from 'react';
import styled from 'styled-components';
import { ImageUpload } from '../../components/ImageUpload';

const Container = styled.div`
  grid-column: span 8;

  @media only screen and (max-width: 1200px) {
    grid-column: span 10;
  }

  @media only screen and (max-width: 500px) {
    margin-top: 50px;
    grid-column: span 5;
  }
`;

const ViewBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
`;

const ViewName = styled.div`
  flex: 1;
  justify-content: left;
  align-items: center;
  /* font-size: large; */
`;

const ViewValue = styled.div`
  flex: 1;
  justify-content: right;
  align-items: center;
  font-size: large;
`;

const ViewInput = styled.input`
  flex: 1;
  display: flex;
  justify-content: center;
  height: 50px;
  align-items: center;
  font-size: large;
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  width: 100%;
  height: 80px;
`;

const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 50px;
  border: 1px solid black;
  border-radius: 20px;
  color: white;
  background: #5d6dbe;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: #324ac0;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  width: 100%;
  height: 100px;
`;

interface IImgProps {
  src: string;
}

const ImgBox = styled.div<IImgProps>`
  width: 100px;
  height: 100px;
  display: flex;
  border: 1px dashed black;
  justify-content: center;
  border-radius: 100px;
  align-items: center;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
`;

interface IProps {}

interface IuserInfo {
  id: number;
  email: string;
  nickname: string;
  picture: string;
}

const Profile: React.FunctionComponent<IProps> = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState<IuserInfo>({
    id: 1,
    email: 'useremail01@gmail.com',
    nickname: 'username',
    picture:
      'https://w.namu.la/s/5e8f11a4acfe69bcfea691be09c0a89994a41a1fc06fd2d6b4562d346529ca59061b3998c8da662b83c462a0a81a893fd4551dcbf2d1b0c19d670b55ece8f24e8f5b2b631a8b89121c4c3aad755d4c2d44273656184ff7047a910458fdaa9080',
  });

  const UserInfoHandler = () => {
    if (username === '') {
      return;
    }
    setUserInfo({ ...userInfo, nickname: username });
  };

  return (
    <Container>
      <ImgContainer>
        <ImgBox src={userInfo.picture}>
          <ImageUpload />
        </ImgBox>
      </ImgContainer>
      <ViewBox>
        <ViewName>이메일</ViewName>
        <ViewValue>{userInfo.email}</ViewValue>
      </ViewBox>
      <ViewBox>
        <ViewName>닉네임</ViewName>
        {isUpdating ? (
          <ViewInput
            type="text"
            placeholder={userInfo.nickname}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        ) : (
          <ViewValue>{userInfo.nickname}</ViewValue>
        )}
      </ViewBox>
      <BtnBox
        onClick={() => {
          setIsUpdating(!isUpdating);
        }}
      >
        <Btn onClick={UserInfoHandler}>
          {isUpdating ? '완료' : '프로필 업데이트'}
        </Btn>
      </BtnBox>
    </Container>
  );
};

export default Profile;
