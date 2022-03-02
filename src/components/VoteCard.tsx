import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import '../fonts/font.css';
import { IPost } from '../lib/postList';

const VoteCardContainer = styled.div`
  grid-column: span 3;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  margin-top: 20px;
  background-color: var(--box-bg);
  box-shadow: -2px -2px 4px var(--box-shadow),
    3px 3px 8px var(--box-shadow-darker);
  transition: all 0.5s;

  cursor: pointer;
  &:hover {
    background: var(--box-bg-lighter);
    margin-top: 10px;
  }
  @media only screen and (max-width: 1200px) {
    grid-column: span 4;
  }

  @media only screen and (max-width: 768px) {
    grid-column: span 6;
  }

  @media only screen and (max-width: 500px) {
    flex-direction: row;
    min-height: 200px;
  }
`;

export const TitleBox = styled.div`
  background-image: url('https://cdn.discordapp.com/attachments/940138951770001421/940774921255129108/vote-it_LOGO1.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 55% auto;
  opacity: 0.8;
  width: 100%;
  flex: 1 1 200px;
  border-bottom: 1px solid var(--border-lightest);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'SBAggroM';
  text-shadow: var(--title-font-shadow);
  @media only screen and (max-width: 500px) {
    border-bottom: 0;
    border-right: 1px solid var(--border-lightest);
    opacity: 0.5;
  }
`;

const TitleCover = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  flex: 1 1 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
  width: 100%;
  /* height: 100%; */
  white-space: normal;
  word-break: break-all;
  @media only screen and (max-width: 501px) {
    /* display: none; */
    opacity: 0;
  }
`;

export const StyledBody = styled.div`
  flex: 1 1 200px;
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  > div {
    padding: 5px 0;
  }
`;

const HiddenTitle = styled.div`
  font-family: 'SBAggroM';
  font-size: large;
  white-space: normal;
  word-break: break-all;
  @media only screen and (min-width: 501px) {
    display: none;
  }
`;

const StyledNum = styled.div`
  font-family: 'IBMPlexSansKR-Light';
  @media only screen and (min-width: 501px) {
    font-size: large;
    font-weight: bold;
  }
`;

const StyledDate = styled.div`
  font-size: medium;
`;

const StyledName = styled.div`
  color: #808080;
  font-size: small;
`;

// interface Iprops {
//   id: number;
//   subject: string;
// }

//   id : "",
//   subject: "",
//   authorId: "",
//   isPrivate: "",
//   createdAt: "",
//   expirationDate: ""

export const VoteCard = ({
  id,
  subject,
  author,
  createdAt,
  expirationDate,
}: IPost) => {
  // const location = useLocation().state as IPost;
  const navigate = useNavigate();

  const OpenVoteHandler = () => {
    navigate(`/vote/${id}`, { state: id });
  };

  const timeMaker = (value: string) => {
    let date = new Date(value);
    let dateArr = date.toLocaleString().split(' ');
    return `${dateArr[3]} ${
      dateArr[4].split(':')[0] + ':' + dateArr[4].split(':')[1]
    } 까지`;
  };

  const dateMaker = (value: string) => {
    let date = new Date(value);
    let dateArr = date.toLocaleString().split('. ');
    return `${dateArr[0]}년 ${dateArr[1]}월 ${dateArr[2]}일`;
  };

  return (
    <VoteCardContainer onClick={OpenVoteHandler}>
      <TitleBox>
        <TitleCover>{subject}</TitleCover>
      </TitleBox>
      <StyledBody>
        <HiddenTitle>{subject}</HiddenTitle>
        <StyledNum>참여인원 45명</StyledNum>
        <StyledDate>시작일 {dateMaker(createdAt)}</StyledDate>
        <StyledDate>
          {!expirationDate
            ? expirationDate
            : '마감일 ' + dateMaker(expirationDate)}
        </StyledDate>
        <StyledDate>
          {!expirationDate ? expirationDate : timeMaker(expirationDate)}
        </StyledDate>
        <StyledName>{author}</StyledName>
      </StyledBody>
    </VoteCardContainer>
  );
};
