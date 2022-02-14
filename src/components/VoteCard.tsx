import React from 'react';
import styled from 'styled-components';

const VoteCardContainer = styled.div`
  grid-column: span 3;
  border: 1px solid #dbdbdb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  margin-top: 20px;
  box-shadow: rgb(0 0 0 / 20%) 0px 5px 5px -3px,
    rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px;

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

const TitleBox = styled.div`
  background-image: url('https://cdn.discordapp.com/attachments/940138951770001421/940774921255129108/vote-it_LOGO1.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 70% 90%;
  width: 100%;
  flex: 1 1 200px;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-shadow: -2px 0 #fff, 0 2px #fff, 2px 0 #fff, 0 -2px #fff;
  @media only screen and (max-width: 500px) {
    border-bottom: 0;
    border-right: 1px solid #dbdbdb;
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

const StyledBody = styled.div`
  flex: 1 1 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  > div {
    padding: 5px 0;
  }
`;

const HiddenTitle = styled.div`
  font-size: large;
  @media only screen and (min-width: 501px) {
    display: none;
  }
`;

const StyledNum = styled.div`
  @media only screen and (min-width: 501px) {
    font-size: large;
    font-weight: bold;
  }
`;

const StyledDate = styled.div``;

const StyledName = styled.div`
  font-size: small;
`;

interface Iprops {
  id: number;
}

export const VoteCard = ({ id }: Iprops) => {
  return (
    <VoteCardContainer>
      <TitleBox>
        <TitleCover>title</TitleCover>
      </TitleBox>
      <StyledBody>
        <HiddenTitle>title</HiddenTitle>
        <StyledNum>참여인원 45명</StyledNum>
        <StyledDate>시작일 ---</StyledDate>
        <StyledDate>마감일 ---</StyledDate>
        <StyledName>이름</StyledName>
      </StyledBody>
    </VoteCardContainer>
  );
};
