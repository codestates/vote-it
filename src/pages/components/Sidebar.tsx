import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { FaUser, FaHistory, FaKey } from 'react-icons/fa';

interface IContainerProps {
  isSideBar: string;
}

const Container = styled.div<IContainerProps>`
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  /* flex: 1 0 256px; */
  font-family: 'SUIT-Medium';
  height: 70vh;
  max-width: 256px;
  margin: 16px;
  border-radius: 8px;
  /* border: 1px solid seagreen; */
  background-color: #f3f3f3;

  @media only screen and (max-width: 768px) {
    grid-column: span 1;
  }

  @media only screen and (max-width: 500px) {
    position: absolute;
    top: 48px;
    margin: 0;
    grid-column: span 6;
    width: 100%;
    display: ${(props) => props.isSideBar};
  }
`;

const Button = styled.button`
  font-size: 16px;
  font-weight: bold;
  margin: 8px;
  height: 48px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  :hover {
    /* background-color: var(--main-color-tint); */
    color: var(--main-color);
  }
  &.active {
    color: #fff;
    background-color: var(--main-color);
  }
  > span {
    @media only screen and (max-width: 768px) {
      display: none;
    }

    @media only screen and (max-width: 500px) {
      display: inline;
    }
  }
`;

interface IProps {
  content: number;
  setContent: Dispatch<SetStateAction<number>>;
  isSideBar: string;
  setIsSideBar: Dispatch<SetStateAction<string>>;
}

const Sidebar: React.FunctionComponent<IProps> = ({
  content,
  setContent,
  isSideBar,
  setIsSideBar,
}) => {
  const handleClick =
    (key: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      setContent(key);
    };

  return (
    <Container
      isSideBar={isSideBar}
      onClick={() => {
        setIsSideBar('none');
      }}
    >
      <Button
        className={`${content === 0 ? 'active' : ''}`}
        onClick={handleClick(0)}
      >
        <FaUser />
        <span style={{ marginLeft: '10px' }}>프로필</span>
      </Button>
      <Button
        className={`${content === 1 ? 'active' : ''}`}
        onClick={handleClick(1)}
      >
        <FaHistory />
        <span style={{ marginLeft: '10px' }}>활동 기록</span>
      </Button>
      <Button
        className={`${content === 2 ? 'active' : ''}`}
        onClick={handleClick(2)}
      >
        <FaKey />
        <span style={{ marginLeft: '10px' }}>보안</span>
      </Button>
    </Container>
  );
};

export default Sidebar;
