import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import FloatBtn from '../components/FloatBtn';
import { LoadingVoteCard } from '../components/LoadingVoteCard';
import { VoteCard } from '../components/VoteCard';
import { getPostList, IPost } from '../lib/postList';

const MainOuter = styled.div`
  padding-top: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f8f8f8;
`;

const MainContainer = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  align-items: center;

  @media only screen and (max-width: 1200px) {
    width: 768px;
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
  const [page, setPage] = useState<number>(1); //+
  const [posts, setPosts] = useState<IPost[]>(getPostList(1)); //+
  const [scrollY, setScrollY] = useState(0); //스크롤 값 저장
  const [btnStatus, setBtnStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = useCallback((): void => {
    //+
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;
    if (
      Math.round(scrollTop + innerHeight) > scrollHeight &&
      getPostList(page + 1).length !== 0
    ) {
      setIsLoading(true);
      setTimeout(() => {
        setPosts(posts.concat(getPostList(page + 1)));
        setPage(page + 1);
        setIsLoading(false);
      }, 2000);
    }
  }, [page, posts]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll]);

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
        {posts.map((el, idx) => {
          return <VoteCard key={idx} id={el.id} contents={el.subject} />;
        })}
        {isLoading
          ? [1, 2, 3, 4].map((el) => <LoadingVoteCard key={el} />)
          : ''}
      </MainContainer>
      {btnStatus ? (
        <div onClick={handleTop}>
          <FloatBtn />
        </div>
      ) : null}
    </MainOuter>
  );
};
