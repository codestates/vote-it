import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1 0 auto;
  width: 256px;
  height: 256px;
  padding: auto;
  vertical-align: middle;
  align-items: center;
  img {
    height: 96px;
  }
  .not-implemented-wrapper {
    flex: 1 0 auto;
    align-items: center;
    vertical-align: middle;
  }
  .not-implemented-text {
    font-size: 18px;
    white-space: pre;
  }
`;

export const NotImplemented = () => {
  return (
    <Container>
      <div className="not-implemented-wrapper">
        <img src={`${process.env.PUBLIC_URL}/images/cry.png`} alt="cry" />
        <div className="not-implemented-text">아직 미구현이에요..</div>
        <div className="not-implemented-text">빠른 시일 내에 찾아봴게요!</div>
      </div>
    </Container>
  );
};
