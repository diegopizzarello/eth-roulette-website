import { useState, useEffect } from 'react';

declare let window: any;
export type Status = 'not_installed' | 'installed' | 'connected';

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
        setStatus(isConnected ? 'connected' : 'installed');
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
    checkIfWalletIsConnected();
  }, []);

  return { status, connect, account };
}

export default useConnect;