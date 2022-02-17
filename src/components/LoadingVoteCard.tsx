import React from 'react';
import styled from 'styled-components';
import { TitleBox, StyledBody } from './VoteCard';

const LoadingContainer = styled.div`
  grid-column: span 3;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  margin-top: 20px;
  background: #fff;
  box-shadow: -2px -2px 4px #ececec, 3px 3px 8px rgb(184, 184, 184);

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
  background-color: #dbdbdb;
  border-radius: 20px;
`;

const StyledView = styled.div`
  width: 150px;
  height: 20px;
  background-color: #dbdbdb;
  border-radius: 20px;
  margin-bottom: 10px;
`;

export const LoadingVoteCard = () => {
  return (
    <LoadingContainer>
      <TitleBox>
        <TitleCover>
          <TitleView></TitleView>
        </TitleCover>
      </TitleBox>
      <StyledBody>
        <StyledView />
        <StyledView />
        <StyledView />
        <StyledView />
      </StyledBody>
    </LoadingContainer>
  );
};
