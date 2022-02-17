import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Option } from '../components/Option';
import '../fonts/font.css';
import Bubbles from '../components/Bubbles';
import { Comments } from '../components/Comments';

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
  }
`;

const SubBox = styled.div`
  font-family: 'SUIT-Medium';
  font-size: 35px;
  font-weight: bold;
  grid-column: span 12;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const UserNameBox = styled.div`
  font-family: 'SUIT-Medium';
  font-size: larger;
  color: gray;
  grid-column: span 12;
  display: flex;
  justify-content: right;
  align-items: center;
  margin-bottom: 20px;
`;

const OptionsBox = styled.div`
  font-family: 'SUIT-Medium';
  grid-column: span 12;
`;

const ResultContainer = styled.div`
  grid-column: span 8;
  height: 100%;
  /* width: 100%; */
`;

interface Ioptions {
  id: number;
  content: string;
}

interface Icomments {
  id: number;
  content: string;
  username: string;
  parrentId?: number;
}

export const Vote = () => {
  const [voteSub, setVoteSub] = useState('');
  const [username, setUsername] = useState('');
  const [options, setOptions] = useState<Ioptions[]>([]);
  const [voted, setVoted] = useState(-1);
  const [commentsList, setCommentsList] = useState<Icomments[]>([]);

  useEffect(() => {
    setOptions([
      { id: 0, content: 'option1' },
      { id: 1, content: 'option2' },
      { id: 2, content: 'option3' },
      { id: 3, content: 'option4' },
      { id: 4, content: 'option5' },
      { id: 5, content: 'option6' },
    ]);
    setVoteSub('코테 언어 선호도 투표');
    setUsername('kimcoding');
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
  }, []);

  const VoteHandler = (optionId: number) => {
    if (optionId === voted) {
      setVoted(-1);
    } else {
      setVoted(optionId);
    }
  };

  return (
    <VoteOuter>
      <VoteContainer>
        <SubBox>{voteSub}</SubBox>
        <UserNameBox>{username}</UserNameBox>
        <OptionsBox style={voted === -1 ? {} : { gridColumn: 'span 4' }}>
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
        <ResultContainer style={voted === -1 ? { display: 'none' } : {}}>
          <Bubbles options={options} />
        </ResultContainer>
      </VoteContainer>
      <Comments
        username={username}
        commentList={commentsList}
        setCommentsList={setCommentsList}
        isVoted={voted !== -1}
      ></Comments>
    </VoteOuter>
  );
};
