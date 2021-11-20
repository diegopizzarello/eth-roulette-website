import React from "react";
import useContract from "../hooks/useContract";
import abi from '../contracts/WaveRoulette.json';
import { WaveRoulette } from "../contracts/types";

const contractAddress = "0x37215DC06FE3A9fd3095D1BbA490b3A49e525387";

const contractABI = abi.abi;

const Game = () => {
  const rouletteContract = useContract<WaveRoulette>(contractAddress, contractABI);

  const totalWaves = async () => {
    if (!rouletteContract) return;
    let count = await rouletteContract.getTotalWaves();
    console.log('count ', +count);
  }

  return (
    <div>
      GAME SCREEN
      <button onClick={totalWaves}>waves</button>
    </div>
  )
}

export default Game;