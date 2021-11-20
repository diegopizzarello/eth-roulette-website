import React from 'react';
import styled from 'styled-components';

import Header from './components/Header';
import useConnect from './hooks/useConnect';
import ConnectWallet from './screens/ConnectWallet';
import Game from './screens/Game';

const PageContainer = styled.div`
  background-color: #030303;
  height: 100vh;
  justify-content: center;
  color: white;
  display: flex;
`;

function App() {
  const { status, connect, account } = useConnect();

  return (
    <PageContainer>
      <Header status={status} account={account} connect={connect} />
      {status === 'connected' ? (
        <Game />
      ) : (
        <ConnectWallet />
      )}
    </PageContainer>
  );
}

export default App;
