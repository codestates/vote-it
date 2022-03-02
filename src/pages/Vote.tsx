import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Option } from '../components/Option';
import '../fonts/font.css';
import { Comments } from '../components/Comments';
import { Share } from '../components/ShareModal';
import { useLocation } from 'react-router-dom';
import Chart from '../components/Chart';
import { useDispatch, useSelector } from 'react-redux';
import { BiShareAlt } from 'react-icons/bi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import VoteDelModal from '../components/VoteDelModal';
import apiAxios from '../utils/apiAxios';
import { notify } from '../modules/notification';
import { RootState } from '../modules';
import { EmptyChart } from '../components/EmptyChart';

const VoteOuter = styled.div`
  padding-top: 48px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const VoteContainer = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  align-items: center;

  @media only screen and (max-width: 1200px) {
    width: 768px;
  }

  @media only screen and (max-width: 768px) {
    width: 360px;
    column-gap: 16px;
    grid-template-columns: repeat(6, 1fr);
  }
`;

const SubBox = styled.div`
  font-family: 'IBMPlexSansKR-Light';
  font-size: 35px;
  font-weight: bold;
  grid-column: span 12;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  @media only screen and (max-width: 768px) {
    grid-column: span 6;
  }
`;

const UserNameBox = styled.div`
  font-family: 'SUIT-Medium';
  font-size: larger;
  color: gray;
  grid-column: span 11;
  display: flex;
  justify-content: right;
  align-items: center;
  margin-bottom: 20px;
  @media only screen and (max-width: 768px) {
    grid-column: span 6;
  }
`;
const EditDelBtn = styled.div`
  font-family: 'SUIT-Medium';
  font-size: larger;
  color: var(--font-lighter);
  grid-column: span 11;
  display: flex;
  justify-content: right;
  align-items: center;
  margin-bottom: 20px;
  @media only screen and (max-width: 768px) {
    grid-column: span 6;
  }
  > div {
    display: flex;
    cursor: pointer;
    &:hover {
      color: var(--main-color);
    }
  }
  > div > div {
    font-size: small;
    margin: 0 10px 0 0;
  }
`;

const ShareButton = styled.div`
  &:hover {
    color: var(--main-color);
  }
  display: flex;
  grid-column: 2 / span 11;
  padding: 4px;
  white-space: pre;
  width: fit-content;
  cursor: pointer;
  /* svg {
    transform: translate(0, 2px);
  } */
  @media only screen and (max-width: 768px) {
    grid-column: span 6;
  }
`;

const OptionsBox = styled.div`
  font-family: 'SUIT-Medium';
  grid-column: 2 / span 10;

  @media only screen and (max-width: 768px) {
    grid-column: span 6;
  }
`;

const ResultContainer = styled.div`
  grid-column: span 6;
  height: 100%;
  /* width: 100%; */
  @media only screen and (max-width: 768px) {
    grid-column: span 6;
  }
`;

interface Ioptions {
  id: number;
  content: string;
  votedCount: number;
  isVoted?: boolean;
}

interface Icomments {
  id: number;
  content: string;
  username: string;
  parrentId?: number;
}

// interface Post {
//   id: number;
//   subject: string;
//   author: string;
// }

export const Vote = () => {
  const location = useLocation().state as number;
  const id = location;
  const [pollId, setPollId] = useState(-1);
  const [voteSub, setVoteSub] = useState('');
  const [username, setUsername] = useState('');
  const [options, setOptions] = useState<Ioptions[]>([]);
  const [voted, setVoted] = useState<number[]>([]);
  const [commentsList, setCommentsList] = useState<Icomments[]>([]);
  const [shareModal, setShareModal] = useState({ isOn: false, isShow: false });
  // const [post, setPost] = useState<Post>(getPostById(id));
  const [del, setDel] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isVoted, setIsVoted] = useState(false);
  const [isPlural, setIsPlural] = useState(0);
  const userId = useSelector((state: RootState) => state.login.userId);

  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const dispatch = useDispatch();

  const timeHandler = (value: string) => {
    const today = new Date();
    const timeValue = new Date(value);
    console.log(`today: ${today}`);
    console.log(`time: ${timeValue}`);

    return timeValue.getTime() - today.getTime();
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    apiAxios
      .get(
        `polls/${id}`,
        isLogin
          ? { headers: { Authorization: `Bearer ${accessToken}` } }
          : undefined,
      )
      .then((res) => {
        setIsPlural(res.data.isPlural);
        setPollId(res.data.author.id);
        setVoteSub(res.data.subject);
        setUsername(res.data.author.nickname);
        // setOptions(res.data.options);
        setIsVoted(res.data.isVoted);
        setVoted(
          res.data.options
            .filter((el: any) => el.isVoted)
            .map((obj: any) => obj.id),
        );
        setOptions(
          res.data.options.map((el: any, idx: number) => {
            if (!el.votedCount) {
              el.votedCount = 0;
            }
            return el;
          }),
        );
        return res;
      })
      .then((res) => {
        if (timeHandler(res.data.expirationDate) < 0) {
          // setVoted();
          setIsDone(true);
          dispatch(notify('마감된 투표입니다.'));
        }
      });
  }, [dispatch, id, isLogin]);

  const VoteHandler = (optionId: number, isVote: boolean) => {
    if (isDone) {
      dispatch(notify('마감된 투표입니다.'));
      return;
    }
    const isLogin = localStorage.getItem('isLogin');
    if (isLogin === 'false') {
      dispatch(notify('로그인 후 투표하실 수 있습니다.'));
      return;
    }
    if (isPlural === 0 && isVoted && optionId !== voted[0]) {
      dispatch(notify('중복 투표가 불가능한 투표입니다!'));
      return;
    }
    if (isVote) {
      const accessToken = localStorage.getItem('accessToken');
      apiAxios
        .delete(`polls/${id}/options/${optionId}/vote`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setVoted(voted.filter((el) => el !== optionId));
          setOptions(
            options.map((el: any) => {
              // console.log(el)
              if (el.id === optionId) {
                return { ...el, isVoted: false, votedCount: el.votedCount - 1 };
              }
              return el;
            }),
          );
          if (voted.filter((el) => el !== optionId).length === 0) {
            setIsVoted(false);
          }
          // window.location.href = `/vote/${id}`
        })
        .catch((err) => console.log(err.response));
      return;
    } else {
      const accessToken = localStorage.getItem('accessToken');
      apiAxios
        .post(`polls/${id}/options/${optionId}/vote`, null, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          if (isPlural) {
            setVoted([...voted, optionId]);
          } else {
            setVoted([optionId]);
          }
          setIsVoted(true);
          setOptions(
            options.map((el: any) => {
              // console.log(el)
              if (el.id === optionId) {
                return { ...el, isVoted: true, votedCount: el.votedCount + 1 };
              }
              return el;
            }),
          );
          // window.location.href = `/vote/${id}`;
        })
        .catch((err) => dispatch(notify(err.response.data.message)));
    }
  };

  const handleShareModal = () => {
    document.body.classList.add('stop-scroll');
    setShareModal({ isOn: true, isShow: false });
    setTimeout(() => {
      setShareModal((prev) => {
        return { ...prev, isShow: true };
      });
    }, 16);
  };
  const handelDelBtn = () => {
    setDel(true);
  };
  const handleVotedCount = (id: number) => {
    if (isPlural === 0 && isVoted) {
      return;
    }
    setOptions(
      options.map((el) => {
        if (el.id === id) {
          return { ...el, votedCount: el.votedCount + 1 };
        }
        return el;
      }),
    );
  };

  return (
    <VoteOuter>
      <VoteContainer>
        <SubBox>{voteSub}</SubBox>
        <EditDelBtn style={userId !== pollId ? { display: 'none' } : {}}>
          <div>
            <AiOutlineEdit />
            <div>수정하기</div>
          </div>
          <div onClick={handelDelBtn}>
            <AiOutlineDelete />
            <div>삭제하기</div>
          </div>
        </EditDelBtn>
        <UserNameBox>{username}</UserNameBox>
        <ShareButton onClick={handleShareModal}>
          <BiShareAlt style={{ width: '20px', height: 'auto' }} />
          <div>공유하기</div>
        </ShareButton>
        <OptionsBox style={!isVoted && !isDone ? {} : { gridColumn: 'span 6' }}>
          {options.map((obj) => {
            return (
              <Option
                key={obj.id}
                id={obj.id}
                pollId={id}
                content={obj.content}
                isVoted={obj.isVoted || false}
                voted={voted}
                VoteHandler={VoteHandler}
                handleVotedCount={handleVotedCount}
              ></Option>
            );
          })}
        </OptionsBox>
        <ResultContainer style={!isDone && !isVoted ? { display: 'none' } : {}}>
          <div style={{ fontFamily: 'OTWelcomeRA' }}>
            {isVoted ? <Chart options={options} /> : <EmptyChart />}
          </div>
        </ResultContainer>
      </VoteContainer>
      <Comments
        username={username}
        commentList={commentsList}
        setCommentsList={setCommentsList}
        isVoted={isVoted || isDone}
      ></Comments>
      {shareModal.isOn ? (
        <Share shareModal={shareModal} setShareModal={setShareModal} />
      ) : null}
      {del ? <VoteDelModal setDel={setDel} id={id} /> : null}
    </VoteOuter>
  );
};
