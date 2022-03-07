import { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 1 0 auto;
  position: relative;
  display: inline-block;
  transform: translateY(1px);
`;

const Button = styled.button<{ isOn: boolean }>`
  --dm-button-size: 32px;
  padding-top: 1px;
  border-radius: 100px;
  width: var(--dm-button-size);
  height: var(--dm-button-size);
  background-color: transparent;
  :hover {
    background-color: var(--main-color);
  }
`;
const Sun = styled.img<{ isOn: boolean }>`
  --dm-icon-size: 18px;
  position: absolute;
  width: var(--dm-icon-size);
  height: var(--dm-icon-size);
  transition: all 0.5s;
  transform: ${(props) =>
    props.isOn ? 'rotateZ(270deg) scale(0.2)' : 'rotateZ(0)'};
  visibility: ${(props) => (props.isOn ? 'hidden' : 'visible')};
  opacity: ${(props) => (props.isOn ? '0' : '1')};
`;
const Moon = styled.img<{ isOn: boolean }>`
  --dm-icon-size: 18px;
  width: var(--dm-icon-size);
  height: var(--dm-icon-size);
  transition: all 0.5s;
  transform: ${(props) =>
    props.isOn ? 'rotateZ(0)' : 'rotateZ(270deg) scale(0.2)'};
  visibility: ${(props) => (props.isOn ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOn ? '1' : '0')};
`;

interface Props {
  darkMode: boolean;
  handleDarkMode: () => void;
}

interface State {}

export class Toggle extends Component<Props, State> {
  state = {};

  //   constructor(props: Props) {
  //     super(props);

  //   }

  // handleToggle = () => {
  //   this.setState({ darkMode: !this.props.darkMode });
  //   //! darkMode 켜기/끄기 코드
  // };

  render() {
    return (
      <Container>
        <Button onClick={this.props.handleDarkMode} isOn={this.props.darkMode}>
          <Sun
            src={`${process.env.PUBLIC_URL}/images/sun.png`}
            isOn={this.props.darkMode}
            alt="sun"
          />
          <Moon
            src={`${process.env.PUBLIC_URL}/images/moon.png`}
            isOn={this.props.darkMode}
            alt="moon"
          />
        </Button>
      </Container>
    );
  }
}
