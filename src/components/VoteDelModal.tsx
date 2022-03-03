import React, { Dispatch, SetStateAction, useState } from 'react';
import apiAxios from '../utils/apiAxios';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { notify } from '../modules/notification';
import ServerErr from '../pages/ServerErr';
const Canvas = styled.div<{ del: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  min-height: 100vh;
  width: 100vw;
  /* background-color: #ccc; */
  /* opacity: 0; */
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
  visibility: ${(props) => (props.del ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.del ? '1' : '0')};
  transition: all 0.3s;
`;

const Container = styled.div<{ del: boolean }>`
  font-family: 'IBMPlexSansKR-Light';
  position: fixed;
  top: 200px;
  min-height: 60px;
  width: 300px;
  height: 200px;
  background-color: var(--menu-bg);
  box-shadow: -1px -1px 2px var(--box-shadow),
    3px 3px 8px var(--box-shadow-darker);
  border-radius: 20px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  visibility: ${(props) => (props.del ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.del ? '1' : '0')};
  transition: all 0.3s;
`;

const Button = styled.div`
  font-family: 'SBAggroM';
  padding: 5px 16px;
  padding-top: 7px;
  text-align: left;
  margin: 10px;
  cursor: pointer;
  color: var(--bg);
  background-color: var(--main-color);
  border-radius: 15px;
  :hover {
    background-color: var(--main-color-tint);
    transition: all 0.3s;
  }
`;

interface IProps {
  setDel: Dispatch<SetStateAction<boolean>>;
  del: boolean;
  id: number;
}

const VoteModal: React.FunctionComponent<IProps> = ({ del, setDel, id }) => {
  const handleDropOff = () => {
    document.body.classList.remove('stop-scroll');
    setDel(false);
  };
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelBtn = () => {
    const access = localStorage.getItem('accessToken');
    apiAxios
      .delete(`users/me/polls/${id}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      .then((res) => {
        navigate(`/`);
        dispatch(notify('투표가 삭제 되었습니다.'));
      })
      .catch((err) => {
        if (err.response.status >= 500) {
          setErr(err.response.data.message);
        } else {
          alert(err);
          console.log(err.response.data.message);
        }
      });
  };

  return (
    <>
      {err === '' ? (
        <>
          <Canvas del={del} onClick={handleDropOff} />
          <Container del={del}>
            <div style={{ marginBottom: '50px' }}>정말 삭제하시겠습니까?</div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Button onClick={handleDropOff}>뒤로</Button>
              <Button onClick={handleDelBtn}>삭제</Button>
            </div>
          </Container>
        </>
      ) : (
        <ServerErr err={err} />
      )}
    </>
  );
};

export default VoteModal;
