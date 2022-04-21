import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import FloatBtn from '../components/FloatBtn';
// import { LoadingVoteCard } from '../components/LoadingVoteCard';
import { VoteCard } from '../components/VoteCard';
import { notify } from '../modules/notification';
import { Polls } from '../utils/apiAxios';
import { EmptySearch } from './components/EmptySearch';
import ServerErr from './ServerErr';

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
  const [polls, setPolls] = useState<Post[]>([]); //+
  const [scrollTopBtnIsVisible, setScrollTopBtnIsVisible] = useState(false);
  const isGotAllPosts = useRef(false);
  const [err, setErr] = useState('');
  const dispatch = useDispatch();
  const searchQuery = useLocation().state as string;
  const cursor = useRef<number | undefined>(undefined);

  useEffect(() => {
    const searchPolls = async () => {
      try {
        const { polls: loadedPolls, nextCursor } = await Polls.getPagination(
          12,
          cursor.current,
          searchQuery,
        );
        cursor.current = nextCursor;
        setPolls(loadedPolls);
      } catch (err: any) {
        setErr(err.message);
      }
    };
    searchPolls();
  }, [searchQuery]);

  useEffect(() => {
    const loadingPollsWhenScroll = () => {
      const { innerHeight } = window;
      const { scrollHeight } = document.body;
      const { scrollTop } = document.documentElement;
      if (
        isGotAllPosts.current ||
        Math.round(scrollTop + innerHeight) <= scrollHeight
      ) {
        return;
      }
      const loadingPolls = async () => {
        try {
          const { polls: loadedPolls, nextCursor } = await Polls.getPagination(
            12,
            cursor.current,
            searchQuery,
          );
          setPolls((prevPolls) => [...prevPolls, ...loadedPolls]);
          if (nextCursor === undefined) {
            isGotAllPosts.current = true;
            dispatch(notify('모든 투표를 불러왔습니다.'));
            return;
          }
          cursor.current = nextCursor;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response !== undefined) {
              if (error.response.status >= 500) {
                setErr(error.response.data.message);
              } else {
                console.log(error.response.data.message);
              }
            }
            if (error.request !== undefined) {
              console.log(error.message);
            }
          }
        }
      };
      loadingPolls();
    };
    window.addEventListener('scroll', loadingPollsWhenScroll, true);
    return () => {
      window.removeEventListener('scroll', loadingPollsWhenScroll, true);
    };
  }, [dispatch, searchQuery]);

  //클릭하면 스크롤이 위로 올라가는 함수
  const handleTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const showTopBtnOnBottom = () => {
      if (window.pageYOffset > 100) {
        setScrollTopBtnIsVisible(true);
      } else {
        setScrollTopBtnIsVisible(false);
      }
    };
    window.addEventListener('scroll', showTopBtnOnBottom);
    return () => {
      window.removeEventListener('scroll', showTopBtnOnBottom);
    };
  }, []);

  if (err !== '') {
    return <ServerErr err={err} />;
  }
  if (polls.length === 0) {
    return <EmptySearch />;
  }
  return (
    <div>
      <MainOuter>
        <MainContainer>
          {polls.map((post) => (
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
        {scrollTopBtnIsVisible && (
          <div onClick={handleTop}>
            <FloatBtn />
          </div>
        )}
      </MainOuter>
      {/* {isLoading && <LoadingVoteCard />} */}
    </div>
  );
};
