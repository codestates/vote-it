import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../fonts/font.css';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';

const Canvas = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100vw;
  z-index: 998;
  /* background-color: aliceblue; */
  opacity: 0;
`;

const Container = styled.div`
  position: fixed;
  top: 48px;
  /* transform: translate(-50%, 32px); */
  /* padding: 8px; */
  z-index: 999;
`;

const View = styled.div`
  font-family: 'SUIT-Light';
  display: flex;
  flex-direction: column;
  /* position: absolute; */
  padding: 8px;
  width: 256px;
  min-height: 256px;
  max-height: 400px;

  border-radius: 10px;
  background-color: var(--box-bg);
  box-shadow: -1px -1px 2px var(--box-shadow),
    3px 3px 8px var(--box-shadow-darker);

  overflow-y: auto;
`;

const FeedWrapper = styled.div`
  display: flex;
  /* flex: auto; */
  /* min-height: 64px; */
  height: fit-content;
  width: 100%;
  justify-content: center;
  border-bottom: 1px solid #ddd;
  /* overflow: hidden; */
  /* word-break: normal; */

  :hover {
    background-color: var(--box-bg-lighter);
  }
  .feed-text {
    /* flex: auto; */
    /* display: inline-block; */
    width: 206px;
    height: auto;
    /* padding: 2px 0; */
    text-align: left;
    /* line-height: 24px; */
    margin: 0 8px;
    /* white-space: pre-line; */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    cursor: pointer;
  }
  .feed-icon-check {
    font-size: 24px;
    margin-left: auto;
    margin-right: 8px;
  }
`;

interface IProps {
  setNoticeOn: Dispatch<SetStateAction<boolean>>;
}

const Feed: React.FunctionComponent<IProps> = ({ setNoticeOn }) => {
  const navigate = useNavigate();
  interface Ifeed {
    id: number;
    msg: string;
  }
  const [feeds, setFeeds] = useState<Ifeed[]>([
    // { id: 1, msg: '테스트 메시지입니다.' },
    // { id: 2, msg: '테스트 메시지입니다.' },
    // { id: 3, msg: '테스트 메시지입니다.' },
    // { id: 4, msg: '길이가 비교적 긴 테스트 메시지입니다.' },
    // { id: 5, msg: '테스트 메시지입니다.' },
    // { id: 6, msg: '테스트 알림입니다.' },
    // { id: 7, msg: '테스트 알림입니다.' },
    // { id: 8, msg: '테스트 알림입니다.' },
    // { id: 9, msg: '테스트 알림입니다.' },
    // { id: 10, msg: '테스트 알림입니다.' },
    // { id: 11, msg: '테스트 알림입니다.' },
    // { id: 12, msg: '테스트 알림입니다.' },
  ]);
  useEffect(() => {
    setFeeds(feeds);
  }, [feeds]);
  const handleFeedOff = () => {
    setNoticeOn(false);
  };
  const handleFeedClick = (key: number) => () => {
    navigate('/');
  };
  const handleDelete = (key: number) => () => {
    // 해당 알림 삭제하는 코드
  };
  const isDark = useSelector((state: RootState) => state.login.isDark);
  return (
    <>
      <Canvas onClick={handleFeedOff} />
      <Container>
        <View>
          {feeds.length === 0 ? (
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
                    ? `${process.env.PUBLIC_URL}/feed-dark.png`
                    : `${process.env.PUBLIC_URL}/feed-light.png`
                }
                style={{
                  minWidth: '250px',
                  width: '50%',
                  height: 'auto',
                }}
              />
            </div>
          ) : (
            feeds.map((v) => {
              return (
                <FeedWrapper key={v.id} onClick={handleFeedClick(1)}>
                  <div className="feed-text">{v.msg}</div>
                  <div
                    className="feed-icon-check"
                    style={{ fontSize: '15px' }}
                    onClick={handleDelete(v.id)}
                  >
                    &times;
                  </div>
                </FeedWrapper>
              );
            })
          )}
        </View>
      </Container>
    </>
  );
};

export default Feed;
