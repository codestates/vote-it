import React, { Dispatch, SetStateAction } from 'react';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { EditpostList } from '../lib/postList';
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
}

const VoteModal: React.FunctionComponent<IProps> = ({ setDel }) => {
  const handleDropOff = () => {
    setDel(false);
  };

  const navigate = useNavigate();

  const handleDelBtn = () => {
    let url = window.location.href.split('/');
    const index = Number(url[url.length - 1]);
    EditpostList(index);
    navigate(`/`);
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
