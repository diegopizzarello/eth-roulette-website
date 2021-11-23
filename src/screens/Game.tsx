import React, { useEffect, useState } from "react";
import { Button, List, Avatar, Typography, Image, Modal, Input, message as messageStatus, Badge } from "antd";
import styled from "styled-components";
import Confetti from 'react-dom-confetti';

import useContract from "../hooks/useContract";
import abi from '../contracts/WaveRoulette.json';
import { WaveRoulette } from "../contracts/types";
import Roulette from "../components/Roulette";
import { WaveStructOutput } from "../contracts/types/WaveRoulette";
import { BigNumber } from "ethers";

const contractAddress = "0x929A5455Fb76F5B7456fa0ec6351D438f28226Ed";

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

interface RouletteResult {
  winner: number;
  players: WaveStructOutput[];
}

const config = {
  angle: 90,
  spread: 90,
  startVelocity: 40,
  elementCount: 120,
  dragFriction: 0.12,
  duration: 5000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

const Game = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [players, setPlayers] = useState<WaveStructOutput[]>([]);
  const [waves, setWaves] = useState<WaveStructOutput[]>([]);
  const [rouletteResult, setRouletteResult] = useState<RouletteResult>();
  const rouletteContract = useContract<WaveRoulette>(contractAddress, contractABI);

  useEffect(() => {
    loadPlayers();
    loadWaves();

    if (rouletteContract) {
      rouletteContract.on('NewWave', onNewWave);
      rouletteContract.on('NewWinner', onNewWinner);
    }
    return () => {
      if (rouletteContract) {
        rouletteContract.off('NewWave', onNewWave);
        rouletteContract.on('NewWinner', onNewWinner);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoading) {
      hideModal();
    }
  }, [isLoading]);

  const hideModal = () => {
    setIsModalVisible(false);
    setMessage('');
  }

  const onNewWave = (from: string, timestamp: BigNumber, message: string) => {
    const newWave = { waver: from, message: message, timestamp: timestamp } as WaveStructOutput;
    setWaves(prevState => [
      newWave,
      ...prevState,
    ]);
    if (!rouletteResult?.players.find(player => player.waver === from && player.message === message)) {
      setPlayers(prevState => [
        ...prevState,
        newWave,
      ]);
    }
  };

  const onNewWinner = (from: string, _timestamp: BigNumber, message: string, players: WaveStructOutput[]) => {
    const winner = players.findIndex(player => player.waver === from && player.message === message);
    setRouletteResult({ winner, players });
    setPlayers([]);
  };

  const loadPlayers = async () => {
    if (!rouletteContract) return;
    const players = await rouletteContract.getRafflePlayers();
    setPlayers(players);
  }

  const loadWaves = async () => {
    if (!rouletteContract) return;
    const waves = await rouletteContract.getAllWaves();
    setWaves([...waves].reverse());
  }

  const joinRoulette = async () => {
    if (!rouletteContract) return;
    try {
      const waveTx = await rouletteContract.wave(message);
      setIsLoading(true);
      const hide = messageStatus.loading('Joining roulette...', 0);
      await waveTx.wait();
      hide();
      messageStatus.success('Joined!');
      setIsLoading(false);
    } catch (e) {
      console.log('error joining ', e);
      messageStatus.error('Please try again');
    }
  }

  const onRouletteFinish = () => {
    setIsConfettiActive(true);
    setTimeout(() => {
      setRouletteResult(undefined);
      setIsConfettiActive(false);
    }, 3000);
  }

  return (
    <Container>
      <Badge.Ribbon
        text={`${3 - players.length} player/s remaining...`}
        style={{ display: rouletteResult?.winner ? 'none' : 'unset' }}
      >
        <Roulette
          players={rouletteResult?.players || players}
          winner={rouletteResult?.winner || 0}
          onPrizeDefined={onRouletteFinish}
          start={!!rouletteResult?.winner}
        />
      </Badge.Ribbon>
      <Confetti active={isConfettiActive} config={config} />
      <Button
        type="primary"
        size="large"
        onClick={() => setIsModalVisible(true)}
        disabled={isLoading}
        style={{ marginTop: 24, width: 200 }}
      >
        Join
      </Button>
      <Modal
        title="Add a message"
        visible={isModalVisible}
        onOk={joinRoulette}
        onCancel={hideModal}
        okButtonProps={{ disabled: !message }}
        okText="Join"
      >
        <Input
          placeholder="What a cool roulette!"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </Modal>
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