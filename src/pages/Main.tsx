import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import FloatBtn from '../components/FloatBtn';
import { LoadingVoteCard } from '../components/LoadingVoteCard';
import { VoteCard } from '../components/VoteCard';
import apiAxios from '../utils/apiAxios';
import { useDispatch } from 'react-redux';
import { notify } from '../modules/notification';
import ServerErr from './ServerErr';
import { MainEmpty } from './MainEmpty';

const MainOuter = styled.div`
  padding-top: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: var(--bg);
  transition: all 0.5s;
`;

const MainContainer = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  align-items: center;
  transition: all 0.5s;
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

interface Author {
  nickname: string;
}

interface Post {
  id: number;
  createdAt: string;
  subject: string;
  expirationDate: string;
  author: Author;
  picture: string | null;
  participatedCount: number;
}

export const Main = () => {
  const [posts, setPosts] = useState<Post[]>([]); //+
  const [scrollY, setScrollY] = useState(0); //스크롤 값 저장
  const [btnStatus, setBtnStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [err, setErr] = useState('');
  const [isEmply, setIsEmpty] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    apiAxios
      .get(`/polls?offset=${offset}&limit=${12}`)
      .then((res) => {
        setPosts(res.data.polls);
        setOffset(offset + 12);
        setIsLoading(false);

        if (res.data.polls.length === 0) {
          setIsEmpty(true);
        }
      })
      .catch((err) => {
        setErr(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = useCallback((): void => {
    //+
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;
    if (Math.round(scrollTop + innerHeight) > scrollHeight && !isEnd) {
      setIsLoading(true);
      apiAxios
        .get(`/polls?offset=${offset}&limit=${12}`)
        .then((res) => {
          if (res.data.polls.length === 0) {
            dispatch(notify('모든 투표를 불러왔습니다.'));
            setIsLoading(false);
            setIsEnd(true);
            return;
          }
          setTimeout(() => {
            setPosts([...posts, ...res.data.polls]);
            setOffset(offset + 12);
            setIsLoading(false);
          }, 1500);
        })
        .catch((err) => {
          if (err.response.status >= 500) {
            setErr(err.response.data.message);
          } else {
            console.log(err.response.data.message);
          }
          // alert(err)
        });
    }
  }, [dispatch, isEnd, offset, posts]);

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

  //   id : "",
  //   subject: "",
  //   authorId: "",
  //   isPrivate: "",
  //   createdAt: "",
  //   expirationDate: ""
  return (
    <>
      {err === '' ? (
        <>
          { isEmply ? (
            <MainEmpty />
          ) :
        <div>
          <MainOuter>
            <MainContainer>
              {posts.map((el, idx) => {
                return (
                  <VoteCard
                    key={idx}
                    id={el.id}
                    subject={el.subject}
                    author={el.author.nickname}
                    createdAt={el.createdAt}
                    expirationDate={el.expirationDate}
                    picture={el.picture}
                    participatedCount={el.participatedCount}
                  />
                );
              })}
            </MainContainer>
            {btnStatus ? (
              <div onClick={handleTop}>
                <FloatBtn />
              </div>
            ) : null}{' '}
          </MainOuter>
          {isLoading ? <LoadingVoteCard /> : ''}
        </div>}
        </>
      ) : (
        <ServerErr err={err} />
      )}
    </>
  );
};
