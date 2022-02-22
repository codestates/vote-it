import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { Comment } from './Comment';

const CommentsContainer = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  align-items: center;
  margin-top: 100px;

  @media only screen and (max-width: 1200px) {
    width: 768px;
  }

  @media only screen and (max-width: 768px) {
    width: 360px;
  }
`;

const CommentInput = styled.textarea`
  &:focus {
    outline: none;
  }
  border: 1px solid #6d6d6d;
  font-family: 'SUIT-Medium';
  grid-column: span 12;
  height: 70px;
  font-size: 16px;
  padding: 10px;
  border-radius: 15px;
  resize: none;
`;

const BtnBox = styled.div`
  grid-column: span 12;
  display: flex;
  justify-content: right;
  margin-top: 20px;
`;

const CommentBtn = styled.div`
  &:hover {
    background: #6b7ac5;
  }
  font-family: 'IBMPlexSansKR-Light';
  width: 100px;
  height: 50px;
  cursor: pointer;
  /* border: 1px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: var(--main-color);
  color: white;
  font-weight: bold;
`;
interface Icomments {
  id: number;
  content: string;
  username: string;
  parrentId?: number;
}

interface Iprops {
  commentList: Icomments[];
  setCommentsList: Dispatch<SetStateAction<Icomments[]>>;
  isVoted: boolean;
  username: string;
}

export const Comments = ({
  commentList,
  setCommentsList,
  isVoted,
  username,
}: Iprops) => {
  const [comment, setComment] = useState('');

  const CommentBtnFunc = () => {
    if (comment === '') return;
    const id = commentList.length;
    setCommentsList([
      ...commentList,
      { id: id, content: comment, username: username },
    ]);
    setComment('');
  };

  return (
    <CommentsContainer style={!isVoted ? { display: 'none' } : {}}>
      <CommentInput
        placeholder="댓글을 입력해주세요."
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <BtnBox onClick={CommentBtnFunc}>
        <CommentBtn>댓글 달기</CommentBtn>
      </BtnBox>
      {commentList.map((obj) => {
        const replies = commentList.filter(
          (reply) => reply.parrentId === obj.id,
        );
        let isReply = false;
        commentList
          .filter((reply) => !!reply.parrentId)
          .forEach((reply) => {
            if (reply.parrentId === obj.id) {
              isReply = true;
            }
          });
        if (!!obj.parrentId) {
          return '';
        }
        return (
          <Comment
            id={obj.id}
            key={obj.id}
            username={obj.username}
            content={obj.content}
            isReply={isReply}
            replies={replies}
          ></Comment>
        );
      })}
      <div style={{ margin: '10px' }}></div>
    </CommentsContainer>
  );
};
