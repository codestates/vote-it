import React from 'react';
import styled from 'styled-components';

const OptionContainer = styled.div`
  grid-column: span 12;
  border: 1px solid #dbdbdb;
  box-shadow: rgb(0 0 0 / 20%) 0px 5px 5px -3px,
    rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  height: 60px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background: #dbdbdb;
  }
`;

interface Iprops {
  id: number;
  content: string;
  voted: number;
  VoteHandler: (optionId: number) => void;
}

export const Option = ({ id, content, voted, VoteHandler }: Iprops) => {
  return (
    <OptionContainer
      onClick={() => {
        VoteHandler(id);
      }}
      style={
        voted === id
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
