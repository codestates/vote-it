import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 256px;
  height: 70vh;
  max-width: 256px;
  margin: 16px;
  border-radius: 8px;
  /* border: 1px solid seagreen; */
  background-color: #eee;
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
    background-color: var(--main-color-tint);
  }
  &.active {
    color: #fff;
    background-color: var(--main-color);
  }
`;

interface IProps {
  content: number;
  setContent: Dispatch<SetStateAction<number>>;
}

const Sidebar: React.FunctionComponent<IProps> = ({ content, setContent }) => {
  const handleClick =
    (key: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      setContent(key);
    };
  return (
    <Container>
      <Button
        className={`${content === 0 ? 'active' : ''}`}
        onClick={handleClick(0)}
      >
        프로필
      </Button>
      <Button
        className={`${content === 1 ? 'active' : ''}`}
        onClick={handleClick(1)}
      >
        활동 기록
      </Button>
      <Button
        className={`${content === 2 ? 'active' : ''}`}
        onClick={handleClick(2)}
      >
        보안
      </Button>
    </Container>
  );
};

export default Sidebar;
