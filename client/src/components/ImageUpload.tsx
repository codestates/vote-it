import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { notify } from '../modules/notification';

const InputViewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  label {
    width: 90px;
    height: 90px;
    line-height: 90px;
    font-size: 32px;
    border-radius: 100px;

    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0;
    cursor: pointer;
    :hover {
      opacity: 1;
      transition: all 0.3s;
    }
  }
`;

const InputBox = styled.input`
  /* width: 100%;
  flex: 1;
  border-radius: 100px;
  margin-bottom: 20px; */
  /* position: absolute; */
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 100px;
  opacity: 0;
`;

const Preview = styled.img`
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 100px;
  background-color: #fff;
`;

export const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedFile) {
      setPreview('');
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  return (
    <InputViewContainer>
      <InputBox
        id="profile-image"
        type={'file'}
        // style={!selectedFile ? {} : { display: 'none' }}
        onChange={onSelectFile}
        accept="image/*"
      />
      <label
        onClick={() => {
          dispatch(notify('아직 미구현이에요!'));
        }}
        htmlFor="profile-image-not-implemented"
      >
        +
      </label>
      {selectedFile && (
        <Preview
          src={preview}
          onClick={() => {
            setSelectedFile(undefined);
          }}
        />
      )}
    </InputViewContainer>
  );
};
