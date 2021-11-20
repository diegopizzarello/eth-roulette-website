import { useMemo } from "react";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";

declare let window: any;

export default function useContract<T extends Contract = Contract>(
  address: string,
  ABI: any
): T | null {

  return useMemo(() => {
    if (!address || !ABI) {
      return null;
    }

    try {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
      return new Contract(address, ABI, signer);
    } catch (error) {
      console.error("Failed To Get Contract", error);

      return null;
    }
  }, [address, ABI]) as T;
}