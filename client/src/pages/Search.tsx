import { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import FloatBtn from '../components/FloatBtn';
// import { LoadingVoteCard } from '../components/LoadingVoteCard';
import { VoteCard } from '../components/VoteCard';
import apiAxios from '../utils/apiAxios';
import { useDispatch } from 'react-redux';
import { notify } from '../modules/notification';
import ServerErr from './ServerErr';
import { useLocation } from 'react-router-dom';
import { EmptySearch } from './components/EmptySearch';

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

export const Search = () => {
  const [posts, setPosts] = useState<Post[]>([]); //+
  const [btnStatus, setBtnStatus] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [err, setErr] = useState('');
  const offset = useRef(0);
  const dispatch = useDispatch();
  const location = useLocation().state as string;
  const searchQuery = location;

  useEffect(() => {
    apiAxios
      .get(`/polls?offset=${0}&limit=${12}&query=${searchQuery}`)
      .then((res) => {
        setPosts(res.data.polls);
        offset.current += 12;
      })
      .catch((err) => {
        setErr(err.message);
      });
  }, [searchQuery]);

  const handleScroll = useCallback((): void => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;
    if (isEnd || Math.round(scrollTop + innerHeight) <= scrollHeight) {
      return;
    }
    apiAxios
      .get(`/polls?offset=${offset.current}&limit=${12}&query=${searchQuery}`)
      .then((res) => {
        if (res.data.polls.length === 0) {
          setIsEnd(true);
          dispatch(notify('모든 투표를 불러왔습니다.'));
          return;
        }
        setPosts([...posts, ...res.data.polls]);
        offset.current += 12;
      })
      .catch((err) => {
        if (err.response.status >= 500) {
          setErr(err.response.data.message);
        } else {
          console.log(err.response.data.message);
        }
      });
  }, [dispatch, isEnd, posts, searchQuery]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll]);

  const handleTop = () => {
    //클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setBtnStatus(false);
  };

  useEffect(() => {
    const handleFollow = () => {
      if (window.pageYOffset > 100) {
        setBtnStatus(true);
      } else {
        setBtnStatus(false);
      }
    };
    window.addEventListener('scroll', handleFollow);
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  }, []);

  if (err !== '') {
    return <ServerErr err={err} />;
  }
  if (posts.length === 0) {
    return <EmptySearch />;
  }
  return (
    <div>
      <MainOuter>
        <MainContainer>
          {posts.map((post) => (
            <VoteCard
              key={post.id}
              id={post.id}
              subject={post.subject}
              author={post.author.nickname}
              createdAt={post.createdAt}
              expirationDate={post.expirationDate}
              picture={post.picture}
              participatedCount={post.participatedCount}
            />
          ))}
        </MainContainer>
        {btnStatus && (
          <div onClick={handleTop}>
            <FloatBtn />
          </div>
        )}
      </MainOuter>
      {/* {isLoading && <LoadingVoteCard />} */}
    </div>
  );
};
