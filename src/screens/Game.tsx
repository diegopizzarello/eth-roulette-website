import React from "react";
import useContract from "../hooks/useContract";
import abi from '../contracts/WaveRoulette.json';
import { WaveRoulette } from "../contracts/types";
import Roulette from "../components/Roulette";

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
      <Roulette players={[]} winner={0} onPrizeDefined={() => {}} start={false} />
    </div>
  )
}

export default Game;