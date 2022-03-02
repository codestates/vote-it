import { useEffect } from 'react';

export const copyClipboard = async (
  text: string,
  successAction?: () => void,
  failAction?: () => void,
) => {
  try {
    await navigator.clipboard.writeText(text);
    successAction && successAction();
  } catch (err) {
    failAction && failAction();
  }
};

export const checkValidDate = (
  y: string,
  m: string,
  d: string,
  leng: number,
) => {
  if (leng === 0) return true;
  if (leng >= 9) return false;
  var result = true;
  try {
    const yNum = parseInt(y, 10),
      mNum = parseInt(m, 10),
      dNum = parseInt(d, 10);

    var dateRegex =
      /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-./])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
    // /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
    //! 현재 달력에 필요한 validation 조건으로 변경할 필요성
    result = dateRegex.test(dNum + '-' + mNum + '-' + yNum);
  } catch (err) {
    result = false;
  }
  return result;
};

export const dateInfoMod = (value: string, mod: number) => {
  // date를 받아서 mod만큼 날짜 계산
  const yNum = parseInt(value.slice(0, 4), 10),
    mNum = parseInt(value.slice(4, 6), 10) - 1,
    dNum = parseInt(value.slice(6, 8), 10);
  let date = new Date(yNum, mNum, dNum);
  date.setDate(date.getDate() + mod);
  const y = date.getFullYear().toString(),
    m =
      (date.getMonth() + 1).toString().length === 1
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`,
    d =
      date.getDate().toString().length === 1
        ? `0${date.getDate()}`
        : `${date.getDate()}`;
  return `${y}${m}${d}`;
};

export const setDateAlias = (y: number, m: number, d: number) => {
  let today = new Date();
  const thisWeek = [today.toLocaleDateString()];
  for (let i = 0; i < 7; i++) {
    today.setDate(today.getDate() + 1);
    thisWeek.push(today.toLocaleDateString());
  }
  const date = new Date(y, m - 1, d);
  const dateStr = date.toLocaleDateString();
  const idx = thisWeek.indexOf(dateStr);
  const alias = [
    '오늘',
    '내일',
    '모레',
    '3일후',
    '4일후',
    '5일후',
    '6일후',
    '다음주',
  ]; //
  return alias[idx] || 'none';
};

// 페이지를 떠날 때 팝업을 띄우는 훅
export function useBeforeLeave(onBefore: () => void) {
  const handle = (e: any) => {
    e.preventDefault();
    e.returnValue = 'ㅎㅇㅎㅇ';
    // onBefore();
  };
  useEffect(() => {
    document.addEventListener('beforeunload', handle);
    return () => document.removeEventListener('beforeunload', handle);
  });
}
