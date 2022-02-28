import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
// import logo from '../../public/vote-it_LOGO1.ico';

const Outer = styled.div`
  padding-top: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: var(--bg);
  height: calc(100vh - 300px);
`;

const EmptyContainer = styled.div`
  width: 1200px;
  /* display: grid; */
  /* grid-template-columns: repeat(12, 1fr); */
  /* column-gap: 24px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 1200px) {
    width: 768px;
  }

  @media only screen and (max-width: 768px) {
    width: 500px;
  }

  @media only screen and (max-width: 501px) {
    width: 360px;
    /* column-gap: 16px; */
    /* grid-template-columns: repeat(6, 1fr); */
  }

  padding-bottom: 20px;
`;

const StyledImg = styled.img`
  width: 20%;
  margin: 20px;
`;

const StyledDiv = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  font-size: large;
  font-weight: bold;
`;

const Btn = styled.div`
  width: 120px;
  height: 50px;
  cursor: pointer;
  background-color: var(--main-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-top: 20px;
  border-radius: 20px;

  &:hover {
    background-color: var(--main-color-tint);
  }
`;

export const MainEmpty = () => {
  return (
    <Outer>
      <EmptyContainer>
        <StyledImg src="https://cdn.discordapp.com/attachments/940138951770001421/940774921255129108/vote-it_LOGO1.png" />
        <StyledDiv>불러올 투표가 없습니다</StyledDiv>
        <StyledDiv>새로운 투표를 만들어 사람들의 의견을 들어보세요!!</StyledDiv>
        <NavLink to={'/createVote'}>
          <Btn>투표 만들러가기</Btn>
        </NavLink>
      </EmptyContainer>
    </Outer>
  );
};
