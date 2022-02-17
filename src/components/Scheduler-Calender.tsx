import React, { useEffect, useState } from 'react';
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
`;

const YearNMonth = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  div {
    flex: auto;
  }
  .calender-year-month-text {
    font-weight: bold;
  }
  .calender-year-month-button {
    margin: 4px 2px;
    height: 24px;
    line-height: 24px;
    justify-content: center;
    border-radius: 12px;
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
    border-bottom: 1px solid #ddd;
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
  .disabled {
    color: #808080;
    /* cursor: auto; */
  }
  .passed {
    color: #eee;
    cursor: auto;
    :hover {
      background-color: transparent;
      color: #eee;
    }
  }
`;

interface IProps {}

// 달력 변수 시작
const originDate = new Date();
const utc = originDate.getTime() + originDate.getTimezoneOffset() * 60 * 1000;
const kstGap = 9 * 60 * 60 * 1000;
const today = new Date(utc + kstGap);
const thisDay = today.getDate();
const thisMonth = today.getMonth();
const thisYear = today.getFullYear();
let kstDate = new Date(utc + kstGap);
// let thisMonth = new Date(
//   today.getFullYear(),
//   today.getMonth(),
//   today.getDate(),
// );
// let curYear = thisMonth.getFullYear();
// let curMonth = thisMonth.getMonth() + 1;
// let curDate = thisMonth.getDate();
// const startDay = new Date(curYear, curMonth, 0);

// 달력 변수 끝

const renderCalender = () => {
  const viewYear = kstDate.getFullYear();
  const viewMonth = kstDate.getMonth();

  const yearMonthText = document.querySelector(
    '.calender-year-month-text',
  ) as HTMLParagraphElement;
  yearMonthText.textContent = `${viewYear}년 ${viewMonth + 1}월`;

  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  const prevDates: (string | number)[] = [];
  const thisDates: (string | number)[] = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates: (string | number)[] = [];

  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  prevDates.forEach((date, i) => {
    if (viewMonth === thisMonth && viewYear === thisYear)
      prevDates[i] = `<div class="calender-day passed">${date}</div>`;
    else prevDates[i] = `<div class="calender-day disabled">${date}</div>`;
  });
  thisDates.forEach((date, i) => {
    if (date < thisDay && viewMonth === thisMonth && viewYear === thisYear)
      thisDates[i] = `<div class="calender-day passed">${date}</div>`;
    else if (
      date === thisDay &&
      thisMonth === viewMonth &&
      viewYear === thisYear
    )
      thisDates[i] = `<div class="calender-day current-day">${date}</div>`;
    else thisDates[i] = `<div class="calender-day">${date}</div>`;
  });
  nextDates.forEach((date, i) => {
    nextDates[i] = `<div class="calender-day disabled">${date}</div>`;
  });

  const dates = prevDates.concat(thisDates, nextDates);

  const dayText = document.querySelector('.calender') as HTMLParagraphElement;
  dayText.innerHTML = dates.join('');

  const buttonText = document.querySelector(
    '.calender-year-month-button',
  ) as HTMLParagraphElement;
  if (thisMonth === viewMonth && thisYear === viewYear) {
    buttonText.classList.add('disabled');
  } else buttonText.classList.remove('disabled');
};

const SchedulerCalender: React.FunctionComponent<IProps> = () => {
  const [dateInfo, setDateInfo] = useState({ viewMonth: '' });
  const dateName = ['일', '월', '화', '수', '목', '금', '토'];

  const handleMonth =
    (key: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      if (key === 0) {
        kstDate = new Date(utc + kstGap);
      } else kstDate.setMonth(kstDate.getMonth() + key);
      renderCalender();
    };

  useEffect(() => {
    renderCalender();
  }, []);

  return (
    <Container>
      <YearNMonth>
        <div className="calender-year-month-text">
          {/* {todayYear}년 {todayMonth + 1}월 */}
        </div>
        <div onClick={handleMonth(-1)} className="calender-year-month-button">
          <FaAngleLeft />
        </div>
        <div
          onClick={handleMonth(0)}
          className="calender-year-month-button today"
        >
          <FaRegDotCircle />
        </div>
        <div onClick={handleMonth(1)} className="calender-year-month-button">
          <FaAngleRight />
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
        {/* {prevMonthList.map((v, i) => {
          // if (curMonth === curMonth)
          //   return (
          //     <div key={i} className="calender-day passed">
          //       {v}
          //     </div>
          //   );
          return (
            <div key={i} className="calender-day disabled">
              {v}
            </div>
          );
        })}
        {curMonthList.map((v, i) => {
          if (v === curDate)
            return (
              <div key={i} className="calender-day current-day">
                {v}
              </div>
            );
          else if (v < curDate)
            return (
              <div key={i} className="calender-day passed">
                {v}
              </div>
            );
          return (
            <div key={i} className="calender-day">
              {v}
            </div>
          );
        })}
        {nextMonthList.map((v, i) => {
          return (
            <div key={i} className="calender-day disabled">
              {v}
            </div>
          );
        })} */}
      </Days>
    </Container>
  );
};

export default SchedulerCalender;
