import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
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
    margin: 4px 16px;
    height: 24px;
    line-height: 24px;
    justify-content: center;
    border-radius: 12px;
    cursor: pointer;
    :hover {
      background-color: #eee;
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
    cursor: pointer;
  }
  .current-day {
    font-weight: 500;
    border-radius: 100px;
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
  }
`;

interface IProps {}

// 달력 변수 시작
// const date = new Date();
// const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
// const kstGap = 9 * 60 * 60 * 1000;
// const today = new Date(utc + kstGap);
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

// console.log(curDate, curMonth, curYear, today);

// console.log(prevDate, prevDay, nextDate, nextDay);

const SchedulerCalender: React.FunctionComponent<IProps> = () => {
  const [date, setDate] = useState(new Date());
  const [utc, setUtc] = useState(
    date.getTime() + date.getTimezoneOffset() * 60 * 1000,
  );
  const [kstGap, setKstGap] = useState(9 * 60 * 60 * 1000);
  const [today, setToday] = useState(new Date(utc + kstGap));
  const [thisMonth, setThisMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate()),
  );
  const [curYear, setCurYear] = useState(thisMonth.getFullYear());
  const [curMonth, setCurMonth] = useState(thisMonth.getMonth() + 1);
  const [curDate, setCurDate] = useState(thisMonth.getDate());
  const [startDay, setStartDay] = useState(new Date(curYear, curMonth, 0));
  const [endDay, setEndDay] = useState(new Date(curYear, curMonth + 1, 0));
  const [prevDate, setPrevDate] = useState(startDay.getDate());
  const [prevDay, setPrevDay] = useState(startDay.getDay());
  const [nextDate, setNextDate] = useState(endDay.getDate());
  const [nextDay, setNextDay] = useState(endDay.getDay());
  const [prevMonthList, setPrevMonthList] = useState<number[]>([]);
  const [curMonthList, setCurMonthList] = useState<number[]>([]);
  const [nextMonthList, setNextMonthList] = useState<number[]>([]);
  const [dateName, setDateName] = useState([
    '일',
    '월',
    '화',
    '수',
    '목',
    '금',
    '토',
  ]);

  const handleDateInfo = () => {
    Promise.resolve()
      .then(() => {
        setCurYear(thisMonth.getFullYear());
        setCurMonth(thisMonth.getMonth());
        setCurDate(thisMonth.getDate());
      })
      .then(() => {
        setStartDay(new Date(curYear, curMonth, 0));
        setEndDay(new Date(curYear, curMonth + 1, 0));
      })
      .then(() => {
        setPrevDate(startDay.getDate());
        setPrevDay(startDay.getDay());
        setNextDate(endDay.getDate());
        setNextDay(endDay.getDay());
      });
  };
  const handleList = () => {
    const prevList = [];
    const curList = [];
    const nextList = [];
    for (let i = prevDate - prevDay; i <= prevDate; i++) {
      prevList.push(i);
    }
    for (let i = 1; i <= nextDate; i++) {
      curList.push(i);
    }
    for (let i = 1; i <= (7 - nextDay === 7 ? 0 : 6 - nextDay); i++) {
      nextList.push(i);
    }
    setPrevMonthList([...prevList]);
    setCurMonthList([...curList]);
    setNextMonthList([...nextList]);
  };

  const handleMonth =
    (key: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      setPrevMonthList([]);
      setCurMonthList([]);
      setNextMonthList([]);

      Promise.resolve()
        .then(() => {
          setThisMonth(new Date(curYear, curMonth + key, 1));
        })
        .then(() => {
          handleDateInfo();
        })
        .then(() => {
          handleList();
        });
    };

  useEffect(() => {
    handleList();
  }, []);

  return (
    <Container>
      <YearNMonth>
        <div onClick={handleMonth(-1)} className="calender-year-month-button">
          &lt;
        </div>
        <div className="calender-year-month-text">
          {curYear}년 {curMonth}월
        </div>
        <div onClick={handleMonth(1)} className="calender-year-month-button">
          &gt;
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
        {prevMonthList.map((v, i) => {
          if (curMonth === curMonth)
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
        })}
      </Days>
    </Container>
  );
};

export default SchedulerCalender;
