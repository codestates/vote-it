import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 60%;
`;

export const Loading = () => {
  return (
    <Container>
      <img src={`${process.env.PUBLIC_URL}/images/loading.gif`} alt="loading" />
    </Container>
  );
};
