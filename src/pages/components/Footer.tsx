import React from 'react';
import styled from 'styled-components';

const FooterOuter = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 8px 10px -6px rgb(212, 212, 212);
`;

const FooterContainer = styled.div`
  height: 200px;
  width: 1200px;
  background-color: #fff;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  /* align-items: center; */
  @media only screen and (max-width: 500px) {
    width: 360px;
    grid-template-columns: repeat(6, 1fr);
    column-gap: 18px;
  }
`;
const Img = styled.img`
  /* margin-right: 10%; */
  grid-column: 2 / span 5;
  /* width: auto; */
  height: 70%;
  @media only screen and (max-width: 768px) {
    height: 40%;
  }

  @media only screen and (max-width: 500px) {
    height: 30%;
    grid-column: span 4;
  }
`;

const Container = styled.div`
  grid-column: span 2;
  height: 70%;
  margin-left: 2%;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 500px) {
    grid-column: span 1;
  }
`;

const Text = styled.a`
  &:hover {
    color: #5d6dbe;
  }
  font-family: 'S-CoreDream-3Light';
  font-size: 17px;
  text-decoration: none;
  color: black;
`;

const TitleContainer = styled.div`
  font-family: 'S-CoreDream-3Light';
  font-size: 20px;
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const TextContainer = styled.div`
  flex: 7;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

function Footer() {
  return (
    <FooterOuter>
      <FooterContainer>
        <Img src={`${process.env.PUBLIC_URL}/MYMY.png`} />
        <Container>
          <TitleContainer>ABOUT US</TitleContainer>
          <TextContainer>
            <Text
              href="https://github.com/codestates/vote-it/wiki"
              target="_blank"
            >
              Repository Wiki
            </Text>
          </TextContainer>
        </Container>
        <Container>
          <TitleContainer>TEAM MEMBERS</TitleContainer>
          <TextContainer>
            <Text href="https://github.com/alsqja" target="_blank">
              Kim. M. B
            </Text>
            <Text href="https://github.com/nix6839" target="_blank">
              Han. Y. W
            </Text>
            <Text href="https://github.com/citysquirrel" target="_blank">
              Kwak. M. W
            </Text>
            <Text href="https://github.com/yjlim0428" target="_blank">
              Lim, Y, J
            </Text>
          </TextContainer>
        </Container>
      </FooterContainer>
    </FooterOuter>
  );
}

export default Footer;
