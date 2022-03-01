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
  value?: number;
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
  const [isPlural, setIsPlural] = useState(false);
  const userId = useSelector((state: RootState) => state.login.userId);

  const dispatch = useDispatch();

  const timeHandler = (value: string) => {
    const today = new Date();
    const timeValue = new Date(value);

    return Math.floor((timeValue.getTime() - today.getTime()) / 1000 / 60);
  };

  useEffect(() => {
    apiAxios
      .get(`polls/${id}`)
      .then((res) => {
        setIsPlural(res.data.isPlural);
        setPollId(res.data.author.id);
        setVoteSub(res.data.subject);
        setUsername(res.data.author.nickname);
        setOptions(res.data.options);
        return res;
      })
      .then((res) => {
        if (timeHandler(res.data.expirationDate) < 0) {
          // setVoted();
          setIsDone(true);
          dispatch(notify('마감된 투표입니다.'));
        }
      });
  }, [dispatch, id]);

  const VoteHandler = (optionId: number) => {
    if (isDone) {
      dispatch(notify('마감된 투표입니다.'));
      return;
    }
    const isLogin = localStorage.getItem('isLogin');
    if (isLogin === 'false') {
      dispatch(notify('로그인 후 투표하실 수 있습니다.'));
      return;
    }
    if (voted.includes(optionId)) {
      // setVoted(voted.filter((el) => el !== optionId));
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
        <OptionsBox
          style={voted.length === 0 && !isDone ? {} : { gridColumn: 'span 6' }}
        >
          {options.map((obj) => {
            return (
              <Option
                key={obj.id}
                id={obj.id}
                content={obj.content}
                voted={voted}
                VoteHandler={VoteHandler}
              ></Option>
            );
          })}
        </OptionsBox>
        <ResultContainer
          style={isDone || voted.length === 0 ? { display: 'none' } : {}}
        >
          <div style={{ fontFamily: 'OTWelcomeRA' }}>
            <Chart options={options} />
          </div>
        </ResultContainer>
      </VoteContainer>
      <Comments
        username={username}
        commentList={commentsList}
        setCommentsList={setCommentsList}
        isVoted={voted.length !== 0 || isDone}
      ></Comments>
      {shareModal.isOn ? (
        <Share shareModal={shareModal} setShareModal={setShareModal} />
      ) : null}
      {del ? <VoteDelModal setDel={setDel} id={id} /> : null}
    </VoteOuter>
  );
};
