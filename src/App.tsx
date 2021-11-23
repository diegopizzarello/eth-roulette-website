import React from 'react';
import styled from 'styled-components';
import { BackTop } from 'antd';

import Header from './components/Header';
import useConnect from './hooks/useConnect';
import InfoScreen from './screens/InfoScreen';
import Game from './screens/Game';

const PageContainer = styled.div`
  background-color: #030303;
  min-height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const { status, connect, account } = useConnect();

  return (
    <PageContainer>
      <BackTop />
      <Header status={status} account={account} connect={connect} />
      {status === 'connected' ? (
        <Game />
      ) : (
        <InfoScreen status={status}/>
      )}
    </PageContainer>
  );
}

export default App;
