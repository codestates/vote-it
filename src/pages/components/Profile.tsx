import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { ImageUpload } from '../../components/ImageUpload';
import apiAxios from '../../utils/apiAxios';
import { useDispatch } from 'react-redux';
import { notify } from '../../modules/notification';

const Container = styled.div`
  font-family: 'SUIT-Light';
  margin-top: 25vh;
  grid-column: 4 / span 8;

  @media only screen and (max-width: 768px) {
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
  @media only screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const ViewName = styled.div`
  font-family: 'KOHIBaeumOTF';
  font-size: 20px;
  flex: 1;
  max-width: 300px;
  min-width: 100px;
  justify-content: left;
  align-items: center;
  /* font-size: large; */
`;

const ViewValue = styled.div`
  flex: 1;
  min-width: 200px;
  max-width: 250px;
  justify-content: right;
  align-items: center;
  font-size: large;
`;

const ViewInput = styled.input`
  &:focus {
    outline: none;
    border-bottom: 3px solid var(--main-color);
  }
  font-family: 'SUIT-Light';
  /* margin: auto; */
  max-width: 250px;
  min-width: 200px;
  flex: 1;
  display: flex;
  border: none;
  border-bottom: 3px solid #adadad;
  justify-content: right;
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
  font-family: 'SBAggroM';
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 50px;
  margin-top: 30px;
  border-radius: 20px;
  color: white;
  background: #5d6dbe;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: #7987d1;
  }
  @media only screen and (max-width: 500px) {
    font-size: 13px;
    width: 100px;
    height: 40px;
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
  const [err, setErr] = useState('');
  const [userInfo, setUserInfo] = useState<IuserInfo>({
    id: 1,
    email: 'useremail01@gmail.com',
    nickname: 'username',
    picture:
      'https://w.namu.la/s/5e8f11a4acfe69bcfea691be09c0a89994a41a1fc06fd2d6b4562d346529ca59061b3998c8da662b83c462a0a81a893fd4551dcbf2d1b0c19d670b55ece8f24e8f5b2b631a8b89121c4c3aad755d4c2d44273656184ff7047a910458fdaa9080',
  });

  // const state = useSelector((state: RootState) => state.notificationReducer)
  const dispatch = useDispatch();

  useEffect(() => {
    const access = localStorage.getItem('accessToken');
    apiAxios
      .get(`users/me`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then((res) => {
        if (!res.data.picture) {
          res.data.picture =
            'https://w.namu.la/s/5e8f11a4acfe69bcfea691be09c0a89994a41a1fc06fd2d6b4562d346529ca59061b3998c8da662b83c462a0a81a893fd4551dcbf2d1b0c19d670b55ece8f24e8f5b2b631a8b89121c4c3aad755d4c2d44273656184ff7047a910458fdaa9080';
        }
        setUserInfo(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const UserInfoHandler = () => {
    if (!isUpdating) {
      setIsUpdating(true);
      return;
    }
    if (username === '') {
      // setUsername('');
      setIsUpdating(false);
      return;
    }
    const accessToken = localStorage.getItem('accessToken');
    apiAxios
      .patch(
        'users/me',
        {
          nickname: username,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        setUserInfo({ ...userInfo, nickname: res.data.nickname });
        setUsername('');
        setIsUpdating(false);
        dispatch(notify('회원정보 수정이 완료되었습니다.'));
      })
      .catch((err) => {
        if (err.response.status === 500) {
          dispatch(notify('이미 존재하는 닉네임입니다.'));
        }
        if (err.response.status === 401) {
          dispatch(notify('유효하지 않은 접근입니다.'));
        }
      });
  };

  return (
    <Container>
      <ImgContainer>
        <ImgBox className="img" src={userInfo.picture}>
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
      <BtnBox>
        <Btn onClick={UserInfoHandler}>
          {isUpdating ? '완료' : '프로필 업데이트'}
        </Btn>
      </BtnBox>
    </Container>
  );
};

export default Profile;
