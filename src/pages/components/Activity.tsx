import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2 0 auto;
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
  border: 1px solid green;
`;

interface IProps {}

const Activity: React.FunctionComponent<IProps> = () => {
  const [actMenu, setActMenu] = useState(0);
  const handleClick =
    (key: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      setActMenu(key);
    };
  const menu = [<div>투표글임</div>, <div>활동기록임</div>];

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
