import styled from 'styled-components';
import { FaBan } from 'react-icons/fa';
import { Dispatch, SetStateAction } from 'react';

const ButtonContainer = styled.button`
  display: flex;
  font-size: 14px;
  align-items: center;
  padding: 4px 12px;
  line-height: 24px;
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

interface IProps {
  content: string;
  imageSource: string;
  isFa: boolean;
  faSource: number;
  dateInfo: string;
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
  return (
    <ButtonContainer onClick={() => setInputValue({ date: '', time: '' })}>
      <div className="scheduler-suggestions-icon">
        {isFa ? faList[faSource] : <img src={imageSource} alt="icon" />}
      </div>
      <div className="scheduler-suggestions-label">{content}</div>
      <div className="scheduler-suggestions-alias">{dateInfo}</div>
    </ButtonContainer>
  );
};

export default Suggestion;
