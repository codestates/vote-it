import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  .votelist-child {
    margin: 0 8px;
    padding: 8px;
    text-align: left;
    width: 100%;
    a {
      color: var(--font);
      text-decoration: none;
      :hover {
        text-decoration: underline;
      }
    }
  }
  .votelist-expiration {
    width: 144px;
    margin: 0 8px;
    line-height: 36px;
    white-space: pre;
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
  const [dummy, setDummy] = useState([
    {
      id: 0,
      message: 'message1',
      createdAt: '2022-02-24T16:31:00',
    },
    {
      id: 1,
      message: 'message1',
      createdAt: '2022-02-22T13:31:00',
    },
    {
      id: 2,
      message: 'message1',
      createdAt: '2022-02-22T13:13:00',
    },
    {
      id: 3,
      message: 'message1',
      createdAt: '2022-02-22T13:07:00',
    },
    {
      id: 4,
      message: 'message1',
      createdAt: '2022-02-21T09:21:00',
    },
    {
      id: 5,
      message: 'message1',
      createdAt: '2022-02-21T09:21:00',
    },
    {
      id: 6,
      message: 'message1',
      createdAt: '2022-02-21T09:21:00',
    },
    {
      id: 7,
      message: 'message1',
      createdAt: '2022-02-20T09:21:00',
    },
    {
      id: 8,
      message: 'message1',
      createdAt: '2022-02-20T09:21:00',
    },
    {
      id: 9,
      message: 'message1',
      createdAt: '2022-02-20T09:21:00',
    },
    {
      id: 10,
      message: 'message1',
      createdAt: '2022-02-19T09:21:00',
    },
    {
      id: 11,
      message: 'message1',
      createdAt: '2022-02-19T09:21:00',
    },
    {
      id: 12,
      message: 'message1',
      createdAt: '2022-02-19T09:21:00',
    },
    {
      id: 13,
      message: 'message1',
      createdAt: '2022-02-19T09:21:00',
    },
    {
      id: 14,
      message: 'message1',
      createdAt: '2022-02-19T09:21:00',
    },
    {
      id: 15,
      message: 'message1',
      createdAt: '2022-02-18T09:21:00',
    },
    {
      id: 16,
      message: 'message1',
      createdAt: '2022-02-18T09:21:00',
    },
    {
      id: 17,
      message: 'message1',
      createdAt: '2022-02-22T13:32:00',
    },
    {
      id: 18,
      message: 'message1',
      createdAt: '2022-02-22T13:31:00',
    },
    {
      id: 19,
      message: 'message1',
      createdAt: '2022-02-22T13:13:00',
    },
    {
      id: 20,
      message: 'message1',
      createdAt: '2022-02-22T13:07:00',
    },
    {
      id: 21,
      message: 'message1',
      createdAt: '2022-02-21T09:21:00',
    },
    {
      id: 22,
      message: 'message1',
      createdAt: '2022-02-21T09:21:00',
    },
    {
      id: 23,
      message: 'message1',
      createdAt: '2022-02-21T09:21:00',
    },
    {
      id: 24,
      message: 'message1',
      createdAt: '2022-02-20T09:21:00',
    },
    {
      id: 25,
      message: 'message1',
      createdAt: '2022-02-20T09:21:00',
    },
    {
      id: 26,
      message: 'message1',
      createdAt: '2022-02-20T09:21:00',
    },
    {
      id: 27,
      message: 'message1',
      createdAt: '2022-02-19T09:21:00',
    },
    {
      id: 28,
      message: 'message1',
      createdAt: '2022-02-19T09:21:00',
    },
    {
      id: 29,
      message: 'message1',
      createdAt: '2022-02-19T09:21:00',
    },
    {
      id: 30,
      message: 'message1',
      createdAt: '2022-02-19T09:21:00',
    },
    {
      id: 31,
      message: 'message1',
      createdAt: '2022-02-19T09:21:00',
    },
    {
      id: 32,
      message: 'message1',
      createdAt: '2022-02-18T09:21:00',
    },
    {
      id: 33,
      message: 'message1',
      createdAt: '2022-02-18T09:21:00',
    },
  ]);

  const [list, setList] = useState([...dummy.slice(0, 15)]);
  const [page, setPage] = useState(15);
  const [isLoading, setIsLoading] = useState(false);
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
      if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
        // 배열 불러오기 Promise 동기처리 => 이후 ajax 요청으로 변환
        // Promise.resolve()
        //   .then(() => {
        //     setIsLoading(true);
        //   })
        //   .then(() => {
        setList([...list, ...dummy.slice(page, page + 5)]);
        setPage(page + 5);
        // })
        // .then(() => {
        //   setIsLoading(false);
        // });
      }
    }
  }, [list, page, dummy]);

  // console.log(list.length);

  // useEffect(() => {
  //   setList([dummy[0]]);
  // }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll]);

  function timeForToday(value: string): string {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60,
    );
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  }

  return (
    <Container>
      <ChildWrapper sub={false}>
        <div className="votelist-child">메세지</div>
        <div className="votelist-expiration">시간</div>
      </ChildWrapper>
      <Divider />
      <ScrollWrapper ref={scrollRef}>
        {list.map((v) => {
          return (
            <ChildWrapper key={v.id} sub>
              <div className="votelist-child">
                <Link to="#">{v.message}</Link>
              </div>
              <div className="votelist-expiration">
                {timeForToday(v.createdAt)}
              </div>
            </ChildWrapper>
          );
        })}
        <Divider />
        {isLoading ? '무한스크롤' : null}
        {/* <Divider /> */}
      </ScrollWrapper>
    </Container>
  );
};

export default VoteList;
