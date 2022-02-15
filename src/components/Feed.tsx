import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const Canvas = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100vw;
  /* background-color: aliceblue; */
`;

const Container = styled.div`
  position: absolute;
`;

interface IProps {
  setNoticeOn: Dispatch<SetStateAction<boolean>>;
}

const Feed: React.FunctionComponent<IProps> = ({ setNoticeOn }) => {
  const handleFeedOff = () => {
    setNoticeOn(false);
  };
  return (
    <>
      <Canvas onClick={handleFeedOff} />
      <Container>활동피드임</Container>
    </>
  );
};

export default Feed;
