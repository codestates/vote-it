import React, { Dispatch, SetStateAction, useRef } from 'react';
import styled from 'styled-components';
import { copyClipboard } from '../functions';
import { FaRegCopy } from 'react-icons/fa';
import { share2info } from '../lib/share2info';

const Canvas = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.5s;
  &.show {
    opacity: 1;
  }
`;

const View = styled.div`
  --shareModal-width: 400px;
  --shareModal-height: 256px;
  display: flex;
  font-family: 'SUIT-Light';
  flex-direction: column;
  position: absolute;
  left: calc(50vw - var(--shareModal-width) / 2);
  top: calc(50vh - var(--shareModal-height) / 2);
  height: var(--shareModal-height);
  width: var(--shareModal-width);
  color: var(--font);
  background-color: var(--modal-bg);
  border-radius: 16px;
  /* border: var(--modal-border); */
  box-shadow: -1px -1px 1px var(--box-shadow),
    2px 2px 6px var(--box-shadow-darker);
  z-index: 999;
  opacity: 0;
  transition: all 0.5s;
  &.show {
    opacity: 1;
  }

  .subject {
    text-align: left;
    font-size: 18px;
    font-weight: bold;
    flex: 1 0 auto;
    margin: 16px;
    .exit {
      font-weight: normal;
      font-size: 18px;
      width: 24px;
      height: 24px;
      text-align: center;
      float: right;
      transform: translate(4px, -4px);
      cursor: pointer;
    }
  }
  .wrapper {
    flex: 2 0 auto;
    margin: 16px;
    &.first {
      margin-top: 8px;
      margin-bottom: 0;
      flex: 4 0 auto;
      .share2sns {
        display: flex;
        overflow-x: hidden;
      }
      img {
        width: 60px;
      }
    }

    &.second {
      padding-top: 16px;
      border-top: 1px solid var(--border-lighter);
    }
  }
  .input-wrapper {
    margin: auto;
    padding: 0 4px;
    border: 1px solid var(--border-lighter);
    border-radius: 8px;
    width: fit-content;
  }
  input {
    font-family: 'SUIT-Light';
    width: 256px;
    margin: 4px;
    padding: 4px;
    font-size: 16px;
    border: none;
    border-right: 1px solid var(--border-lighter);
  }
  button {
    width: 24px;
    height: 24px;
    margin: 4px;
    font-size: 16px;
    transform: translate(0, 2px);
    border-radius: 100px;
    background-color: transparent;
    :hover {
      color: var(--font-lighter);
      background-color: transparent;
    }
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }
`;

const ShareToSNS = styled.div`
  user-select: none;
  font-size: 0.8rem;
  margin: 0 4px;
  padding: 8px;
  border-radius: 8px;
  white-space: pre;
  cursor: pointer;
  :hover {
    background-color: var(--button-bg-lighter);
  }
  div {
    display: table-cell;
    margin-top: 4px;
    width: 60px;
    height: 32px;
    text-align: center;
    align-items: center;
    vertical-align: middle;
  }
`;

interface ShareModal {
  isOn: boolean;
  isShow: boolean;
}

interface Props {
  shareModal: ShareModal;
  setShareModal: Dispatch<SetStateAction<ShareModal>>;
}

export const Share = ({ shareModal, setShareModal }: Props) => {
  const copyUrlRef = useRef(null);
  const urlValue = window.location.href;
  const copyUrl = () => {
    copyClipboard(
      urlValue,
      () => {
        // 성공했을 경우 Toast 메시지 팝업
        console.log('링크 복사됨');
      },
      () => {
        // 실패했을 경우 Toast 메시지 팝업
        console.log('복사 실패, 다시 시도해주새오');
      },
    );
  };

  const setModalOff = () => {
    setShareModal({ isOn: false, isShow: false });
  };

  const handleShare2sns =
    (idx: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      console.log(idx + '번');
    };
  return (
    <>
      <Canvas
        onClick={setModalOff}
        className={shareModal.isShow ? 'canvas show' : 'canvas'}
      />
      <View className={shareModal.isShow ? 'view show' : 'view'}>
        <div className="subject">
          공유
          <div className="exit" onClick={setModalOff}>
            &times;
          </div>
        </div>
        <div className="wrapper first">
          <div className="share2sns">
            {share2info.map((v, i) => {
              return (
                <ShareToSNS onClick={handleShare2sns(i)}>
                  <img src={v.src} alt={v.alt} />
                  <div>{v.name}</div>
                </ShareToSNS>
              );
            })}
          </div>
        </div>
        <div className="wrapper second">
          <div className="input-wrapper">
            <input ref={copyUrlRef} value={urlValue} />
            <button onClick={copyUrl}>
              <FaRegCopy />
            </button>
          </div>
        </div>
      </View>
    </>
  );
};
