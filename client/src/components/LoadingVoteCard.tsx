import React from 'react';
import styled from 'styled-components';
import { TitleBox, StyledBody } from './VoteCard';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
const LoadingContainer = styled.div`
  grid-column: span 3;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  margin-top: 20px;
  background: var(--box-bg);
  box-shadow: -2px -2px 4px var(--box-shadow),
    3px 3px 8px var(--box-shadow-darker);

  @media only screen and (max-width: 1200px) {
    grid-column: span 4;
  }

  @media only screen and (max-width: 768px) {
    grid-column: span 6;
  }

  @media only screen and (max-width: 500px) {
    flex-direction: row;
    min-height: 200px;
  }
`;

const TitleCover = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  flex: 1 1 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
  width: 100%;
  @media only screen and (max-width: 501px) {
    /* display: none; */
    opacity: 0;
  }
`;

const TitleView = styled.div`
  width: 150px;
  height: 30px;
  border-radius: 20px;
  filter: blur(8px);
`;

const StyledView = styled.div`
  width: 150px;
  height: 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  filter: blur(8px);
`;

export const LoadingVoteCard = () => {
  const isDark = useSelector((state: RootState) => state.login.isDark);
  return (
    <div>
      <img
        src={
          isDark
            ? `${process.env.PUBLIC_URL}/Infinity-dark.gif`
            : `${process.env.PUBLIC_URL}/Infinity-light.gif`
        }
        alt="mainLoading"
      />
    </div>

    // <LoadingContainer>
    //   <TitleBox>
    //     <TitleCover>
    //       <TitleView>title입니다~</TitleView>
    //     </TitleCover>
    //   </TitleBox>
    //   <StyledBody>
    //     <StyledView>참여인원 loading~ 명</StyledView>
    //     <StyledView>시작일 loading~</StyledView>
    //     <StyledView>마감일 loading~~</StyledView>
    //     <StyledView>작성자 loading~~</StyledView>
    //   </StyledBody>
    // </LoadingContainer>
  );
};
