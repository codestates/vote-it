import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Scheduler } from '../components';
import '../fonts/font.css';

const Outer = styled.div`
  font-family: 'EliceDigitalBaeum_Regular';
  padding-top: 48px;
  background-color: #fdfdfd;
  display: flex;
  width: 100%;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  width: 1200px;
  display: grid;
  height: 100vh;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  align-items: center;
  @media only screen and (max-width: 1200px) {
    width: 768px;
  }
  @media only screen and (max-width: 768px) {
    width: 500px;
  }
  @media only screen and (max-width: 500px) {
    width: 360px;
    grid-template-columns: repeat(6, 1fr);
    column-gap: 16px;
  }
`;

const SubBox = styled.div`
  grid-column: 2 / span 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 500px) {
    grid-column: span 6;
  }
`;

const Title = styled.textarea`
  &:focus {
    outline: none;
  }
  font-family: 'SUIT-Light';
  box-shadow: -2px -2px 4px #f8f8f8, 3px 3px 6px rgb(184, 184, 184);
  border-radius: 20px;
  font-size: 18px;
  padding: 20px;
  width: 90%;
  height: 40px;
  margin-top: 30px;
  border: none;
  resize: none;
`;
const OptionContainer = styled.div`
  overflow-y: scroll;
  margin-top: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 50%;
  padding: 10px;
`;
const Option = styled.div`
  box-shadow: -2px -2px 4px #f8f8f8, 3px 3px 6px rgb(184, 184, 184);
  display: flex;
  margin: 0 auto;

  margin-top: 10px;
  width: 95%;
  background-color: white;
  border-radius: 15px;
  padding: 5px;
`;
const OptionInput = styled.input`
  font-family: 'SUIT-Light';
  &:focus {
    outline: none;
  }

  height: 40px;
  width: 90%;
  padding-left: 10px;
  border: none;
`;
const OptionText = styled.div`
  height: 40px;
  width: 90%;
  padding-left: 10px;
  line-height: 40px;
`;
const DelOptionBtn = styled.button`
  all: unset;
  /* margin-right: 10px; */
`;
const PlusOptionBtn = styled.button`
  border: none;
  margin: 0 auto;
  margin-top: 10px;
  width: 50px;
  min-height: 40px;
  border-radius: 20px;
  background-color: #5d6dbe;
`;
const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;
const CheckboxAndTitle = styled.div`
  display: flex;
  margin: 10px;
`;
const Checkbox = styled.input``;
const CheckboxTitle = styled.div``;
const CalendarBtn = styled.input`
  border: none;
  height: 38px;
  margin: 10px;
`;

const CreateBtn = styled.button`
  font-family: 'KOHIBaeumOTF';
  margin: 0 auto;
  font-size: 20px;
  border: none;
  max-width: 300px;
  width: 50vw;
  height: 40px;
  margin-top: 30px;
  border-radius: 15px;
  color: white;
  box-shadow: -2px -2px 4px #f8f8f8, 3px 3px 6px rgb(184, 184, 184);
  background-color: #6481d3;
`;
function CreateVote() {
  const [calendarValue, setCalendarValue] = useState('');
  const [title, setTitle] = useState('');
  const [optionList, setOptionList] = useState<string[]>(['', '', '', '']);
  const [option, setOption] = useState('');

  const onChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTitle(value);
  };
  const onChangeOption = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    setOption(value);

    setOptionList([
      ...optionList.slice(undefined, index),
      value,
      ...optionList.slice(index + 1),
    ]);
  };

  const PlusOption = () => {
    // setPlusBtn(!PlusBtn);
    setOptionList([...optionList, '']);
  };

  const DelBtn = (index: number) => {
    const newList = optionList.filter((str, num) => {
      if (index === num) {
        return false;
      }
      return true;
    });
    setOptionList(newList);
  };

  const dateSelect = () => {};

  return (
    <Outer>
      <Container>
        <SubBox>
          <Title
            placeholder="질문 내용"
            value={title}
            onChange={onChangeTitle}
          />

          {/* option section */}

          <OptionContainer>
            {optionList.map((el, index) => {
              return (
                <Option key={index}>
                  <OptionInput
                    placeholder="선택지 입력"
                    value={optionList[index]}
                    onChange={(e) => onChangeOption(e, index)}
                  />
                  <DelOptionBtn onClick={() => DelBtn(index)}>
                    <FaMinus style={{ color: 'red' }} />
                  </DelOptionBtn>
                </Option>
              );
            })}
            <PlusOptionBtn onClick={PlusOption}>
              <FaPlus style={{ color: 'white' }} />
            </PlusOptionBtn>
          </OptionContainer>

          {/* checkbox & calendar section */}

          <CheckboxContainer>
            <div>
              <CheckboxAndTitle>
                <Checkbox type={'checkbox'} />
                <CheckboxTitle>중복 체크 여부</CheckboxTitle>
              </CheckboxAndTitle>
              <CheckboxAndTitle>
                <Checkbox type={'checkbox'} />
                <CheckboxTitle>비공개</CheckboxTitle>
              </CheckboxAndTitle>
            </div>
            {/* <CalendarBtn
            type="date"
            onChange={dateSelect}
            value={calendarValue}
          ></CalendarBtn> */}
            <Scheduler translate={'0, -650px'} />
          </CheckboxContainer>
          <CreateBtn>투표만들기</CreateBtn>
        </SubBox>
      </Container>
    </Outer>
  );
}

export default CreateVote;
