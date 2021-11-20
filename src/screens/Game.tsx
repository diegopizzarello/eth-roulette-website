import React, { useEffect, useState } from "react";
import { Button, List, Avatar, Typography, Image } from "antd";
import styled from "styled-components";

import useContract from "../hooks/useContract";
import abi from '../contracts/WaveRoulette.json';
import { WaveRoulette } from "../contracts/types";
import Roulette from "../components/Roulette";
import { WaveStructOutput } from "../contracts/types/WaveRoulette";

const contractAddress = "0x37215DC06FE3A9fd3095D1BbA490b3A49e525387";

const contractABI = abi.abi;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const { Text } = Typography;

const TextWallet = styled(Text)`
  color: darkgray;
`;

const TextMessage = styled(Text)`
  color: white;
  font-size: 17px;
`;

const Game = () => {
  const [players, setPlayers] = useState<WaveStructOutput[]>([]);
  const [waves, setWaves] = useState<WaveStructOutput[]>([]);
  const rouletteContract = useContract<WaveRoulette>(contractAddress, contractABI);

  useEffect(() => {
    loadPlayers();
    loadWaves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPlayers = async () => {
    if (!rouletteContract) return;
    const players = await rouletteContract.getRafflePlayers();
    setPlayers(players);
  }

  const loadWaves = async () => {
    if (!rouletteContract) return;
    const waves = await rouletteContract.getAllWaves();
    setWaves(waves);
  }

  const joinRoulette = async () => {
    if (!rouletteContract) return;
    try {
      const waveTx = await rouletteContract.wave('message');
      await waveTx.wait();
    } catch (e) {
      console.log('error joining ', e);
    }
  }

  return (
    <Container>
      <Roulette players={players} winner={0} onPrizeDefined={() => { }} start={false} />
      <Button type="primary" size="large" onClick={joinRoulette} style={{ marginTop: 24, width: 200 }}>Join</Button>
      <List
        itemLayout="horizontal"
        dataSource={waves}
        style={{ width: 500, marginTop: 48 }}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  size={64}
                  style={{ backgroundColor: 'white' }}
                  src={<Image 
                    src={`https://avatars.dicebear.com/api/open-peeps/${item.waver.toUpperCase()}.svg`} 
                    style={{ width: 64 }} 
                  />}
                />
              }
              title={<TextWallet strong>{item.waver}</TextWallet>}
              description={<TextMessage>{item.message}</TextMessage>}
            />
          </List.Item>
        )}
      />
    </Container>
  )
}

export default Game;