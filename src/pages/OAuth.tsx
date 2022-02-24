import { Dispatch, SetStateAction, useEffect } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import apiAxios from '../utils/apiAxios';
import { useDispatch } from 'react-redux';
import { notify } from '../modules/notification';

interface Props {
  setHeaderVisibility: Dispatch<SetStateAction<boolean>>;
}

export const OAuth = ({ setHeaderVisibility }: Props) => {
  const dispatch = useDispatch();
  const query = queryString.parse(window.location.search);

  const sendKakaoTokenToServer = (token: string) => {
    apiAxios
      .post('auth/kakao', { token })
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          // const user = res.data.user;
          window.localStorage.setItem(
            'token',
            JSON.stringify({
              access_token: res.data.jwt,
            }),
          );
        } else {
          window.alert('로그인에 실패하였습니다.');
        }
      })
      .catch((err) => {
        window.location.href = '/';
        dispatch(notify('뭔가 잘못됐어요!'));
      });
  };

  const getKakaoTokenHandler = async (code: string) => {
    const data: any = {
      grant_type: 'authorization_code',
      client_id: process.env.REACT_APP_KAKAO_REST_KEY,
      redirect_url: '/',
      code: code,
    };
    const queryStr = Object.keys(data)
      .map(
        (k: any) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]),
      )
      .join('&');
    axios
      .post('https://kauth.kakao.com/oauth/token', queryStr, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .then((res) => {
        // console.log(res.data.access_token);
        sendKakaoTokenToServer(res.data.access_token);
      });
  };

  useEffect(() => {
    setHeaderVisibility(false);
    if (query.code) getKakaoTokenHandler(query.code.toString());

    //unmount
    return () => {
      setHeaderVisibility(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>투표 용지 만드는중..</div>;
};
