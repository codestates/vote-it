import styled from 'styled-components';
import { FaBan } from 'react-icons/fa';
import { Dispatch, SetStateAction } from 'react';
import { dateInfoMod } from '../functions';

const ButtonContainer = styled.button`
  display: flex;
  font-size: 14px;
  align-items: center;
  padding: 4px 12px;
  line-height: 24px;
  background-color: var(--box-bg);
  outline: none;
  width: 100%;

  .scheduler-suggestions-icon {
    display: flex;
    position: relative;
    margin-right: 8px;
    img {
      width: 18px;
      height: 18px;
      margin: auto;
    }
    svg {
      ${(props) => (props.color ? 'color: ' + props.color : '')}
      width: 18px;
      height: 18px;
      margin: auto;
    }
  }
  .scheduler-suggestions-label {
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-right: 4px;
  }
  .scheduler-suggestions-alias {
    margin-left: auto;
    color: #808080;
  }
`;

interface InputValue {
  time: string;
  date: string;
}

interface DateInfo {
  dotw: string;
  time: string;
  date: string;
  mod: number;
}

interface IProps {
  content: string;
  imageSource: string;
  isFa: boolean;
  faSource: number;
  dateInfo: DateInfo;
  setInputValue: Dispatch<SetStateAction<InputValue>>;
}

const Suggestion: React.FunctionComponent<IProps> = ({
  content,
  imageSource,
  isFa,
  faSource,
  dateInfo,
  setInputValue,
}) => {
  const faList = [<FaBan color="gray" />];
  //! 개선점: dateInfoMod 함수가 4번씩(컴포넌트 갯수만큼) 실행되는 문제
  //! 코드를 잘못 이해하고있나? 버튼 onclick 이벤트에서 mod 변수 불러올 때도 함수가 4번씩 실행됨
  const mod =
    dateInfo.date === '' ? '' : dateInfoMod(dateInfo.date, dateInfo.mod);
  return (
    <ButtonContainer
      onClick={() => setInputValue({ date: mod, time: dateInfo.time })}
    >
      <div className="scheduler-suggestions-icon">
        {isFa ? faList[faSource] : <img src={imageSource} alt="icon" />}
      </div>
      <div className="scheduler-suggestions-label">{content}</div>
      <div className="scheduler-suggestions-alias">{dateInfo.dotw}</div>
    </ButtonContainer>
  );
};

export default Suggestion;
