import React from 'react';
import styled from 'styled-components';
import { FaChevronUp } from 'react-icons/fa';

const FloatingBtn = styled.div`
  position: fixed;
  line-height: 55px;
  bottom: 40px;
  right: 40px;
  width: 50px;
  height: 50px;
  border-radius: 30px;
  background-color: #5d6dbe;
  box-shadow: -2px -2px 4px #f8f8f8, 3px 3px 6px rgb(184, 184, 184);
  cursor: pointer;
`;

function FloatBtn() {
  return (
    <div>
      <FloatingBtn>
        <FaChevronUp style={{ fontSize: '25px', color: 'white' }} />
      </FloatingBtn>
    </div>
  );
}

export default FloatBtn;
