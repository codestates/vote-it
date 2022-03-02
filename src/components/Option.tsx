import React from 'react';
import styled from 'styled-components';

const OptionContainer = styled.div`
  grid-column: span 12;
  box-shadow: var(--option-shadow);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  height: 60px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    color: black;
    background: var(--option-hover);
  }
`;

interface Iprops {
  id: number;
  pollId: number;
  content: string;
  isVoted: boolean;
  voted: number[];
  VoteHandler: (optionId: number) => void;
  handleVotedCount: (id: number) => void;
}

export const Option = ({
  id,
  content,
  pollId,
  voted,
  isVoted,
  VoteHandler,
  handleVotedCount,
}: Iprops) => {
  return (
    <OptionContainer
      onClick={() => {
        VoteHandler(id);
        handleVotedCount(id);
        window.location.href = `/vote/${pollId}`;
      }}
      style={
        voted.includes(id) || isVoted
          ? {
              border: '5px solid #5D6DBE',
              color: '#5d6dbe',
              fontWeight: 'bold',
            }
          : {}
      }
    >
      {content}
    </OptionContainer>
  );
};
