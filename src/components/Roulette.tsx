import React, { useMemo } from "react";
// @ts-ignore
import RoulettePro from 'react-roulette-pro';

import 'react-roulette-pro/dist/index.css';
import { WaveStructOutput } from "../contracts/types/WaveRoulette";

interface Prize {
  id: string;
  image: string;
  text: string;
}

const arrayReproduction = (array: Prize[] = [], length = 0) => [
  ...Array(length)
    .fill('_')
    .map(() => array[Math.floor(Math.random() * array.length)]),
];

const formatPrizes = (players: Prize[]) => [
  ...players,
  ...arrayReproduction(players, players.length * 6),
  ...players,
  ...players,
];

interface RouletteProps {
  players: WaveStructOutput[],
  winner: number;
  start: boolean;
  onPrizeDefined: () => void;
}

const Roulette = ({ players, winner, start, onPrizeDefined }: RouletteProps) => {

  const memoizedPrizes = useMemo(() => {
    const formatPlayers = players.map(player => ({
      id: player.waver,
      image: `https://avatars.dicebear.com/api/open-peeps/${player.waver.toUpperCase()}.svg`,
      text: player.message,
    }));
    return formatPrizes(formatPlayers)
  }, [players]);

  const indexWinner = players.length * 7 + winner;

  return (
    <div style={{ maxWidth: 600 }}>
      <RoulettePro style={{ width: 300 }} prizes={memoizedPrizes} prizeIndex={indexWinner} start={start} onPrizeDefined={onPrizeDefined} debug />
    </div>
  )
};

export default Roulette;

