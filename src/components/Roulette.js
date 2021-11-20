import React, { useMemo, useCallback } from "react";
import RoulettePro from 'react-roulette-pro';

import 'react-roulette-pro/dist/index.css';

const arrayReproduction = (array = [], length = 0) => [
    ...Array(length)
      .fill('_')
      .map(() => array[Math.floor(Math.random() * array.length)]),
  ];

const formatPrizes = (players) => [
    ...players,
    ...arrayReproduction(players, players.length * 6),
    ...players,
    ...players,
];

const Roulette = ({players, winner, start, onPrizeDefined}) => {
    const memoizedPrizes = useMemo(() => formatPrizes(players), [players]);

    return (
        <RoulettePro prizes={memoizedPrizes} prizeIndex={winner} start={start} onPrizeDefined={onPrizeDefined} />
    )
};

export default Roulette;