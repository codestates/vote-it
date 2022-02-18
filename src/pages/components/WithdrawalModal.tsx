import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import apiAxios from '../../utils/apiAxios';
import { loginHandler } from '../../modules/login';
import { useDispatch } from 'react-redux';
import { notify } from '../../modules/notification';

const ModalBackdrop = styled.div`
  font-family: 'SUIT-Light';
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
`;

const ModalView = styled.div`
  background-color: #ffffff;
  width: 500px;
  height: 350px;
  border-radius: 20px;
  > div.close_btn {
    background: red;
    cursor: pointer;
  }
  > div.desc {
    /* font-family: 'IBMPlexSansKR-Light'; */
    background-color: #fff;
    margin-top: 25px;
    color: #b80000;
    font-weight: bold;
    text-align: center;
  }
  > div.button {
    /* font-family: 'Y_Spotlight'; */
    color: white;
    background: #b80000;
    border-radius: 10px;
    cursor: pointer;
    /* margin-right: 25px; */
    margin-top: 20px;
    width: 100px;
    height: 50px;
    margin-left: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (max-width: 500px) {
    width: 360px;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 5vh;
  margin-top: 20px;
`;

const InputBox = styled.input`
  font-family: 'EliceDigitalBaeum_Bold';
  border: none;
  box-shadow: -2px -2px 4px #f8f8f8, 3px 3px 6px rgb(184, 184, 184);
  border-radius: 13px;
  font-size: 14px;
  height: 35px;
  width: 200px;
  margin: 5px;
  padding: 5px;
  padding-left: 10px;
`;

interface Iprop {
  [index: string]: () => void;
}

export const WithdrawalModal = ({ WithdrawalModalHandler }: Iprop) => {
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const PasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const WithdrawalReq = () => {
    if (password !== '회원탈퇴') {
      dispatch(notify('정확히 입력해주세요.'));
      return;
    }
    const accessToken = localStorage.getItem('accessToken');
    apiAxios
      .delete(`users/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        dispatch(loginHandler());
        localStorage.setItem('isLogin', 'false');
        localStorage.setItem('accessToken', '');
        dispatch(notify('회원탈퇴가 완료되었습니다.'));
        window.location.href = '/';
      })
      .catch((err) => alert(err));
  };

  return (
    <ModalBackdrop onClick={WithdrawalModalHandler}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <div
          className="close-btn"
          style={{
            marginLeft: '20px',
            marginTop: '10px',
            width: '20px',
            cursor: 'pointer',
          }}
          onClick={WithdrawalModalHandler}
        >
          <AiOutlineClose />
        </div>
        <div className="desc">회원님의 모든 정보가 삭제됩니다.</div>
        <div className="desc">정말로 탈퇴 하시겠습니까?</div>
        <div className="desc">탈퇴하시려면 회원탈퇴를 입력해주세요.</div>
        <StyledDiv>
          <InputBox
            onChange={PasswordHandler}
            value={password}
            type="text"
            placeholder="회원탈퇴"
          />
        </StyledDiv>
        <br />
        <div className="button" onClick={WithdrawalReq}>
          회원탈퇴
        </div>
      </ModalView>
    </ModalBackdrop>
  );
};
