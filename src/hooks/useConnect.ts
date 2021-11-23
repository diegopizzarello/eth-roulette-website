// TODO: Check if user is in the right network.

import { useState, useEffect } from 'react';

declare let window: any;
export type Status = 'not_installed' | 'installed' | 'connected' | 'wrong_network';

const useConnect = () => {
  const [status, setStatus] = useState<Status>('not_installed');
  const [account, setAccount] = useState<string>('');

  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      const isConnected = accounts.length !== 0;

      if (isConnected) {
        const account = accounts[0];
        setAccount(account);
      }

      const chainId = await ethereum.request({ method: 'eth_chainId' });
      const status = chainId !== '0x4' ? 'wrong_network' : isConnected ? 'connected' : 'installed';
      setStatus(status);
      if (status === 'wrong_network') {
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x4" }]
          });
        } catch (e) {
          console.log('error switching network ', e);
          //@ts-ignore
          if (e.code !== -32002) {
            window.location.reload();
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connect = async () => {
    try {
      const { ethereum } = window;
      await ethereum.request({ method: "eth_requestAccounts" });
      checkIfWalletIsConnected();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!isMetaMaskInstalled()) {
      setStatus('not_installed');
      return;
    }
    const { ethereum } = window;
    ethereum.on('chainChanged', (_chainId: number) => window.location.reload());
    checkIfWalletIsConnected();

    return () => {
      ethereum.removeListener('chainChanged', (_chainId: number) => window.location.reload());
    }
  }, []);

  return { status, connect, account };
}

export default useConnect;