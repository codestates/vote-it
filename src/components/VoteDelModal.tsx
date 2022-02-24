import React, { Dispatch, SetStateAction } from 'react';
import apiAxios from '../utils/apiAxios';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { EditpostList } from '../lib/postList';
import { notify } from '../modules/notification';
const Canvas = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  min-height: 100vh;
  width: 100vw;
  /* background-color: #ccc; */
  /* opacity: 0; */
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

const Container = styled.div`
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
  id: number;
}

const VoteModal: React.FunctionComponent<IProps> = ({ setDel, id }) => {
  const handleDropOff = () => {
    setDel(false);
  };

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
        console.log(res);
        EditpostList(id);

        navigate(`/`);
        dispatch(notify('투표가 삭제 되었습니다.'));
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <Canvas onClick={handleDropOff} />
      <Container>
        <div style={{ marginBottom: '50px' }}>정말 삭제하시겠습니까?</div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button onClick={handleDropOff}>뒤로</Button>
          <Button onClick={handleDelBtn}>삭제</Button>
        </div>
      </Container>
    </>
  );
};

export default VoteModal;
