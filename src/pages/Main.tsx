import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FloatBtn from '../components/FloatBtn';
import { VoteCard } from '../components/VoteCard';

const MainOuter = styled.div`
  padding-top: 48px;
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
  const [scrollY, setScrollY] = useState(0); //스크롤 값 저장
  const [btnStatus, setBtnStatus] = useState(false);

  const [list, setList] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
  ]);

  const handleFollow = () => {
    setScrollY(window.pageYOffset); //스크롤 값 저장
    if (scrollY > 100) setBtnStatus(true);
    //버튼 보이는 범위 설정
    else setBtnStatus(false);
  };

  const handleTop = () => {
    //클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setScrollY(0);
    setBtnStatus(false);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch(); //addEventListener 함수 실행
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });

  return (
    <MainOuter>
      <MainContainer>
        {list.map((el, idx) => {
          return <VoteCard key={idx} id={el} />;
        })}
      </MainContainer>
      {btnStatus ? (
        <div onClick={handleTop}>
          <FloatBtn />
        </div>
      ) : null}
    </MainOuter>
  );
};
