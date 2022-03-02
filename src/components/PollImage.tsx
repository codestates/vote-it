import React from 'react';
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
`;

const InputBox = styled.input`
  /* width: 100%;
  flex: 1;
  border-radius: 100px;
  margin-bottom: 20px; */
  /* position: absolute; */
  width: 70%;
  height: 70%;
  padding: 0;
  overflow: hidden;
  border: 0;
  opacity: 0;
  cursor: pointer;
`;

const Preview = styled.img`
  width: 256px;
  height: 200px;
  /* border-radius: 100px; */
  background-color: #fff;
`;

export const PollImage = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState('');

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
    // const formData = new FormData();
    // formData.append('file', e.target.files[0])
    // const accessToken = localStorage.getItem('accessToken')
    // apiAxios
    //   .post(
    //     'upload-poll-picture',
    //     formData,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`
    //       }
    //     }
    //   )

    setSelectedFile(e.target.files[0]);
  };

  return (
    <InputViewContainer>
      <form
        method="post"
        encType="multipart/form-data"
        action="https://localhost:8000/upload-poll-picture"
      >
        <InputBox
          type={'file'}
          style={!selectedFile ? {} : { display: 'none' }}
          onChange={onSelectFile}
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
        />
        <input type={'submit'} value="사진 업로드" />
      </form>
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
