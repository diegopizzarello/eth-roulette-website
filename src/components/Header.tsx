import React from "react";
import MetaMaskOnboarding from '@metamask/onboarding'
import styled from "styled-components";
import { Button, Typography, Avatar, Image, Badge } from "antd";

import { Status } from "../hooks/useConnect";

interface HeaderProps {
  status: Status;
  account?: string;
  connect: () => void;
}

interface AccountInfoProps {
  address: string;
}

const Container = styled.div`
  display: flex;
  height: 80px;
  padding: 24px 48px;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 48px;
`;

const AccountContainer = styled.div`
  display: flex;
  width: 180px;
`;

const { Text, Title } = Typography;

const Header = ({ status, account, connect }: HeaderProps) => {

  const onboarding = new MetaMaskOnboarding({ forwarderOrigin: 'roulette.pizzarello.dev' });

  const onClickInstall = () => {
    onboarding.startOnboarding();
  }

  const AccountInfo = ({ address }: AccountInfoProps) => (
    <AccountContainer>
      <Avatar
        size={48}
        style={{ backgroundColor: 'white', marginRight: 8 }}
        src={
          <Image
            src={`https://avatars.dicebear.com/api/open-peeps/${address.toUpperCase()}.svg`}
            style={{ width: 48 }}
          />}
      />
      <Text style={{ color: 'white', maxWidth: 120 }} strong ellipsis>{account}</Text>
    </AccountContainer>
  )

  return (
    <Container>
      <Badge status="processing" text="Rinkeby Network" style={{ color: 'white', width: 180 }} />
      <Title level={3} style={{ color: '#F49309', letterSpacing: 2.2, marginBottom: 0 }}>ROULETTE</Title>
      {status === 'not_installed' && <Button type="primary" shape="round" onClick={onClickInstall}>Install Metamask</Button>}
      {status === 'installed' && <Button type="primary" size="large" shape="round" onClick={connect}>Connect Metamask</Button>}
      {((status === 'connected' || status==='wrong_network') && account) && <AccountInfo address={account} />}
    </Container>
  )

}

export default Header;