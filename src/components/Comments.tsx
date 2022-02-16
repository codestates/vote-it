import React, { useState } from 'react';
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
  grid-column: span 12;
  height: 100px;
`;

const BtnBox = styled.div`
  grid-column: span 12;
  display: flex;
  justify-content: right;
  margin-top: 20px;
`;

const CommentBtn = styled.div`
  width: 100px;
  height: 50px;
  cursor: pointer;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: #5d6dbe;
  color: white;
  font-weight: bold;
`;

interface Iprops {
  commentList: Icomments[];
  isVoted: boolean;
}

interface Icomments {
  id: number;
  content: string;
  username: string;
  parrentId?: number;
}

export const Comments = ({ commentList, isVoted }: Iprops) => {
  const [comment, setComment] = useState('');

  return (
    <CommentsContainer style={!isVoted ? { display: 'none' } : {}}>
      <CommentInput
        placeholder="댓글을 입력해주세요."
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <BtnBox>
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
    </CommentsContainer>
  );
};
