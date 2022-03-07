import React, { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
// import apiAxios from '../utils/apiAxios';

const InputViewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  form {
    width: 99%;
    height: 99%;
    justify-content: center;
    align-items: center;
  }
  label {
    flex: 1 0 auto;
    margin: 8px;
    width: 240px;
    height: 184px;
    line-height: 184px;
    font-size: 32px;
    /* border-radius: 100px; */
    /* z-index: 1; */
    border-radius: 4px;
    color: white;
    background-color: rgba(0, 0, 0, 0.4);
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
  display: none;
  width: 70%;
  height: 70%;
  padding: 0;
  overflow: hidden;
  border: 0;
  opacity: 0;
  cursor: pointer;
`;

const Preview = styled.img`
  position: absolute;
  width: 256px;
  height: 200px;
  /* border-radius: 100px; */
  background-color: #fff;
`;

interface IProps {
  setFile: Dispatch<SetStateAction<File | null>>;
}

export const PollImage = ({ setFile }: IProps) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState('');
  // const [formData, setFormData] = useState(new FormData())

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
    setFile(e.target.files[0]);
  };
  return (
    <InputViewContainer>
      <form encType="multipart/form-data" name="photo">
        <InputBox
          id="add-vote-image"
          type={'file'}
          style={!selectedFile ? {} : { display: 'none' }}
          onChange={onSelectFile}
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
        />

        {/* <input type={'submit'} value="사진 업로드" /> */}
      </form>
      {selectedFile && (
        <Preview
          src={preview}
          onClick={() => {
            setSelectedFile(undefined);
          }}
        />
      )}
      <label htmlFor="add-vote-image">+</label>
    </InputViewContainer>
  );
};
