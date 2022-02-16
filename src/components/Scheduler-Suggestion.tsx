import styled from 'styled-components';

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

interface IProps {
  content: string;
  imageSource: string;
}

const Suggestion: React.FunctionComponent<IProps> = ({
  content,
  imageSource,
}) => {
  return (
    <ButtonContainer>
      <div className="scheduler-suggestions-icon">
        <img src={`${process.env.PUBLIC_URL}/vote-it_LOGO1.ico`} alt="icon" />
      </div>
      <div className="scheduler-suggestions-label">{content}</div>
      <div className="scheduler-suggestions-alias">수</div>
    </ButtonContainer>
  );
};

export default Suggestion;
