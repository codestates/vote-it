import React from 'react';
import { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-block;
`;

const Base = styled.div`
  max-height: 26px;
  width: 52px;
  padding: 1px;
  border-radius: 100px;
  background-color: grey;
  cursor: pointer;
`;

const Circle = styled.button<{ isOn: boolean }>`
  position: relative;
  margin: 1px;
  left: ${(props) => (props.isOn ? '13px' : '-13px')};
  height: 24px;
  width: 24px;

  border-radius: 100px;
  background-color: white;
  transition: all 0.5s;
  :hover {
    background-color: white;
  }

  img {
    --dm-icon-size: 18px;
    width: var(--dm-icon-size);
    height: var(--dm-icon-size);
  }
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
        <Base
          onClick={this.props.handleDarkMode}
          style={this.props.darkMode ? { background: 'blue' } : {}}
        >
          <Circle
            onClick={this.props.handleDarkMode}
            isOn={this.props.darkMode}
          >
            {/* <img src={`${process.env.PUBLIC_URL}/images/sun.png`} alt="sun" /> */}
          </Circle>
        </Base>
      </Container>
    );
  }
}
