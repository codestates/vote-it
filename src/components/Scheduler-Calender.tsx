import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';
import { FaRegDotCircle, FaAngleRight, FaAngleLeft } from 'react-icons/fa';

const Container = styled.div`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  flex-direction: column;
  min-height: 192px;
`;

const YearNMonth = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  div {
    flex: 2 0 auto;
  }
  .calender-year-month-remote {
    flex: 1 0 auto;
    display: flex;
    div {
      flex: 1 0 auto;
    }
  }
  .calender-year-month-text {
    font-weight: bold;
  }
  .calender-year-month-button {
    margin: 4px 2px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    justify-content: center;
    border-radius: 12px;

    transform: translate(0, 2px);
    cursor: pointer;
    :hover {
      color: var(--main-color);
    }
    &.disabled {
      color: #808080;
      pointer-events: none;
      cursor: not-allowed;
      :hover {
        background-color: transparent;
      }
    }
    &.today {
      /* color: red; */
      font-size: 14px;
      /* position: absolute; */
      width: 24px;

      transform: translate(0, 1px);
      /* transform: translate(64px, -10px); */
      :hover {
        background-color: transparent;
      }
    }
  }
`;

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  .calender-dayName {
    font-size: 12px;
    padding: 8px;
    color: #808080;
    border-bottom: 1px solid var(--border-lighter);
  }
  .calender-day {
    height: 24px;
    margin: 4px;
    border-radius: 100px;
    cursor: pointer;
    :hover {
      background-color: var(--main-color-tint);
      color: white;
    }
  }
  .current-day {
    font-weight: 500;

    background-color: var(--main-color);
    color: white;
  }
  .selected {
    background-color: red;
    color: white;
  }
  .disabled {
    color: #808080;
    /* cursor: auto; */
  }
  .passed {
    color: var(--font-pale);
    cursor: auto;
    :hover {
      background-color: transparent;
      color: var(--font-pale);
    }
  }
`;

interface InputValue {
  date: string;
  time: string;
}

interface IProps {
  inputValue: InputValue;
  setInputValue: Dispatch<SetStateAction<InputValue>>;
}

// 달력 변수 시작
const originDate = new Date();
const utc = originDate.getTime() + originDate.getTimezoneOffset() * 60 * 1000;
const kstGap = 9 * 60 * 60 * 1000;
const today = new Date(utc + kstGap);
const thisDay = today.getDate();
const thisMonth = today.getMonth();
const thisYear = today.getFullYear();
let kstDate = new Date(utc + kstGap);

// 달력 변수 끝

const SchedulerCalender: React.FunctionComponent<IProps> = ({
  inputValue,
  setInputValue,
}) => {
  const [dateInfo, setDateInfo] = useState({ viewMonth: '' });
  const [dayList, setDayList] = useState<number[][]>([
    [31],
    [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28,
    ],
    [1, 2, 3, 4, 5, 6],
    [2],
    [2022],
  ]);
  const [inputDate, setInputDate] = useState({
    inputYear: 2022,
    inputMonth: 2,
    inputDay: 22,
  });
  const dateName = ['일', '월', '화', '수', '목', '금', '토'];
  const { date, time } = inputValue;
  const { inputYear, inputMonth, inputDay } = inputDate;
  // const [inputYear, inputMonth, inputDay] = [
  //   Number(date.slice(0, 4)),
  //   Number(date.slice(4, 6)),
  //   Number(date.slice(6, 8)),
  // ];

  const renderCalender = () => {
    const viewYear = kstDate.getFullYear();
    const viewMonth = kstDate.getMonth();

    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const prevDates: number[] = [];
    const thisDates: number[] = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates: number[] = [];

    if (PLDay !== 6) {
      for (let i = 0; i < PLDay + 1; i++) {
        prevDates.unshift(PLDate - i);
      }
    }

    for (let i = 1; i < 7 - TLDay; i++) {
      nextDates.push(i);
    }

    return [prevDates, thisDates, nextDates, [viewMonth], [viewYear]];
  };

  const handleMonth =
    (key: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      if (key === 0) {
        kstDate = new Date(utc + kstGap);
      } else kstDate.setMonth(kstDate.getMonth() + key);
      setDayList(renderCalender());
    };

  const handleDateSelected =
    (day: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      const month = dayList[3][0] + 1;
      const monthMod = month.toString().length === 1 ? `0${month}` : month;
      const dateValue = `${dayList[4][0]}${monthMod}${
        day.toString().length === 1 ? `0${day}` : day
      }`;
      setInputValue({ ...inputValue, date: dateValue });
    };

  useEffect(() => {
    setDayList(renderCalender());
  }, []);

  useEffect(() => {
    setInputDate({
      inputYear: Number(date.slice(0, 4)),
      inputMonth: Number(date.slice(4, 6)),
      inputDay: Number(date.slice(6, 8)),
    });
  }, [inputValue]);

  return (
    <Container>
      <YearNMonth>
        <div className="calender-year-month-text">
          {dayList[4][0]}년 {dayList[3][0] + 1}월
        </div>

        <div className="calender-year-month-remote">
          {thisMonth === dayList[3][0] && thisYear === dayList[4][0] ? (
            <div
              onClick={handleMonth(-1)}
              className="calender-year-month-button disabled"
            >
              <FaAngleLeft />
            </div>
          ) : (
            <div
              onClick={handleMonth(-1)}
              className="calender-year-month-button"
            >
              <FaAngleLeft />
            </div>
          )}

          <div
            onClick={handleMonth(0)}
            className="calender-year-month-button today"
          >
            <FaRegDotCircle />
          </div>
          <div onClick={handleMonth(1)} className="calender-year-month-button">
            <FaAngleRight />
          </div>
        </div>
      </YearNMonth>

      <Days className="calender">
        {dateName.map((v, i) => {
          return (
            <div key={i} className="calender-dayName">
              {v}
            </div>
          );
        })}
        {
          // 지난달
          dayList[0].map((v, i) => {
            if (thisMonth === dayList[3][0] && thisYear === dayList[4][0])
              return (
                <div key={i} className="calender-day passed">
                  {v}
                </div>
              );
            return (
              <div key={i} className="calender-day disabled">
                {v}
              </div>
            );
          })
        }
        {
          // 이번달
          dayList[1].map((v, i) => {
            if (
              v < thisDay &&
              thisMonth === dayList[3][0] &&
              thisYear === dayList[4][0]
            )
              return (
                <div key={i} className="calender-day passed">
                  {v}
                </div>
              );
            else if (
              v === inputDay &&
              dayList[3][0] + 1 === inputMonth &&
              dayList[4][0] === inputYear
            )
              return (
                <div
                  key={i}
                  onClick={handleDateSelected(v)}
                  className="calender-day selected"
                >
                  {v}
                </div>
              );
            else if (
              v === thisDay &&
              thisMonth === dayList[3][0] &&
              thisYear === dayList[4][0]
            )
              return (
                <div
                  key={i}
                  onClick={handleDateSelected(v)}
                  className="calender-day current-day"
                >
                  {v}
                </div>
              );
            else
              return (
                <div
                  key={i}
                  onClick={handleDateSelected(v)}
                  className="calender-day"
                >
                  {v}
                </div>
              );
          })
        }
        {
          // 다음달
          dayList[2].map((v, i) => {
            return (
              <div key={i} className="calender-day disabled">
                {v}
              </div>
            );
          })
        }
      </Days>
    </Container>
  );
};

export default SchedulerCalender;
