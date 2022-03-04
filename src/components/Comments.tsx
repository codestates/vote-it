import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { notify } from '../modules/notification';
import apiAxios from '../utils/apiAxios';
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
interface Iauthor {
  id: number;
  nickname: string;
}

interface IChildren {
  id: number;
  createdAt: string;
  content: string;
  author: Iauthor;
}

interface Icomments {
  id: number;
  createdAt: string;
  content: string;
  author: Iauthor;
  children?: IChildren[];
}

interface Iprops {
  keyupHandler: (e: KeyboardEvent) => void;
  isVoted: boolean;
  pollId: number;
}

export const Comments = ({ keyupHandler, isVoted, pollId }: Iprops) => {
  const [commentList, setCommentList] = useState<Icomments[]>([]);
  const [offset, setOffset] = useState(0);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    setIsLoading(true);
    apiAxios
      .get(`polls/${pollId}/comments?offset=${offset}&limit=${15}`, {
        headers: {
          Autorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setCommentList([...commentList, ...res.data.comments]);
        setOffset(offset + 15);
        setIsLoading(false);
      });
  }, []);

  const handleScroll = useCallback((): void => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;
    if (Math.round(scrollTop + innerHeight) > scrollHeight && !isEnd) {
      setIsLoading(true);

      apiAxios
        .get(`polls/${pollId}/comments?offset=${offset}&limit=${15}`, {
          headers: {
            Autorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          if (res.data.comments.length === 0) {
            setIsLoading(false);
            setIsEnd(true);
            return;
          }
          setTimeout(() => {
            setCommentList([...commentList, ...res.data.comments]);
            setOffset(offset + 15);
            setIsLoading(false);
          }, 1500);
        });
    }
  }, [isEnd, offset, commentList]);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll]);

  const commentHandler = (position: number, reply?: string) => {
    const accessToken = localStorage.getItem('accessToken');
    if (position === -1) {
      if (comment.length === 0) {
        dispatch(notify('내용을 입력해주세요.'));
        return;
      }
      apiAxios
        .post(
          `polls/${pollId}/comments`,
          {
            content: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((res) => {
          setComment('');
          apiAxios
            .get(`polls/${pollId}/comments?offset=0&limit=1`, {
              headers: {
                Autorization: `Bearer ${accessToken}`,
              },
            })
            .then((res) => {
              setCommentList([...res.data.comments, ...commentList]);
            });
        });
    } else {
      if (reply === '') {
        dispatch(notify('내용을 입력해주세요.'));
        return;
      }
      apiAxios
        .post(
          `polls/${pollId}/comments`,
          {
            content: reply,
            parentId: position,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((res) => {
          apiAxios
            .get(`polls/${pollId}/comments?offset=0&limit=20`, {
              headers: {
                Autorization: `Bearer ${accessToken}`,
              },
            })
            .then((res) => {
              setCommentList(res.data.comments);
            });
        });
    }
  };

  const deleteCommentHandler = (id: number) => {
    const accessToken = localStorage.getItem('accessToken');
    apiAxios
      .delete(`polls/${pollId}/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        apiAxios
          .get(`polls/${pollId}/comments?offset=0&limit=20`, {
            headers: {
              Autorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            setCommentList(res.data.comments);
          });
      });
  };

  return (
    <CommentsContainer style={!isVoted ? { display: 'none' } : {}}>
      <CommentInput
        placeholder="댓글을 입력해주세요."
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        onFocus={() => {
          console.log('focused');
          window.removeEventListener('keyup', keyupHandler);
        }}
        onBlur={() => {
          console.log('blurred');
          window.addEventListener('keyup', keyupHandler);
        }}
      />
      <BtnBox>
        <CommentBtn
          onClick={() => {
            commentHandler(-1);
          }}
        >
          댓글 달기
        </CommentBtn>
      </BtnBox>
      {console.log(commentList)}
      {commentList.map((obj) => {
        return (
          <Comment
            id={obj.id}
            key={obj.id}
            pollId={pollId}
            username={obj.author.nickname}
            userId={obj.author.id}
            content={obj.content}
            replies={obj.children}
            commentHandler={commentHandler}
            deleteCommentHandler={deleteCommentHandler}
          ></Comment>
        );
      })}
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/commentLoading.gif`}
            style={{ width: '40px', height: 'auto', marginLeft: '20px' }}
            alt="loading"
          />
        </div>
      ) : null}
      <div style={{ margin: '10px' }}></div>
    </CommentsContainer>
  );
};
