import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Scheduler } from '../components';

const Container = styled.div`
  background-color: #fdfdfd;
  display: flex;
`;
const CenterContainer = styled.div`
  width: 70vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.textarea`
  &:focus {
    outline: none;
  }
  box-shadow: -2px -2px 4px #f8f8f8, 3px 3px 6px rgb(184, 184, 184);
  border-radius: 20px;
  font-size: 18px;
  padding: 20px;
  width: 90%;
  height: 40px;
  margin: 0 auto;
  margin-top: 30px;
  border: none;
  resize: none;
`;
const OptionContainer = styled.div`
  overflow: scroll;
  margin-top: 30px;
  width: 100%;
  display: flex;
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
  flex-direction: column;
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
  margin: 0 auto;
  font-size: 20px;
  border: none;
  width: 50vw;
  height: 35px;
  border-radius: 15px;
  color: white;
  box-shadow: -2px -2px 4px #f8f8f8, 3px 3px 6px rgb(184, 184, 184);
  background-color: #6481d3;
`;
function CreateVote() {
  const [calendarValue, setCalendarValue] = useState('');
  const [title, setTitle] = useState('');
  const [optionList, setOptionList] = useState<string[]>([]);
  const [option, setOption] = useState('');
  const [PlusBtn, setPlusBtn] = useState(false);

  const onChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTitle(value);
  };
  const onChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOption(value);
  };
  const PlusOptionInput = () => {
    if (option !== '' && !optionList.includes(option)) {
      const newList = [...optionList, option];
      setOptionList(newList);
      setPlusBtn(true);
      setOption('');
    }
  };
  const PlusOption = () => {
    setPlusBtn(!PlusBtn);
  };

  const DelBtn = (option: string) => {
    const newList = optionList.filter((op) => {
      if (option !== op) {
        return true;
      }
      return false;
    });
    setOptionList(newList);
  };

  const dateSelect = () => {};

  return (
    <Container>
      <CenterContainer>
        <Title placeholder="질문 내용" value={title} onChange={onChangeTitle} />
        <OptionContainer>
          {optionList.length === 0 ? (
            <Option>
              <OptionInput
                placeholder="선택지 입력"
                value={option}
                onChange={onChangeOption}
              />
              <PlusOptionBtn
                style={{ marginTop: '5px', backgroundColor: 'white' }}
                onClick={PlusOptionInput}
              >
                <FaPlus style={{ color: '#5D6DBE' }} />
              </PlusOptionBtn>
            </Option>
          ) : (
            optionList.map((option, index) => {
              return (
                <Option key={index}>
                  <OptionText>{option}</OptionText>
                  <DelOptionBtn onClick={() => DelBtn(option)}>
                    <FaMinus style={{ color: 'red' }} />
                  </DelOptionBtn>
                </Option>
              );
            })
          )}
          {PlusBtn ? (
            <PlusOptionBtn onClick={PlusOption}>
              <FaPlus style={{ color: 'white' }} />
            </PlusOptionBtn>
          ) : optionList.length !== 0 ? (
            <Option>
              <OptionInput
                placeholder="선택지 입력"
                value={option}
                onChange={onChangeOption}
              />
              <PlusOptionBtn
                style={{ marginTop: '5px', backgroundColor: 'white' }}
                onClick={PlusOptionInput}
              >
                <FaPlus style={{ color: '#5D6DBE' }} />
              </PlusOptionBtn>
            </Option>
          ) : null}
        </OptionContainer>
        <CheckboxContainer>
          <CheckboxAndTitle>
            <Checkbox type={'checkbox'} />
            <CheckboxTitle>중복 체크 여부</CheckboxTitle>
          </CheckboxAndTitle>
          <CheckboxAndTitle>
            <Checkbox type={'checkbox'} />
            <CheckboxTitle>비공개</CheckboxTitle>
          </CheckboxAndTitle>
          {/* <CalendarBtn
            type="date"
            onChange={dateSelect}
            value={calendarValue}
          ></CalendarBtn> */}
          <Scheduler translate={'0, -800px'} />
        </CheckboxContainer>
        <CreateBtn>투표만들기</CreateBtn>
      </CenterContainer>
    </Container>
  );
}

export default CreateVote;
