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
  div {
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

  //!  날짜 데이터를 state를 재지정해서 뽑아올지, div태그 value값을 가져올지는 편한걸로 결정하심 될듯합니다

  //? 얘는 안쓸것같음. 판단 후 삭제
  const [dateInfo, setDateInfo] = useState({
    thisDay,
    thisMonth,
    thisYear,
    thisHour,
    thisMinute,
    thisSecond,
  });

  const [inputFocus, setInputFocus] = useState(false);

  const modifyButtonText = () => {
    //! 예정: Mod 함수 생성 후 날짜 별칭 사용할것임
    //! 아직 시간만 있을 경우의 로직 없음: 시간만 있을 경우에는 오늘날짜로 적용할것임
    const textMod =
      inputValue.date === '' && inputValue.time === ''
        ? '마감시간'
        : `${inputValue.date.slice(2, 4)}년 ${inputValue.date.slice(
            4,
            6,
          )}월 ${inputValue.date.slice(6, 8)}일 ${inputValue.time}`;
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
      setInputValue({ ...inputValue, [key]: e.target.value });
    };

  const handleOnInput = () => {};

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

  useEffect(() => {
    //! Suggestion 활용을 위한 매초단위 날짜정보 갱신
    setInterval(time, 1000);
  }, []);

  useEffect(() => {
    modifyButtonText();
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
                <div>
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
