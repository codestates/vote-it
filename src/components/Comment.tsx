import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCaretDown, FaCaretUp, FaRegThumbsUp } from 'react-icons/fa';

const CommentInfo = styled.div`
  font-family: 'SUIT-Light';
  grid-column: span 12;
  border-bottom: 1px solid #dbdbdb;
`;

const CommentUsername = styled.div`
  color: #666666;
  padding: 10px;
  font-size: smaller;
  text-align: left;
`;

const CommentContent = styled.div`
  padding: 10px;
  text-align: left;
  margin-bottom: 10px;
`;

const ReplyDiv = styled.div`
  grid-column: span 12;
  text-align: left;
  padding: 0 10px;
  margin: 10px;
  font-size: small;
  cursor: pointer;
`;

const LikeBox = styled.div`
  width: 100%;
  text-align: left;
  margin-left: 10px;
  margin-bottom: 2px;
  display: flex;

  .thumb {
    cursor: pointer;
    &:hover {
      color: blue;
    }
  }

  div {
    margin-left: 10px;
    font-size: small;
    cursor: pointer;
    &:hover {
      color: blue;
    }
  }
`;

const InputReplyBox = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  padding: 10px 0;
`;

const InputReply = styled.textarea`
  grid-column: 2 / span 11;
  border: 0px;
  border-bottom: 1px solid black;
  resize: none;
  &:focus {
    outline: none;
  }
  padding: 0;
`;

const InputBtn = styled.div`
  margin-top: 10px;
  cursor: pointer;
  border: 1px solid black;
  height: 30px;
  grid-column: 12 / span 1;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    grid-column: 11 / span 2;
  }
`;

const CancleInputBtn = styled.div`
  margin-top: 10px;
  border: 1px solid black;
  height: 30px;
  cursor: pointer;
  grid-column: 11 / span 1;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    grid-column: 9 / span 2;
  }
`;

interface Icomments {
  id: number;
  content: string;
  username: string;
  parrentId?: number;
}

interface Iprops {
  id: number;
  username: string;
  content: string;
  isReply: boolean;
  replies?: Icomments[];
}

export const Comment = ({
  id,
  username,
  content,
  isReply,
  replies = [],
}: Iprops) => {
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const [isInputReply, setIsReply] = useState(false);
  const [reply, setReply] = useState('');

  return (
    <CommentInfo key={id}>
      <CommentUsername>{username}</CommentUsername>
      <CommentContent>{content}</CommentContent>
      <LikeBox>
        <FaRegThumbsUp className="thumb" />
        <div
          onClick={() => {
            setIsReply(!isInputReply);
          }}
        >
          답글달기
        </div>
      </LikeBox>
      {isInputReply ? (
        <InputReplyBox>
          <InputReply
            value={reply}
            onChange={(e) => {
              setReply(e.target.value);
            }}
            placeholder="답글을 입력해주세요."
          />
          <CancleInputBtn
            onClick={() => {
              setIsReply(false);
            }}
          >
            취소
          </CancleInputBtn>
          <InputBtn>확인</InputBtn>
        </InputReplyBox>
      ) : (
        ''
      )}
      {isRepliesOpen
        ? replies.map((obj) => {
            return (
              <CommentInfo key={obj.id} style={{ marginLeft: '50px' }}>
                <CommentUsername>{obj.username}</CommentUsername>
                <CommentContent>{obj.content}</CommentContent>
              </CommentInfo>
            );
          })
        : ''}
      {isReply ? (
        <ReplyDiv
          onClick={() => {
            setIsRepliesOpen(!isRepliesOpen);
          }}
        >
          {isRepliesOpen ? (
            <FaCaretUp
              style={{
                marginRight: '5px',
              }}
            />
          ) : (
            <FaCaretDown style={{ marginRight: '5px' }} />
          )}
          {isRepliesOpen ? '답글접기' : '답글보기'}
        </ReplyDiv>
      ) : (
        ''
      )}
    </CommentInfo>
  );
};
