import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

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

  return (
    <CommentInfo key={id}>
      <CommentUsername>{username}</CommentUsername>
      <CommentContent>{content}</CommentContent>
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
