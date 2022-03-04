import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../modules';
import apiAxios from '../../utils/apiAxios';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin: 8px;
`;

const ChildWrapper = styled.div<{ sub: boolean }>`
  display: flex;
  ${(props) =>
    props.sub ? 'border-bottom: 1px solid var(--border-lighter);' : ''}
  ${(props) =>
    props.sub ? ':hover{ background-color: var(--box-bg-lighter) }' : ''}
    /* .center {
    text-align: center;
  } */ 
  .vote_box {
    display: flex;
    width: 75%;
  }
  .votelist-id {
    margin: 0 8px;
    width: 64px;
    line-height: 36px;
  }
  .votelist-child {
    margin-right: 8px;
    padding: 8px;
    text-align: left;
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    a {
      color: var(--font);
      text-decoration: none;
      :hover {
        text-decoration: underline;
      }
    }
  }
  .votelist-expiration {
    width: 180px;
    margin: 0 8px;
    line-height: 36px;
    white-space: pre;
    display: flex;
    justify-content: left;
  }
  @media only screen and (max-width: 1200px) {
    .vote_box {
      width: 70%;
    }
  }
  @media only screen and (max-width: 1000px) {
    .vote_box {
      width: 60%;
    }
  }
  @media only screen and (max-width: 600px) {
    .vote_box {
      width: 50%;
    }
  }
  @media only screen and (max-width: 500px) {
    flex-direction: column;
    .votelist-expiration {
      font-size: small;
      width: 90%;
      display: flex;
      justify-content: right;
    }
  }
`;

const ScrollWrapper = styled.div`
  overflow-y: auto;
`;

const Divider = styled.div`
  height: 0px;
  border-bottom: 1px solid #bbb;
  margin: 4px 0;
`;

interface IProps {}

//subject, isPrivate, expirationDate
const VoteList: React.FunctionComponent<IProps> = () => {
  interface Poll {
    id: number;
    createdAt: string;
    subject: string;
    isPrivate: boolean;
    isPlural: boolean;
    expirationDate: string;
    picture: string;
  }
  const [polls, setPolls] = useState<Poll[]>([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsLoading(true);
    apiAxios
      .get(`users/me/polls?offset=${offset}&limit=20`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setPolls(res.data.myPolls);
        setIsLoading(false);
        setOffset(20);
      });
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((): void => {
    const innerHeight = scrollRef.current?.clientHeight; // 브라우저 창 내용 크기 (스크롤 포함 x)
    const scrollHeight = scrollRef.current?.scrollHeight; // 브라우저 총 내용 크기 (스크롤 포함)
    const scrollTop = scrollRef.current?.scrollTop; // 현 스크롤바 위치

    if (
      scrollTop !== undefined &&
      innerHeight !== undefined &&
      scrollHeight !== undefined
    ) {
      if (Math.round(scrollTop + innerHeight) >= scrollHeight && !isEnd) {
        const accessToken = localStorage.getItem('accessToken');
        setIsLoading(true);
        apiAxios
          .get(`users/me/polls?offset=${offset}&limit=20`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            if (res.data.myPolls.length === 0) {
              setIsLoading(false);
              setIsEnd(true);
              return;
            }
            setPolls([...polls, ...res.data.myPolls]);
            setIsLoading(false);
            setOffset(offset + 20);
          });
      }
    }
  }, [isEnd, offset, polls]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll]);

  const isDark = useSelector((state: RootState) => state.login.isDark);

  const timeMaker = (value: string) => {
    if (!value) return '';
    let date = new Date(value);
    let dateArr = date.toLocaleString().split('. ');
    let timeArr = date.toLocaleString().split(' ');
    return (
      `${dateArr[0]}년 ${dateArr[1]}월 ${dateArr[2]}일 ` +
      `${timeArr[3]} ${
        timeArr[4].split(':')[0] + ':' + timeArr[4].split(':')[1]
      }`
    );
  };

  return (
    <Container>
      <ChildWrapper sub={false}>
        <div style={{ width: '100%', display: 'flex' }}>
          <div className="votelist-id">ID</div>
          <div className="votelist-child">제목</div>
          <div className="votelist-expiration">게시날짜</div>
        </div>
      </ChildWrapper>
      <Divider />
      <ScrollWrapper ref={scrollRef}>
        {polls.length === 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={
                isDark
                  ? `${process.env.PUBLIC_URL}/votelist-dark.png`
                  : `${process.env.PUBLIC_URL}/votelist-light.png`
              }
              style={{
                minWidth: '250px',
                width: '50%',
                height: 'auto',
              }}
              alt="voteList"
            />
          </div>
        ) : (
          polls.map((v) => {
            return (
              <ChildWrapper
                onClick={() => {
                  navigate(`/vote/${v.id}`, { state: v.id });
                }}
                key={v.id}
                sub
              >
                <div className="vote_box">
                  <div className="votelist-id">{v.id}</div>
                  <div className="votelist-child">{v.subject}</div>
                </div>
                <div className="votelist-expiration">
                  {timeMaker(v.createdAt)}
                </div>
              </ChildWrapper>
            );
          })
        )}
        {/* <Divider /> */}
        {isLoading ? '무한스크롤' : null}
        {/* <Divider /> */}
      </ScrollWrapper>
    </Container>
  );
};

export default VoteList;
