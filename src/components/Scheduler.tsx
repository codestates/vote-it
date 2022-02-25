import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Suggestion, SchedulerCalender } from './';
import { FaRegCalendarAlt, FaRegTimesCircle } from 'react-icons/fa';
import { checkValidDate, setDateAlias } from '../functions';

const Container = styled.div`
  padding: 4px;
`;

const PopupButton = styled.button`
  padding: 4px 8px;
  color: var(--main-color);
  border: 1px solid var(--border);
  border-radius: 4px;
  background-color: var(--button-bg);
  cursor: pointer;
  :hover {
    background-color: var(--button-bg-lighter);
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
  background-color: var(--menu-bg);
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 15%), 0 0 4px 0 rgb(0 0 0 / 40%);
  overflow: hidden;
  z-index: 999;
`;

const InputWrapper = styled.div<{ focus: boolean }>`
  display: flex;
  flex-shrink: 0;
  padding: 6px;
  align-items: center;
  .input-wrapper {
    display: flex;
    flex: 1 0 auto;
    flex-shrink: 0;
    padding: 2px;
    align-items: center;
    border-bottom: ${(props) =>
      props.focus ? '1px solid #808080' : '1px solid transparent'};
    transition: all 0.5s;
  }
  svg {
    transform: translate(0, 2px);
    cursor: pointer;
    :hover {
      color: var(--main-color);
    }
  }
  input {
    /* display: inline-block; */
    width: 216px;
    font-size: 14px;
    line-height: 24px;
    border: none;
    border-bottom: 1px solid transparent;
    outline: none;
    box-sizing: border-box;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    /* :focus {
      border-bottom: 1px solid #808080;
      transition: all 0.5s;
    } */
  }
`;

const InputValidCheck = styled.div`
  top: 32px;
  position: absolute;
  font-size: 12px;
  color: red;
  padding: 4px;
  background-color: var(--box-bg);
  border: 1px solid var(--border);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 15%), 0 0 2px 0 rgb(0 0 0 / 40%);
  white-space: pre;
`;

const SuggestionWrapper = styled.div`
  flex-shrink: 0;
  padding: 4px 0;
  border-top: 1px solid var(--border-lighter);
  border-bottom: 1px solid var(--border-lightest);
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
  border-top: 1px solid var(--border-lightest);

  input {
    font-size: 14px;
    width: 80%;
    padding: 4px;
    border: 1px solid var(--border-lighter);
    border-radius: 4px;
    outline: none;
    cursor: pointer;

    :focus {
      outline: 1px solid var(--border-lightest);
      transition: all 0.5s;
    }

    ::-webkit-calendar-picker-indicator {
      cursor: grab;
      filter: invert(0.5);
    }
  }
  button {
    font-size: 14px;
    background-color: transparent;
    :hover {
      color: #808080;
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

//! 변수, 함수 시작
const kstGap = 9 * 60 * 60 * 1000;

const dayList = ['일', '월', '화', '수', '목', '금', '토'];

let originDate = new Date(),
  utc = originDate.getTime() + originDate.getTimezoneOffset() * 60 * 1000,
  kstDate: Date = new Date(utc + kstGap),
  thisDotw: number = kstDate.getDay(),
  thisDay: number = kstDate.getDate(),
  thisMonth: number = kstDate.getMonth() + 1,
  thisYear: number = kstDate.getFullYear(),
  thisHour: number,
  thisMinute: number,
  thisSecond: number,
  dateStr: string = `${thisYear}${
    thisMonth.toString().length === 1 ? `0${thisMonth}` : thisMonth
  }${thisDay.toString().length === 1 ? `0${thisDay}` : thisDay}`;

function time() {
  originDate = new Date();
  utc = originDate.getTime() + originDate.getTimezoneOffset() * 60 * 1000;
  kstDate = new Date(utc + kstGap);
  thisDotw = kstDate.getDay();
  thisDay = kstDate.getDate();
  thisMonth = kstDate.getMonth() + 1;
  thisYear = kstDate.getFullYear();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  thisHour = kstDate.getHours();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  thisMinute = kstDate.getMinutes();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  thisSecond = kstDate.getSeconds();
  dateStr = `${thisYear}${
    thisMonth.toString().length === 1 ? `0${thisMonth}` : thisMonth
  }${thisDay.toString().length === 1 ? `0${thisDay}` : thisDay}`;
}

function useInterval(cb: Function, delay: number) {
  const savedCallback = useRef<Function>();
  useEffect(() => {
    savedCallback.current = cb;
  }, [cb]);

  useEffect(() => {
    function tick() {
      if (typeof savedCallback.current === 'function') savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

//! 변수, 함수 끝

interface Calender {
  date: string;
  time: string;
}

interface IProps {
  translate: string;
  CalenderValueHandler: ({ date, time }: Calender) => void;
}

const Scheduler: React.FunctionComponent<IProps> = ({
  translate,
  CalenderValueHandler,
}) => {
  const [view, setView] = useState(false);
  const [buttonText, setButtonText] = useState('마감시간');
  const [addTime, setAddTime] = useState(false);
  const [inputValue, setInputValue] = useState({ date: '', time: '' });
  // 형식: {date: "20220222", time: "14:53"} => 22년 2월 22일 오후 2시 53분
  // DB 저장형식(datetime?): "20220222T14:53"

  const [inputFocus, setInputFocus] = useState(false);
  const [inputValidCheck, setInputValidCheck] = useState(true);

  const modifyButtonText = () => {
    const yearText = Number(inputValue.date.slice(0, 4));
    const monthText = Number(inputValue.date.slice(4, 6));
    const dayText = Number(inputValue.date.slice(6, 8));
    let textMod,
      dateMod = `${yearText}년 ${monthText}월 ${dayText}일`,
      timeMod = inputValue.time;
    const dateAlias = setDateAlias(yearText, monthText, dayText);
    if (dateAlias !== 'none') dateMod = dateAlias;
    if (inputValue.date === '') dateMod = '오늘';
    if (inputValue.time === '12:00') timeMod = '정오';
    if (inputValue.time === '00:00') timeMod = '자정';
    textMod =
      inputValue.date === '' && inputValue.time === ''
        ? '마감시간'
        : `${dateMod} ${timeMod}`;
    setButtonText(textMod);
  };

  const handleView = () => {
    if (!!view && !!inputValue) {
      CalenderValueHandler(inputValue);
    }
    setView(!view);
  };

  const handleInputValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (key === 'date') {
        const y = value.slice(0, 4);
        const m = value.slice(4, 6);
        const d = value.slice(6, 8);
        const leng = value.length;
        const validCheck = checkValidDate(y, m, d, leng);
        if (validCheck !== inputValidCheck) {
          // console.log('validcheck');
          setInputValidCheck(validCheck);
        }
      }
      setInputValue({ ...inputValue, [key]: value });
    };

  const handleInputFocus = () => {
    setInputFocus(true);
  };
  const handleInputBlur = () => {
    setInputFocus(false);
    modifyButtonText();
  };

  const handleTimeWrapper = () => {
    setAddTime(!addTime);
  };

  const handleDeleteDate = () => {
    setInputValue({ ...inputValue, date: '' });
  };

  const handleDeleteTime = () => {
    setInputValue({ ...inputValue, time: '' });
    handleTimeWrapper();
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e.key);
    if (e.key === 'Escape') setView(false);
  };

  useInterval(() => {
    time();
  }, 1000);

  useEffect(() => {
    modifyButtonText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  //! 팝업버튼 이미지는 맘에 드는걸로 바꾸셔도됨
  return (
    <Container onKeyUp={handleKeyUp}>
      <PopupButton onClick={handleView}>
        <FaRegCalendarAlt />

        {buttonText}
      </PopupButton>
      {view ? (
        <>
          <Canvas onClick={handleView}></Canvas>
          <Popper ts={translate}>
            <View>
              <InputWrapper focus={inputFocus}>
                <div className="input-wrapper">
                  <input
                    type="number"
                    pattern="[0-9]+"
                    // onInput={handleOnInput}: ValidCheck
                    onChange={handleInputValue('date')}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onSubmit={modifyButtonText}
                    placeholder="마감 날짜 입력"
                    spellCheck="false"
                    value={inputValue.date}
                  />
                  {inputValue.date === '' ? null : (
                    <FaRegTimesCircle onClick={handleDeleteDate} />
                  )}
                </div>
                {inputValidCheck ? null : (
                  <InputValidCheck>
                    올바른 날짜를 기입해주세요: 'yyyymmdd'
                  </InputValidCheck>
                )}
              </InputWrapper>
              <TimeSelectorWrapper>
                {addTime ? (
                  <>
                    <input
                      type="time"
                      onChange={handleInputValue('time')}
                      onSelect={modifyButtonText}
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
                  content="오늘"
                  imageSource={`${process.env.PUBLIC_URL}/vote-it_LOGO1.ico`}
                  isFa={false}
                  faSource={-1}
                  dateInfo={{
                    dotw: `${dayList[thisDotw]}`,
                    date: dateStr,
                    mod: 0,
                    time: '',
                  }}
                  setInputValue={setInputValue}
                />
                <Suggestion
                  content="내일"
                  imageSource={`${process.env.PUBLIC_URL}/vote-it_LOGO1.ico`}
                  isFa={false}
                  faSource={-1}
                  dateInfo={{
                    dotw: `${dayList[thisDotw + 1 === 7 ? 0 : thisDotw + 1]}`,
                    date: dateStr,
                    mod: 1,
                    time: '',
                  }}
                  setInputValue={setInputValue}
                />
                <Suggestion
                  content="이번 주말"
                  imageSource={`${process.env.PUBLIC_URL}/vote-it_LOGO1.ico`}
                  isFa={false}
                  faSource={-1}
                  dateInfo={{
                    dotw: `${dayList[6]}`,
                    date: dateStr,
                    mod: 6 - thisDotw,
                    time: '',
                  }}
                  setInputValue={setInputValue}
                />
                <Suggestion
                  content="일주일"
                  imageSource={`${process.env.PUBLIC_URL}/vote-it_LOGO1.ico`}
                  isFa={false}
                  faSource={-1}
                  dateInfo={{
                    dotw: `${dayList[thisDotw]}`,
                    date: dateStr,
                    mod: 7,
                    time: '',
                  }}
                  setInputValue={setInputValue}
                />
                <Suggestion
                  content="지우기"
                  imageSource={'FaBan'}
                  isFa={true}
                  faSource={0}
                  dateInfo={{
                    dotw: '',
                    date: '',
                    mod: 0,
                    time: '',
                  }}
                  setInputValue={setInputValue}
                />
              </SuggestionWrapper>
              <DatePickerWrapper>
                <SchedulerCalender
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
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
