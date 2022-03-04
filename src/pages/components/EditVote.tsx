import styled from 'styled-components';
import { Scheduler } from '../../components';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { notify } from '../../modules/notification';
import apiAxios from '../../utils/apiAxios';

const ModalBackdrop = styled.div<{ isEditOn: boolean }>`
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
  visibility: ${(props) => (props.isEditOn ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isEditOn ? '1' : '0')};
  transition: all 0.3s;
`;

const ModalView = styled.div<{ isEditOn: boolean }>`
  background-color: var(--menu-bg);
  width: 200px;
  height: 216px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: 2px 2px 8px 2px var(--box-shadow-darker);
  visibility: ${(props) => (props.isEditOn ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isEditOn ? '1' : '0')};
  transition: all 0.3s;
  > div.close-btn {
    align-self: flex-end;
    margin-top: 10px;
    margin-right: 10px;
    width: 20px;
    cursor: pointer;
  }
  > div.buttonbox {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div.button {
    /* font-family: 'Y_Spotlight'; */
    color: white;
    background: var(--main-color);
    border-radius: 4px;
    cursor: pointer;
    /* margin-right: 25px; */
    margin-top: 20px;
    width: 80px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: var(--main-color-tint);
    }
  }
`;

const CheckboxAndTitle = styled.div`
  display: flex;
  align-items: center;
`;

const CheckButton = styled.button`
  width: 96px;
  padding: 4px;
  font-size: 14px;
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  :hover {
    color: var(--font-lighter);
  }
`;

interface CalenderValue {
  date: string;
  time: string;
}

interface Props {
  keyupHandler: (e: KeyboardEvent) => void;
  id: number;
  ModalHandler: () => void;
  isEditOn: boolean;
  expires: string;
  setFixedExpires: Dispatch<SetStateAction<string>>;
}

export const EditVote = ({
  keyupHandler,
  id,
  ModalHandler,
  isEditOn,
  expires,
  setFixedExpires,
}: Props) => {
  const [calendarValue, setCalendarValue] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const dispatch = useDispatch();

  const CalenderValueHandler = ({ date, time }: CalenderValue) => {
    if (time === '') {
      time = '23:59:59';
    }
    if (date === '') {
      if (time === '') {
        setCalendarValue('');
        return;
      }
      const today = new Date();
      const todayArr = today.toLocaleDateString().split('. ');
      if (todayArr[1].length === 1) {
        todayArr[1] = '0' + todayArr[1];
      }
      if (todayArr[2].length === 2) {
        todayArr[2] = '0' + todayArr[2];
      }
      todayArr[2] = todayArr[2].slice(0, todayArr[2].length - 1);
      date = todayArr.join('');
    }
    setCalendarValue(
      date.slice(0, 4) +
        '-' +
        date.slice(4, 6) +
        '-' +
        date.slice(6) +
        'T' +
        time +
        '+09:00',
    );
    setFixedExpires(
      date.slice(0, 4) +
        '-' +
        date.slice(4, 6) +
        '-' +
        date.slice(6) +
        'T' +
        time +
        '+09:00',
    );
  };

  const patchHandler = () => {
    const accessToken = localStorage.getItem('accessToken');
    apiAxios
      .patch(
        `users/me/polls/${id}`,
        {
          expirationDate: calendarValue === '' ? null : calendarValue,
          isPrivate: isPrivate,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        dispatch(notify('수정이 완료되었습니다.'));
        ModalHandler();
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <ModalBackdrop isEditOn={isEditOn} onClick={ModalHandler}>
      <ModalView isEditOn={isEditOn} onClick={(e) => e.stopPropagation()}>
        <div className="close-btn" onClick={ModalHandler}>
          <AiOutlineClose />
        </div>
        <CheckboxAndTitle>
          <Scheduler
            keyupHandler={keyupHandler}
            translate={'0px, -128px'}
            CalenderValueHandler={CalenderValueHandler}
            expiresForCalender=""
          />
        </CheckboxAndTitle>
        <CheckboxAndTitle>
          <CheckButton
            onClick={() => {
              setIsPrivate(!isPrivate);
            }}
          >
            {isPrivate ? '투표 비공개' : '투표 공개'}
          </CheckButton>
        </CheckboxAndTitle>
        <div className="buttonbox">
          <div
            className="button"
            onClick={() => {
              patchHandler();
            }}
          >
            수정하기
          </div>
        </div>
      </ModalView>
    </ModalBackdrop>
  );
};
