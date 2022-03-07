import React, { Dispatch, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ noticeOn: boolean }>`
  position: fixed;
  z-index: 9999;
  bottom: 16px;
  left: 24px;
  visibility: ${(props) => (props.noticeOn ? 'visible' : 'hidden')};
  transform: ${(props) =>
    props.noticeOn ? 'translateY(0)' : 'translateY(100px)'};
  transition: all 0.3s ease-out;
  div {
    user-select: none;
    border-radius: 8px;
    padding: 8px 16px;
    background-color: var(--menu-bg);
  }
`;

interface Props {
  noticeOn: boolean;
  setNoticeOn: Dispatch<React.SetStateAction<boolean>>;
}

export const KeyNotice = ({ noticeOn, setNoticeOn }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      setNoticeOn(false);
    }, 3000);
  }, []);
  return (
    <Container noticeOn={noticeOn} onClick={() => setNoticeOn(false)}>
      <div>' / ' 키를 눌러 검색해보세요</div>
    </Container>
  );
};
