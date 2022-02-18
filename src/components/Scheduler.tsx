import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Suggestion, SchedulerCalender } from './';
import { FaRegCalendarAlt, FaRegTimesCircle } from 'react-icons/fa';

const Container = styled.div`
  padding: 4px;
`;

const PopupButton = styled.button`
  padding: 4px 8px;
  color: var(--main-color);
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  :hover {
    background-color: #eee;
  }
  svg {
    margin-right: 4px;
    transform: translate(0, 1px);
  }
`;

const Canvas = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  /* background-color: gray; */
`;

const Popper = styled.div<{ ts: string }>`
  position: absolute;
  /* inset: 0px auto auto 0px; */
  transform: ${(props) => `translate(${props.ts})`};
`;

const View = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 256px;
  max-height: 600px;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 15%), 0 0 4px 0 rgb(0 0 0 / 40%);
  overflow: hidden;
  z-index: 999;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  padding: 8px;
  align-items: center;
  input {
    width: 100%;
    font-size: 14px;
    line-height: 24px;
    border: none;
    border-bottom: 1px solid transparent;
    outline: none;
    box-sizing: border-box;
    :focus {
      border-bottom: 1px solid #808080;
      transition: all 0.5s;
    }
  }
`;

const SuggestionWrapper = styled.div`
  flex-shrink: 0;
  padding: 4px 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

const DatePickerWrapper = styled.div`
  display: flex;
  padding: 8px;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
`;

const TimeSelectorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  padding: 8px;
  border-top: 1px solid #ddd;
  input {
    font-size: 14px;
    width: 80%;
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    :focus {
      outline: 1px solid #eee;
      transition: all 0.5s;
    }
  }
  button {
    font-size: 14px;
    :hover {
      color: #808080;
      background-color: transparent;
    }
  }
  div {
    width: 32px;
    height: 32px;
    line-height: 32px;
    svg {
      transform: translate(0, 2px);
      cursor: pointer;
      :hover {
        color: var(--main-color);
      }
    }
  }
`;

const kstGap = 9 * 60 * 60 * 1000;

const dayList = ['일', '월', '화', '수', '목', '금', '토'];

let originDate = new Date(),
  utc = originDate.getTime() + originDate.getTimezoneOffset() * 60 * 1000,
  kstDate: Date = new Date(utc + kstGap),
  thisDay: number,
  thisMonth: number,
  thisYear: number,
  thisHour: number,
  thisMinute: number,
  thisSecond: number;

function time() {
  originDate = new Date();
  utc = originDate.getTime() + originDate.getTimezoneOffset() * 60 * 1000;
  kstDate = new Date(utc + kstGap);
  thisDay = kstDate.getDate();
  thisMonth = kstDate.getMonth();
  thisYear = kstDate.getFullYear();
  thisHour = kstDate.getHours();
  thisMinute = kstDate.getMinutes();
  thisSecond = kstDate.getSeconds();

  console.log('time 함수 실행');
}

interface IProps {
  translate: string;
}

const Scheduler: React.FunctionComponent<IProps> = ({ translate }) => {
  const [view, setView] = useState(false);
  const [buttonText, setButtonText] = useState('마감시간');
  const [addTime, setAddTime] = useState(false);
  const [inputValue, setInputValue] = useState({ date: '', time: '' });
  const [dateInfo, setDateInfo] = useState({
    thisDay,
    thisMonth,
    thisYear,
    thisHour,
    thisMinute,
    thisSecond,
  });

  const handleView = () => {
    setView(!view);
  };

  const handleInputValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue({ ...inputValue, [key]: e.target.value });
    };

  const handleTimeWrapper = () => {
    setAddTime(!addTime);
  };

  const handleDeleteTime = () => {
    setInputValue({ ...inputValue, time: '' });
    handleTimeWrapper();
  };

  useEffect(() => {
    setInterval(time, 1000);
  }, []);
  return (
    <Container>
      <PopupButton onClick={handleView}>
        <FaRegCalendarAlt />
        {buttonText}
      </PopupButton>
      {view ? (
        <>
          <Canvas onClick={handleView}></Canvas>
          <Popper ts={translate}>
            <View>
              <InputWrapper>
                <input
                  onChange={handleInputValue('date')}
                  placeholder="마감 날짜 입력"
                  spellCheck="false"
                  value={inputValue.date}
                />
              </InputWrapper>
              <TimeSelectorWrapper>
                {addTime ? (
                  <>
                    <input
                      type="time"
                      onChange={handleInputValue('time')}
                      value={inputValue.time}
                    />
                    <div>
                      <FaRegTimesCircle onClick={handleDeleteTime} />
                    </div>
                  </>
                ) : (
                  <button onClick={handleTimeWrapper}>
                    + <b>시간 추가하기</b>
                  </button>
                )}
              </TimeSelectorWrapper>
              <SuggestionWrapper>
                <Suggestion
                  content="30분"
                  imageSource={`${process.env.PUBLIC_URL}/vote-it_LOGO1.ico`}
                  isFa={false}
                  faSource={-1}
                  dateInfo={`${thisHour} : ${thisMinute + 30}`}
                  setInputValue={setInputValue}
                />
                <Suggestion
                  content="오늘"
                  imageSource={`${process.env.PUBLIC_URL}/vote-it_LOGO1.ico`}
                  isFa={false}
                  faSource={-1}
                  dateInfo={`${dayList[thisDay]}`}
                  setInputValue={setInputValue}
                />
                <Suggestion
                  content="내일"
                  imageSource={`${process.env.PUBLIC_URL}/vote-it_LOGO1.ico`}
                  isFa={false}
                  faSource={-1}
                  dateInfo={`${dayList[thisDay + 1 === 7 ? 0 : thisDay + 1]}`}
                  setInputValue={setInputValue}
                />
                <Suggestion
                  content="이번 주말"
                  imageSource={`${process.env.PUBLIC_URL}/vote-it_LOGO1.ico`}
                  isFa={false}
                  faSource={-1}
                  dateInfo={`${dayList[6]}`}
                  setInputValue={setInputValue}
                />
                <Suggestion
                  content="날짜 지우기"
                  imageSource={'FaBan'}
                  isFa={true}
                  faSource={0}
                  dateInfo=""
                  setInputValue={setInputValue}
                />
              </SuggestionWrapper>
              <DatePickerWrapper>
                <SchedulerCalender />
              </DatePickerWrapper>
            </View>
          </Popper>
        </>
      ) : null}
    </Container>
  );
};

// 분단위, 시간단위

export default Scheduler;
