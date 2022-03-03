import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCaretDown, FaCaretUp, FaRegThumbsUp } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';

const CommentInfo = styled.div`
  font-family: 'SUIT-Light';
  grid-column: span 12;
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 10px;

  > .delete_box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: left;
  }

  .delete {
    margin-left: 10px;
    cursor: pointer;
    &:hover {
      color: blue;
    }
  }
`;

const CommentUsername = styled.div`
  color: #666666;
  padding: 5px;
  font-size: smaller;
  text-align: left;
`;

const CommentContent = styled.div`
  padding: 10px;
  text-align: left;
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
    margin-right: 10px;
  }

  div {
    /* margin-left: 10px; */
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

interface Iauthor {
  id: number;
  nickname: string;
}

interface Icomments {
  id: number;
  createdAt: string;
  content: string;
  author: Iauthor;
}

interface Iprops {
  id: number;
  username: string;
  content: string;
  userId: number;
  replies?: Icomments[];
  commentHandler: (position: number, reply?: string) => void;
  deleteCommentHandler: (id: number) => void;
}

export const Comment = ({
  id,
  username,
  content,
  userId,
  replies = [],
  commentHandler,
  deleteCommentHandler,
}: Iprops) => {
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const [isInputReply, setIsReply] = useState(false);
  const [reply, setReply] = useState('');

  const myId = useSelector((state: RootState) => state.login.userId);

  return (
    <CommentInfo key={id}>
      <CommentUsername>{username}</CommentUsername>
      <CommentContent>{content}</CommentContent>
      <LikeBox>
        <FaRegThumbsUp className="thumb" />
        <AiOutlineDelete
          onClick={() => {
            deleteCommentHandler(id);
          }}
          className="thumb"
          style={userId === myId ? {} : { display: 'none' }}
        />
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
          <InputBtn
            onClick={() => {
              setIsRepliesOpen(true);
              setIsReply(false);
              commentHandler(id, reply);
              setReply('');
            }}
          >
            확인
          </InputBtn>
        </InputReplyBox>
      ) : (
        ''
      )}
      {isRepliesOpen
        ? replies.map((obj) => {
            return (
              <CommentInfo key={obj.id} style={{ marginLeft: '50px' }}>
                <CommentUsername>{obj.author.nickname}</CommentUsername>
                <CommentContent>{obj.content}</CommentContent>
                <div className="delete_box">
                  <AiOutlineDelete
                    onClick={() => {
                      deleteCommentHandler(obj.id);
                    }}
                    className="delete"
                    style={obj.author.id === myId ? {} : { display: 'none' }}
                  />
                </div>
              </CommentInfo>
            );
          })
        : ''}
      {replies.length !== 0 ? (
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
