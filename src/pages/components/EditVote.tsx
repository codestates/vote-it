import styled from 'styled-components';
import { Scheduler } from '../../components';
import { useState } from 'react';
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
  width: 400px;
  height: 200px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-around;
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
    border-radius: 10px;
    cursor: pointer;
    /* margin-right: 25px; */
    margin-top: 20px;
    width: 100px;
    height: 50px;
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: var(--main-color-tint);
    }
  }

  @media only screen and (max-width: 500px) {
    width: 360px;
  }
`;

const CheckboxAndTitle = styled.div`
  display: flex;
  margin-left: 30px;
  align-items: center;
`;
const Checkbox = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;
const CheckboxTitle = styled.div`
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
}

export const EditVote = ({
  keyupHandler,
  id,
  ModalHandler,
  isEditOn,
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
    // TODO : ISO 8601 Time
  };

  const patchHandler = () => {
    if (calendarValue === '') {
      dispatch(notify('마감 시간을 입력해주세요.'));
      return;
    }
    const accessToken = localStorage.getItem('accessToken');
    apiAxios
      .patch(
        `users/me/polls/${id}`,
        {
          expirationDate: calendarValue,
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
            translate={'0px 0px'}
            CalenderValueHandler={CalenderValueHandler}
          />
        </CheckboxAndTitle>
        <CheckboxAndTitle>
          <Checkbox
            type={'checkbox'}
            onChange={() => {
              setIsPrivate(!isPrivate);
            }}
            checked={isPrivate}
          />
          <CheckboxTitle
            onClick={() => {
              setIsPrivate(!isPrivate);
            }}
          >
            비공개
          </CheckboxTitle>
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
          <div className="button" onClick={ModalHandler}>
            취소하기
          </div>
        </div>
      </ModalView>
    </ModalBackdrop>
  );
};