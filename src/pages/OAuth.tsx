import { Dispatch, SetStateAction, useEffect } from 'react';

interface Props {
  setHeaderVisibility: Dispatch<SetStateAction<boolean>>;
}

export const OAuth = ({ setHeaderVisibility }: Props) => {
  useEffect(() => {
    setHeaderVisibility(false);
    return () => {
      setHeaderVisibility(true);
    };
  });
  return <div>투표 용지 만드는중..</div>;
};
