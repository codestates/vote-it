import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../fonts/font.css';
import { NotImplemented } from './NotImplemented';

const Canvas = styled.div<{ noticeOn: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100vw;
  z-index: -4;
  opacity: 0;
  visibility: ${(props) => (props.noticeOn ? 'visible' : 'hidden')};
`;

const Container = styled.div<{ noticeOn: boolean }>`
  position: fixed;
  top: 48px;
  margin-right: calc(100% - 90%);
  /* transform: translate(-50%, 32px); */
  /* padding: 8px; */
  z-index: 999;
  visibility: ${(props) => (props.noticeOn ? 'visible' : 'hidden')};
  transform: ${(props) => (props.noticeOn ? 'scaleY(1)' : 'scaleY(0)')};
  transform-origin: 0 0 0;
  transition: all 0.3s;
  @media only screen and (max-width: 1200px) {
    margin-right: calc(100% - 90%);
  }
  @media only screen and (max-width: 768px) {
    margin-right: calc(100% - 80%);
  }
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
  overflow-x: hidden;
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
  noticeOn: boolean;
  setNoticeOn: Dispatch<SetStateAction<boolean>>;
}

const Feed: React.FunctionComponent<IProps> = ({ noticeOn, setNoticeOn }) => {
  const navigate = useNavigate();
  interface Ifeed {
    id: number;
    msg: string;
  }
  const [feeds, setFeeds] = useState<Ifeed[]>([
    // { id: 1, msg: '????????? ??????????????????.' },
    // { id: 2, msg: '????????? ??????????????????.' },
    // { id: 3, msg: '????????? ??????????????????.' },
    // { id: 4, msg: '????????? ????????? ??? ????????? ??????????????????.' },
    // { id: 5, msg: '????????? ??????????????????.' },
    // { id: 6, msg: '????????? ???????????????.' },
    // { id: 7, msg: '????????? ???????????????.' },
    // { id: 8, msg: '????????? ???????????????.' },
    // { id: 9, msg: '????????? ???????????????.' },
    // { id: 10, msg: '????????? ???????????????.' },
    // { id: 11, msg: '????????? ???????????????.' },
    // { id: 12, msg: '????????? ???????????????.' },
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
    // ?????? ?????? ???????????? ??????
  };
  return (
    <>
      <Canvas noticeOn={noticeOn} onClick={handleFeedOff} />
      <Container noticeOn={noticeOn}>
        <View>
          {false ? (
            feeds.length === 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/vote-it_LOGO1.ico`}
                  style={{
                    width: '30%',
                    height: 'auto',
                    opacity: '0.7',
                  }}
                  alt="feed"
                />
                <div>????????? ???????????????</div>
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
            )
          ) : (
            <NotImplemented />
          )}
        </View>
      </Container>
    </>
  );
};

export default Feed;
