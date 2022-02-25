import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Option } from '../components/Option';
import '../fonts/font.css';
import { Comments } from '../components/Comments';
// import { FaShareAlt, FaRegShareSquare, FaShare } from 'react-icons/fa';
//import { Share } from '../components';
import { Share } from '../components/ShareModal';
import { getPostById } from '../lib/postList';
import { useLocation } from 'react-router-dom';
import Chart from '../components/Chart';
import { BiShareAlt } from 'react-icons/bi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import VoteDelModal from '../components/VoteDelModal';

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
`;

const ShareButton = styled.div`
  &:hover {
    color: var(--main-color);
  }
  grid-column: 2 / span 11;
  padding: 4px;
  white-space: pre;
  width: fit-content;
  /* svg {
    transform: translate(0, 2px);
  } */
  @media only screen and (max-width: 500px) {
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
  name: string;
  value: number;
}

interface Icomments {
  id: number;
  content: string;
  username: string;
  parrentId?: number;
}

interface Post {
  id: number;
  subject: string;
  author: string;
}

export const Vote = () => {
  const location = useLocation().state as number;
  const id = location;
  const [voteSub, setVoteSub] = useState('');
  const [username, setUsername] = useState('');
  const [options, setOptions] = useState<Ioptions[]>([]);
  const [voted, setVoted] = useState(-1);
  const [commentsList, setCommentsList] = useState<Icomments[]>([]);
  const [shareModal, setShareModal] = useState({ isOn: false, isShow: false });
  const [post, setPost] = useState<Post>(getPostById(id));
  const [del, setDel] = useState(false);
  useEffect(() => {
    setPost(post);
    setOptions([
      { id: 0, name: 'option1', value: 20 },
      { id: 1, name: 'option2', value: 13 },
      { id: 2, name: 'option3', value: 5 },
      { id: 3, name: 'option4', value: 42 },
      { id: 4, name: 'option5', value: 3 },
      { id: 5, name: 'option6', value: 9 },
    ]);
    setVoteSub(post.subject);
    setUsername(post.author);
    setCommentsList([
      { id: 0, content: 'comment1', username: 'user1' },
      { id: 1, content: 'comment2', username: 'user2' },
      { id: 2, content: 'comment3', username: 'user3' },
      { id: 3, content: 'comment4', username: 'user4' },
      { id: 4, content: 'comment1', username: 'user1', parrentId: 1 },
      { id: 5, content: 'comment1', username: 'user1', parrentId: 1 },
      { id: 6, content: 'comment1', username: 'user1', parrentId: 1 },
    ]);
    // TODO {id}로 get 받아와서 setState
  }, [post]);

  const VoteHandler = (optionId: number) => {
    if (optionId === voted) {
      setVoted(-1);
    } else {
      setVoted(optionId);
    }
  };

  const handleShareModal = () => {
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
        <EditDelBtn>
          <AiOutlineEdit style={{ marginRight: '10px' }} />
          <AiOutlineDelete onClick={handelDelBtn} />
        </EditDelBtn>
        <UserNameBox>{username}</UserNameBox>
        <ShareButton onClick={handleShareModal}>
          <BiShareAlt style={{ width: '20px', height: 'auto' }} />
        </ShareButton>
        <OptionsBox style={voted === -1 ? {} : { gridColumn: 'span 6' }}>
          {options.map((obj) => {
            return (
              <Option
                key={obj.id}
                id={obj.id}
                content={obj.name}
                voted={voted}
                VoteHandler={VoteHandler}
              ></Option>
            );
          })}
        </OptionsBox>
        <ResultContainer style={voted === -1 ? { display: 'none' } : {}}>
          <div style={{ fontFamily: 'OTWelcomeRA' }}>
            <Chart options={options} />
          </div>
        </ResultContainer>
      </VoteContainer>
      <Comments
        username={username}
        commentList={commentsList}
        setCommentsList={setCommentsList}
        isVoted={voted !== -1}
      ></Comments>
      {shareModal.isOn ? (
        <Share shareModal={shareModal} setShareModal={setShareModal} />
      ) : null}
      {del ? <VoteDelModal setDel={setDel} id={id} /> : null}
    </VoteOuter>
  );
};
