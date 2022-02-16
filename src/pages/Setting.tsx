import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Sidebar, Profile, Activity, Security } from './components';

const Outer = styled.div`
  padding-top: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 1024px;
  display: flex;
  align-items: center;
  border: 1px solid red;

  /* @media only screen and (max-width: 1200px) {
    width: 800px;
  }

  @media only screen and (max-width: 768px) {
    width: 500px;
  }

  @media only screen and (max-width: 480px) {
    width: 360px;
    column-gap: 16px;
  } */

  padding-bottom: 20px;
`;

const Content = styled.div`
  flex: 5 0 auto;
`;

interface IProps {
  //   isLogin: boolean;
  //   setIsLogin?: Dispatch<SetStateAction<boolean>>;
}

const Setting: React.FunctionComponent<IProps> = () => {
  const [content, setContent] = useState<number>(0);
  const menu = [<Profile />, <Activity />, <Security />];

  useEffect(() => {
    const category = localStorage.getItem('setting'); // ex: "profile"
    const idx = ['profile', 'activity', 'security'];
    if (category !== null) setContent(idx.indexOf(category));
  }, []);
  return (
    <Outer>
      <Container>
        <Sidebar content={content} setContent={setContent} />
        {menu[content]}
      </Container>
    </Outer>
  );
};

export default Setting;
