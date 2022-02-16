import React, { useState } from 'react';
import styled from 'styled-components';
import { Suggestion, SchedulerCalender } from './';

const Container = styled.div`
  padding: 4px;
`;

const PopupButton = styled.button`
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  :hover {
    background-color: #eee;
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
    /* outline: none; */
    cursor: pointer;
  }
`;

interface IProps {
  translate: string;
}

const Scheduler: React.FunctionComponent<IProps> = ({ translate }) => {
  const [view, setView] = useState(false);
  const [buttonText, setButtonText] = useState('마감시간');
  const [inputValue, setInputValue] = useState({ date: '', time: '' });

  const handleView = () => {
    setView(!view);
  };

  const handleInputValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue({ ...inputValue, [key]: e.target.value });
    };

  return (
    <Container>
      <PopupButton onClick={handleView}>{buttonText}</PopupButton>
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
                />
              </InputWrapper>
              <TimeSelectorWrapper>
                <input type="time" onChange={handleInputValue('time')} />
              </TimeSelectorWrapper>
              <SuggestionWrapper>
                <Suggestion content="30분" imageSource="주소" />
                <Suggestion content="오늘" imageSource="주소" />
                <Suggestion content="내일" imageSource="주소" />
                <Suggestion content="이번 주말" imageSource="주소" />
                <Suggestion content="날짜 지우기" imageSource="주소" />
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
