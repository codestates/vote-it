import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  height: 200px;
  background-color: #fff;
  box-shadow: inset 2px 2px 5px 2px rgb(212, 212, 212);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  margin-right: 10%;
  width: auto;
  height: 70%;
`;

const Container = styled.div`
  height: 90%;
  margin-left: 2%;
  display: flex;
  flex-direction: column;
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
          <Text href="https://github.com/nix6839" target="_blank">
            H.Y.W
          </Text>
          <Text href="https://github.com/alsqja" target="_blank">
            G.M.W
          </Text>
          <Text href="https://github.com/citysquirrel" target="_blank">
            K.M.B
          </Text>
          <Text href="https://github.com/yjlim0428" target="_blank">
            L.Y.J
          </Text>
        </TextContainer>
      </Container>
    </FooterContainer>
  );
}

export default Footer;
