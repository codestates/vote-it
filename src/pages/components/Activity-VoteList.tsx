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
  ${(props) => (props.sub ? 'border-bottom: 1px solid #ddd;' : '')}
  ${(props) => (props.sub ? ':hover{ background-color: #eee; }' : '')}
    /* .center {
    text-align: center;
  } */ .votelist-id {
    margin: 0 8px;
    width: 64px;
    line-height: 36px;
  }
  .votelist-child {
    margin-right: 8px;
    padding: 8px;
    text-align: left;
    width: 100%;
    a {
      color: black;
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
      id: 1,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2021-08-05T09:51:31',
    },
    {
      id: 2,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2021-08-05T09:51:31',
    },
    {
      id: 3,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2021-08-05T09:51:31',
    },
    {
      id: 6,
      subject: '투표글 제목입니다.',
      isPrivate: true,
      expirationDate: '2021-08-05T09:51:31',
    },
    {
      id: 7,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 8,
      subject: '투표글 제목입니다.',
      isPrivate: true,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 11,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 13,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 15,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 16,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 17,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 18,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 19,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 20,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 21,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 22,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 23,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 24,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 25,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 26,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 27,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 28,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 29,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 30,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 31,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 32,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 33,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 34,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 35,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 36,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 37,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 38,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 39,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 123,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 124,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 125,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
    {
      id: 126,
      subject: '투표글 제목입니다.',
      isPrivate: false,
      expirationDate: '2022-08-05T09:51:31',
    },
  ]);

  const [list, setList] = useState<object[]>([]);
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
        // 배열 불러오기
        console.log('ok');
      }
    }
  }, [dummy]);

  console.log(list.length);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll]);
  return (
    <Container>
      <ChildWrapper sub={false}>
        <div className="votelist-id">ID</div>
        <div className="votelist-child">제목</div>
        <div className="votelist-expiration">만료날짜</div>
      </ChildWrapper>
      <Divider />
      <ScrollWrapper ref={scrollRef}>
        {dummy.map((v) => {
          return (
            <ChildWrapper key={v.id} sub>
              <div className="votelist-id">{v.id}</div>
              <div className="votelist-child">
                <Link to="#">{v.subject}</Link>
              </div>
              <div className="votelist-expiration">
                {v.expirationDate.split('T').join(' ')}
              </div>
            </ChildWrapper>
          );
        })}
        <Divider />
        무한스크롤
        <Divider />
      </ScrollWrapper>
    </Container>
  );
};

export default VoteList;
