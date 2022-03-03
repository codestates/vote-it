import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Scheduler } from '../components';
import apiAxios from '../utils/apiAxios';
import '../fonts/font.css';
import { useDispatch } from 'react-redux';
import { notify } from '../modules/notification';
import { useNavigate } from 'react-router-dom';
import ServerErr from './ServerErr';
import { focusHandler, useBeforeLeave } from '../functions';
import { PollImage } from '../components/PollImage';

const Outer = styled.div`
  font-family: 'EliceDigitalBaeum_Regular';
  padding-top: 48px;
  background-color: var(--bg);
  display: flex;
  width: 100%;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
`;
const Container = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  align-items: center;
  transition: all 0.5s;
  @media only screen and (max-width: 1200px) {
    width: 768px;
  }
  @media only screen and (max-width: 768px) {
    width: 500px;
  }
  @media only screen and (max-width: 500px) {
    width: 360px;
    grid-template-columns: repeat(6, 1fr);
    column-gap: 16px;
  }
`;

const SubBox = styled.div`
  grid-column: 2 / span 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* height: 100vh; */
  @media only screen and (max-width: 500px) {
    grid-column: span 6;
  }
`;

const Title = styled.textarea`
  &:focus {
    outline: none;
  }
  background-color: var(--box-bg);
  box-shadow: -2px -2px 4px var(--box-shadow),
    3px 3px 6px var(--box-shadow-darker);
  font-family: 'SUIT-Light';
  border-radius: 20px;
  font-size: 18px;
  padding: 20px;
  width: 90%;
  height: 40px;
  margin-top: 30px;
  border: none;
  resize: none;
`;
const OptionContainer = styled.div`
  overflow-y: auto;
  margin-top: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  /* max-height: 40%; */
  padding: 10px;
  height: 40%;
`;
const Option = styled.div`
  box-shadow: -2px -2px 4px var(--box-shadow),
    3px 3px 6px var(--box-shadow-darker);
  display: flex;
  margin: 0 auto;
  margin-top: 10px;
  width: 95%;
  background-color: var(--box-bg);
  border-radius: 15px;
  padding: 5px;
  justify-content: space-around;
`;
const OptionInput = styled.input`
  font-family: 'SUIT-Light';
  font-size: 16px;
  &:focus {
    outline: none;
  }
  height: 40px;
  width: 80%;

  border: none;
`;

const DelOptionBtn = styled.div`
  width: 40px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: var(--button-bg-lighter);
  }
  /* all: unset; */
  /* margin-right: 10px; */
`;
const PlusOptionBtn = styled.button`
  padding: 2px;
  border: none;
  margin: 0 auto;
  margin-top: 10px;
  width: 50px;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  background-color: var(--main-color);
`;
const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
`;
const CheckboxAndTitle = styled.div`
  display: flex;
  margin: 10px;
  align-items: center;
`;
const Checkbox = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;
const CheckboxTitle = styled.div`
  cursor: pointer;
  :hover {
    color: var(--font-lighter);
  }
`;

const CreateBtn = styled.button`
  font-family: 'KOHIBaeumOTF';
  padding-top: 4px;
  margin: 0 auto;
  font-size: 20px;
  border: none;
  max-width: 300px;
  width: 50vw;
  height: 40px;
  margin-bottom: 50px;
  margin-top: 30px;
  border-radius: 15px;
  color: white;
  box-shadow: -2px -2px 4px var(--box-shadow),
    3px 3px 6px var(--box-shadow-darker);
  background-color: var(--main-color);
  :hover {
    background-color: var(--border-lighter);
  }
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  width: 100%;
  height: 200px;
`;

const ImgBox = styled.div`
  width: 256px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dotted var(--font);
`;

interface IModalOn {
  isOn: boolean;
  isShow: boolean;
}

interface Props {
  keyupHandler: (e: KeyboardEvent) => void;
  finderRef: MutableRefObject<HTMLInputElement | null>;
  setModalOn: Dispatch<SetStateAction<IModalOn>>;
}

function CreateVote({ finderRef, keyupHandler, setModalOn }: Props) {
  const [calendarValue, setCalendarValue] = useState('');
  const [title, setTitle] = useState('');
  const [optionList, setOptionList] = useState<string[]>(['', '', '', '']);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isPlural, setIsPlural] = useState(false);
  const [isUnique, setIsUnique] = useState(-1);
  const navigate = useNavigate();
  const [err, setErr] = useState('');
  const dispatch = useDispatch();

  // const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const isLogin = localStorage.getItem('isLogin');

  const onChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTitle(value);
  };
  const onChangeOption = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    setOptionList([
      ...optionList.slice(undefined, index),
      value,
      ...optionList.slice(index + 1),
    ]);
  };

  interface CalenderValue {
    date: string;
    time: string;
  }

  const CalenderValueHandler = ({ date, time }: CalenderValue) => {
    if (time === '') {
      time = '23:59:59';
    }
    if (date === '') {
      if (time === '') {
        setCalendarValue('');
        return;
      }
      const today = new Date();
      const todayArr = today.toLocaleDateString().split('. ');
      if (todayArr[1].length === 1) {
        todayArr[1] = '0' + todayArr[1];
      }
      todayArr[2] = todayArr[2].slice(0, todayArr[2].length - 1);
      date = todayArr.join('');
    }
    setCalendarValue(
      date.slice(0, 4) +
        '-' +
        date.slice(4, 6) +
        '-' +
        date.slice(6) +
        'T' +
        time +
        '+09:00',
    );
  };

  const PlusOption = () => {
    // setPlusBtn(!PlusBtn);
    setOptionList([...optionList, '']);
  };

  const DelBtn = (index: number) => {
    const newList = optionList.filter((str, num) => {
      if (index === num) {
        return false;
      }
      return true;
    });
    setOptionList(newList);
  };

  const [file, setFile] = useState<File | null>(null);

  const CreateBtnHandler = async () => {
    console.log(file);
    if (title === '') {
      dispatch(notify('제목을 입력해주세요.'));
      return;
    }
    if (optionList.filter((el) => el !== '').length < 2) {
      dispatch(notify('선택지는 최소 2개 이상입니다.'));
      return;
    }
    if (calendarValue === '') {
      dispatch(notify('마감 시간을 입력해주세요.'));
      return;
    }
    const accessToken = localStorage.getItem('accessToken');
    let fileId = null;
    if (!!file) {
      const formData = new FormData();
      formData.append('picture', file);
      const fileRes = await apiAxios.post('upload-poll-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      fileId = fileRes.data.uploadId as string;
    }

    apiAxios
      .post(
        'users/me/polls',
        {
          subject: title,
          expirationDate: calendarValue,
          picture: fileId,
          isPrivate: isPrivate,
          isPlural: isPlural,
          options: optionList
            .filter((el) => el !== '')
            .map((el) => {
              return { content: el };
            }),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        dispatch(notify('투표가 등록되었습니다.'));
        // window.location.href = '/';
        navigate('/');
      })
      .catch((err) => {
        if (err.response.status >= 500) {
          setErr(err.response.data.message);
        } else if (err.response.data.message[0].includes('unique')) {
          dispatch(notify('중복된 선택지가 있습니다.'));
        }
      });
  };

  const handleOption = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const one = e.target.value;
    if (optionList.includes(one)) {
      setIsUnique(index);
    } else setIsUnique(-1);
    // if (one === '') {
    //   setIsUnique(-1);
    // }
    onChangeOption(e, index);
  };

  useEffect(() => {
    if (isLogin === 'false') {
      dispatch(notify('로그인 후 이용하실 수 있습니다.'));
      setModalOn({ isShow: false, isOn: true });
      setTimeout(() => {
        setModalOn({ isOn: true, isShow: true });
      }, 50);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useBeforeLeave(() => {
    console.log('가지마!');
  });

  return (
    <>
      {err === '' ? (
        <Outer>
          <Container>
            <SubBox>
              <Title
                placeholder="질문 내용"
                value={title}
                onChange={onChangeTitle}
                onFocus={() => {
                  console.log('focused');
                  window.removeEventListener('keyup', keyupHandler);
                }}
                onBlur={() => {
                  console.log('blurred');
                  window.addEventListener('keyup', keyupHandler);
                }}
              />

              {/* option section */}

              <OptionContainer>
                {optionList.map((el, index) => {
                  return (
                    <Option key={index}>
                      <OptionInput
                        placeholder="선택지 입력"
                        value={optionList[index]}
                        onChange={(e) => handleOption(e, index)}
                        onFocus={() => {
                          console.log('focused');
                          window.removeEventListener('keyup', keyupHandler);
                        }}
                        onBlur={() => {
                          console.log('blurred');
                          window.addEventListener('keyup', keyupHandler);
                        }}
                        style={isUnique === index ? { color: 'red' } : {}}
                      />
                      <DelOptionBtn onClick={() => DelBtn(index)}>
                        <FaMinus style={{ height: '100%', color: 'red' }} />
                      </DelOptionBtn>
                    </Option>
                  );
                })}
                <PlusOptionBtn onClick={PlusOption}>
                  <FaPlus style={{ color: 'white' }} />
                </PlusOptionBtn>
              </OptionContainer>

              {/* checkbox & calendar section */}

              <CheckboxContainer>
                <ImgContainer>
                  <ImgBox className="img">
                    <PollImage setFile={setFile} />
                  </ImgBox>
                  <div
                    style={{
                      textAlign: 'center',
                      width: '256px',
                      fontSize: 'small',
                    }}
                  >
                    클릭하여 이미지를 넣거나 드레그 해주세요.
                  </div>
                </ImgContainer>
                <CheckboxAndTitle>
                  <Checkbox
                    type={'checkbox'}
                    onChange={() => {
                      setIsPlural(!isPlural);
                    }}
                    checked={isPlural}
                  />
                  <CheckboxTitle
                    onClick={() => {
                      setIsPlural(!isPlural);
                    }}
                  >
                    중복 체크 여부
                  </CheckboxTitle>
                </CheckboxAndTitle>
                <CheckboxAndTitle>
                  <Checkbox
                    type={'checkbox'}
                    onChange={() => {
                      setIsPrivate(!isPrivate);
                    }}
                    checked={isPrivate}
                  />
                  <CheckboxTitle
                    onClick={() => {
                      setIsPrivate(!isPrivate);
                    }}
                  >
                    비공개
                  </CheckboxTitle>
                </CheckboxAndTitle>
                <CheckboxAndTitle>
                  <Scheduler
                    keyupHandler={keyupHandler}
                    translate={'0px, -550px'}
                    CalenderValueHandler={CalenderValueHandler}
                  />
                </CheckboxAndTitle>
              </CheckboxContainer>
              <CreateBtn onClick={CreateBtnHandler}>투표만들기</CreateBtn>
            </SubBox>
          </Container>
        </Outer>
      ) : (
        <ServerErr err={err} />
      )}
    </>
  );
}

export default CreateVote;
function keyupHandler(arg0: string, keyupHandler: any) {
  throw new Error('Function not implemented.');
}
