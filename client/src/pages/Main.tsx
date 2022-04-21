import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import FloatBtn from '../components/FloatBtn';
import { LoadingVoteCard } from '../components/LoadingVoteCard';
import { VoteCard } from '../components/VoteCard';
import { notify } from '../modules/notification';
import { Poll, Polls } from '../utils/apiAxios';
import { MainEmpty } from './MainEmpty';
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

export const Main = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scrollTopBtnIsVisible, setScrollTopBtnIsVisible] = useState(false);
  const isGotAllPolls = useRef(false);
  const cursor = useRef<number | undefined>(undefined);
  const dispatch = useDispatch();

  const loadingPolls = useCallback(async () => {
    setIsLoading(true);
    try {
      const { polls: loadedPolls, nextCursor } = await Polls.getPagination(
        12,
        cursor.current,
      );
      setPolls((prevPolls) => [...prevPolls, ...loadedPolls]);
      if (nextCursor === undefined) {
        isGotAllPolls.current = true;
        dispatch(notify('모든 투표를 불러왔습니다.'));
        return;
      }
      cursor.current = nextCursor;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response !== undefined) {
          if (error.response.status >= 500) {
            setServerError(error.response.data.message);
          } else {
            console.log(error.response.data.message);
          }
          return;
        }
        if (error.request !== undefined) {
          console.log(error.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    loadingPolls();
  }, [loadingPolls]);

  useEffect(() => {
    const loadingPollsWhenScroll = () => {
      const { innerHeight } = window;
      const { scrollHeight } = document.body;
      const { scrollTop } = document.documentElement;
      if (
        isLoading ||
        isGotAllPolls.current ||
        Math.round(scrollTop + innerHeight) <= scrollHeight
      ) {
        return;
      }
      loadingPolls();
    };
    if (isGotAllPolls.current) {
      window.removeEventListener('scroll', loadingPollsWhenScroll, true);
      return;
    }
    window.addEventListener('scroll', loadingPollsWhenScroll, true);
    return () => {
      window.removeEventListener('scroll', loadingPollsWhenScroll, true);
    };
  }, [isLoading, loadingPolls]);

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

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (serverError !== '') {
    return <ServerErr err={serverError} />;
  }
  if (polls.length === 0) {
    return <MainEmpty />;
  }
  return (
    <div>
      <MainOuter>
        <MainContainer>
          {polls.map((poll) => (
            <VoteCard
              key={poll.id}
              id={poll.id}
              subject={poll.subject}
              author={poll.author.nickname}
              createdAt={poll.createdAt}
              expirationDate={poll.expirationDate}
              picture={poll.picture}
              participatedCount={poll.participatedCount}
            />
          ))}
        </MainContainer>
        {scrollTopBtnIsVisible && (
          <div onClick={scrollToTop}>
            <FloatBtn />
          </div>
        )}
      </MainOuter>
      {isLoading && <LoadingVoteCard />}
    </div>
  );
};
