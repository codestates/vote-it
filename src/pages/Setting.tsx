import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Sidebar, Profile, Activity, Security } from './components';
import { FaBars } from 'react-icons/fa';

const Outer = styled.div`
  padding-top: 48px;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 24px;
  align-items: center;

  /* @media only screen and (max-width: 1200px) {
    width: 768px;
  } */

  /* @media only screen and (max-width: 768px) {
    width: 500px;
  } */

  @media only screen and (max-width: 500px) {
    width: 360px;
    grid-template-columns: repeat(6, 1fr);
    column-gap: 16px;
  }

  padding-bottom: 20px;
`;

const SideBarBtn = styled.div`
  position: absolute;
  line-height: 55px;
  top: 0px;
  left: 20px;
  z-index: 999;
  width: 40px;
  height: 40px;
  /* border-radius: 30px; */
  /* background-color: #5d6dbe; */
  /* box-shadow: -2px -2px 4px #f8f8f8, 3px 3px 6px rgb(184, 184, 184); */
  cursor: pointer;
  display: none;

  @media only screen and (max-width: 500px) {
    display: block;
  }
`;

// const Content = styled.div`
//   flex: 5 0 auto;
// `;

interface IProps {
  //   isLogin: boolean;
  //   setIsLogin?: Dispatch<SetStateAction<boolean>>;
}

const Setting: React.FunctionComponent<IProps> = () => {
  const [content, setContent] = useState<number>(0);
  const [isSideBar, setIsSidaBar] = useState('none');
  const menu = [<Profile />, <Activity />, <Security />];

  useEffect(() => {
    const category = localStorage.getItem('setting'); // ex: "profile"
    const idx = ['profile', 'activity', 'security'];
    if (category !== null) setContent(idx.indexOf(category));
  }, []);

  const SideBarHandler = () => {
    if (isSideBar === 'none') {
      setIsSidaBar('flex');
    } else {
      setIsSidaBar('none');
    }
  };

  return (
    <Outer
      onClick={() => {
        setIsSidaBar('none');
      }}
    >
      <SideBarBtn
        onClick={(e) => {
          e.stopPropagation();
          SideBarHandler();
        }}
      >
        <FaBars />
      </SideBarBtn>
      <Container>
        <Sidebar
          content={content}
          setContent={setContent}
          isSideBar={isSideBar}
          setIsSideBar={setIsSidaBar}
        />
        {menu[content]}
      </Container>
    </Outer>
  );
};

export default Setting;
