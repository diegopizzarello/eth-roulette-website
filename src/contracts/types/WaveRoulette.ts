/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export type WaveStruct = {
  waver: string;
  message: string;
  timestamp: BigNumberish;
};

export type WaveStructOutput = [string, string, BigNumber] & {
  waver: string;
  message: string;
  timestamp: BigNumber;
};

export interface WaveRouletteInterface extends utils.Interface {
  functions: {
    "getAllWaves()": FunctionFragment;
    "getRafflePlayers()": FunctionFragment;
    "getTotalWaves()": FunctionFragment;
    "getWinners()": FunctionFragment;
    "lastWavedAt(address)": FunctionFragment;
    "wave(string)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getAllWaves",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRafflePlayers",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalWaves",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getWinners",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "lastWavedAt", values: [string]): string;
  encodeFunctionData(functionFragment: "wave", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "getAllWaves",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRafflePlayers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalWaves",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getWinners", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lastWavedAt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "wave", data: BytesLike): Result;

  events: {
    "NewWave(address,uint256,string)": EventFragment;
    "NewWinner(address,uint256,string,tuple[],tuple)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "NewWave"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewWinner"): EventFragment;
}

export type NewWaveEvent = TypedEvent<
  [string, BigNumber, string],
  { from: string; timestamp: BigNumber; message: string }
>;

export type NewWaveEventFilter = TypedEventFilter<NewWaveEvent>;

export type NewWinnerEvent = TypedEvent<
  [string, BigNumber, string, WaveStructOutput[], WaveStructOutput],
  {
    from: string;
    timestamp: BigNumber;
    message: string;
    players: WaveStructOutput[];
    lastWave: WaveStructOutput;
  }
>;

export type NewWinnerEventFilter = TypedEventFilter<NewWinnerEvent>;

export interface WaveRoulette extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: WaveRouletteInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getAllWaves(overrides?: CallOverrides): Promise<[WaveStructOutput[]]>;

    getRafflePlayers(overrides?: CallOverrides): Promise<[WaveStructOutput[]]>;

    getTotalWaves(overrides?: CallOverrides): Promise<[BigNumber]>;

    getWinners(overrides?: CallOverrides): Promise<[WaveStructOutput[]]>;

    lastWavedAt(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    wave(
      _message: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  getAllWaves(overrides?: CallOverrides): Promise<WaveStructOutput[]>;

  getRafflePlayers(overrides?: CallOverrides): Promise<WaveStructOutput[]>;

  getTotalWaves(overrides?: CallOverrides): Promise<BigNumber>;

  getWinners(overrides?: CallOverrides): Promise<WaveStructOutput[]>;

  lastWavedAt(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  wave(
    _message: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getAllWaves(overrides?: CallOverrides): Promise<WaveStructOutput[]>;

    getRafflePlayers(overrides?: CallOverrides): Promise<WaveStructOutput[]>;

    getTotalWaves(overrides?: CallOverrides): Promise<BigNumber>;

    getWinners(overrides?: CallOverrides): Promise<WaveStructOutput[]>;

    lastWavedAt(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    wave(_message: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "NewWave(address,uint256,string)"(
      from?: string | null,
      timestamp?: null,
      message?: null
    ): NewWaveEventFilter;
    NewWave(
      from?: string | null,
      timestamp?: null,
      message?: null
    ): NewWaveEventFilter;

    "NewWinner(address,uint256,string,tuple[],tuple)"(
      from?: string | null,
      timestamp?: null,
      message?: null,
      players?: null,
      lastWave?: null
    ): NewWinnerEventFilter;
    NewWinner(
      from?: string | null,
      timestamp?: null,
      message?: null,
      players?: null,
      lastWave?: null
    ): NewWinnerEventFilter;
  };

  estimateGas: {
    getAllWaves(overrides?: CallOverrides): Promise<BigNumber>;

    getRafflePlayers(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalWaves(overrides?: CallOverrides): Promise<BigNumber>;

    getWinners(overrides?: CallOverrides): Promise<BigNumber>;

    lastWavedAt(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    wave(
      _message: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getAllWaves(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRafflePlayers(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTotalWaves(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getWinners(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    lastWavedAt(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    wave(
      _message: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
