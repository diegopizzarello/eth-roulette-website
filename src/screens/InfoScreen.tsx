import React from "react";
import { Typography } from "antd";
import styled from "styled-components";

import metamask from '../assets/metamask.png';
import { Status } from "../hooks/useConnect";

const { Text } = Typography;

interface InfoScreenProps {
  status: Status;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 84px;
  justify-content: center;
  align-items: center;
`;

const Info = styled(Text)`
  color: white;
  font-size: 22px;
  margin-top: 32px;
  text-align: center;
  padding: 0px 42px;
`;

const InfoScreen = ({status}: InfoScreenProps) => {

  const text = () => {
    switch(status) {
      case 'installed': return 'Connect your wallet using Metamask'
      case 'not_installed': return 'You have to install Metamask extension to use the website'
      case 'wrong_network': return 'You are in the wrong network! You must be in the Rinkeby Test Network'
    }
  }
  return (
    <Container>
      <img src={metamask} alt="Metamask" style={{ width: 120 }} />
      <Info strong>{text()}</Info>
    </Container>
  )
};

export default InfoScreen;