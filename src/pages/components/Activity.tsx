import { useState } from 'react';
import styled from 'styled-components';
import { VoteList, LogList } from '.';

const Container = styled.div`
  grid-column: span 9;
  display: flex;
  flex-direction: column;
  flex: 2 0 auto;

  @media only screen and (max-width: 1200px) {
    grid-column: span 11;
  }

  @media only screen and (max-width: 500px) {
    margin-top: 50px;
    grid-column: span 6;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex: 1 0 32px;
  max-width: 50%;
  /* border: 1px solid green; */
  div {
    flex: 1 0 0;
    text-align: center;
    line-height: 32px;
    border-bottom: 4px solid transparent;
    cursor: pointer;
    :hover {
      border-bottom: 4px solid var(--main-color-tint);
    }
    &.active {
      border-bottom: 4px solid var(--main-color);
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 5 0 512px;
  height: 512px;
  border: 1px solid black;
  margin-right: 24px;
  /* overflow-y: auto; */
`;

interface IProps {}

const Activity: React.FunctionComponent<IProps> = () => {
  const [actMenu, setActMenu] = useState(0);
  const handleClick =
    (key: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      setActMenu(key);
    };
  const menu = [<VoteList />, <LogList />];

  return (
    <Container>
      <MenuWrapper>
        <div className={actMenu === 0 ? 'active' : ''} onClick={handleClick(0)}>
          내 투표글
        </div>
        <div className={actMenu === 1 ? 'active' : ''} onClick={handleClick(1)}>
          활동 기록
        </div>
      </MenuWrapper>
      <ContentWrapper>{menu[actMenu]}</ContentWrapper>
    </Container>
  );
};

export default Activity;
