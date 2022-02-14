import React, { useState } from 'react';
import styled from 'styled-components';
import { VoteCard } from '../components/VoteCard';

const MainOuter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const MainContainer = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  align-items: center;

  @media only screen and (max-width: 1200px) {
    width: 800px;
  }

  @media only screen and (max-width: 768px) {
    width: 500px;
  }

  @media only screen and (max-width: 501px) {
    width: 360px;
    column-gap: 16px;
    grid-template-columns: repeat(6, 1fr);
  }

  padding-bottom: 20px;
`;

export const Main = () => {
  const [list, setList] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  ]);

  return (
    <MainOuter>
      <MainContainer>
        {list.map((el, idx) => {
          return <VoteCard key={idx} id={el} />;
        })}
      </MainContainer>
    </MainOuter>
  );
};
