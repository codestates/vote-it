import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCaretDown, FaCaretUp, FaRegThumbsUp } from 'react-icons/fa';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import apiAxios from '../utils/apiAxios';
import { notify } from '../modules/notification';

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

const CommentPatchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const CommentPatch = styled.textarea`
  /* padding: 10px; */
  margin: 10px;
  resize: none;
  border: none;
  border-bottom: 1px solid #dbdbdb;
  width: 80%;
`;

const PatchBtnBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 10%;
`;

const PatchBtn = styled.div`
  margin-top: 10px;
  border: 1px solid var(--font);
  width: 50px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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
  pollId: number;
  replies?: Icomments[];
  commentHandler: (position: number, reply?: string) => void;
  deleteCommentHandler: (id: number) => void;
}

export const Comment = ({
  id,
  username,
  content,
  userId,
  pollId,
  replies = [],
  commentHandler,
  deleteCommentHandler,
}: Iprops) => {
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const [isInputReply, setIsReply] = useState(false);
  const [reply, setReply] = useState('');
  const [isPatchComment, setIsPatchComment] = useState(false);
  const [patchComment, setPatchComment] = useState('');
  const [isPatchReply, setIsPatchReply] = useState(-1);
  const [patchReply, setPatchReply] = useState('');
  const [isFixed, setIsFixed] = useState(false);
  const [fixedValue, setFixedValue] = useState('');

  const myId = useSelector((state: RootState) => state.login.userId);
  const dispatch = useDispatch();

  const patchCommentHandler = () => {
    if (patchComment === '') {
      dispatch(notify('내용을 입력해주세요.'));
      return;
    }
    const accessToken = localStorage.getItem('accessToken');
    apiAxios
      .patch(
        `polls/${pollId}/comments/${id}`,
        {
          content: patchComment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        setIsPatchComment(false);
        setIsFixed(true);
        setFixedValue(res.data.content);
      })
      .catch((err) => alert(err));
  };

  return (
    <CommentInfo key={id}>
      <CommentUsername>{username}</CommentUsername>
      {!isPatchComment ? (
        <CommentContent>{!isFixed ? content : fixedValue}</CommentContent>
      ) : (
        <CommentPatchContainer>
          <CommentPatch
            placeholder={content}
            value={patchComment}
            onChange={(e) => {
              setPatchComment(e.target.value);
            }}
          />
          <PatchBtnBox>
            <PatchBtn onClick={patchCommentHandler}>확인</PatchBtn>
            <PatchBtn
              onClick={() => {
                setIsPatchComment(false);
              }}
            >
              취소
            </PatchBtn>
          </PatchBtnBox>
        </CommentPatchContainer>
      )}
      <LikeBox>
        <FaRegThumbsUp className="thumb" />
        <AiOutlineEdit
          onClick={() => {
            setIsPatchComment(!isPatchComment);
          }}
          className="thumb"
          style={userId === myId ? {} : { display: 'none' }}
        />
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
        ? replies.map((obj, index) => {
            const patchReplyHandler = () => {
              if (patchReply === '') {
                return;
              }
              const accessToken = localStorage.getItem('accessToken');
              apiAxios
                .patch(
                  `polls/${pollId}/comments/${obj.id}`,
                  {
                    content: patchReply,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  },
                )
                .then((res) => {
                  obj.content = res.data.content;
                  setIsPatchReply(-1);
                })
                .catch((err) => alert(err));
            };

            return (
              <CommentInfo key={obj.id} style={{ marginLeft: '50px' }}>
                <CommentUsername>{obj.author.nickname}</CommentUsername>
                {index !== isPatchReply ? (
                  <CommentContent>{obj.content}</CommentContent>
                ) : (
                  <CommentPatchContainer>
                    <CommentPatch
                      placeholder={obj.content}
                      value={patchReply}
                      onChange={(e) => {
                        setPatchReply(e.target.value);
                      }}
                    />
                    <PatchBtnBox>
                      <PatchBtn onClick={patchReplyHandler}>확인</PatchBtn>
                      <PatchBtn
                        onClick={() => {
                          setIsPatchReply(-1);
                        }}
                      >
                        취소
                      </PatchBtn>
                    </PatchBtnBox>
                  </CommentPatchContainer>
                )}
                <div className="delete_box">
                  <AiOutlineEdit
                    className="delete"
                    style={obj.author.id === myId ? {} : { display: 'none' }}
                    onClick={() => {
                      if (isPatchReply === -1) {
                        setIsPatchReply(index);
                      } else {
                        setIsPatchReply(-1);
                      }
                    }}
                  />
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
