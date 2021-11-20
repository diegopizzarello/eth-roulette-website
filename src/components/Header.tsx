import React from "react";
import MetaMaskOnboarding from '@metamask/onboarding'
import { Status } from "../hooks/useConnect";

interface HeaderProps {
  status: Status;
  account?: string;
  connect: () => void;
}

const Header = ({ status, account, connect }: HeaderProps) => {

  const onboarding = new MetaMaskOnboarding({ forwarderOrigin: 'roulette.pizzarello.dev' });

  const onClickInstall = () => {
    onboarding.startOnboarding();
  }

  return (
    <div>
      {status === 'not_installed' && <button onClick={onClickInstall}>install</button>}
      {status === 'installed' && <button onClick={connect}>connect</button>}
      {status === 'connected' && <span>{`connected ${account}`}</span>}
    </div>
  )

}

export default Header;