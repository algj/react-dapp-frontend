import { useState, useEffect } from "react";
import { getCryptoWallet } from "../modules/crypto";
import { formatAddress } from "../modules/formatNumber";

const ConnectWalletButton = ({ wallet, children, integratedMenu=false }) => {
  const [walletAddress, setWalletAddress] = useState(wallet??null);

  async function connectWallet() {
    if(wallet) setWalletAddress(wallet);
    setWalletAddress("0x216312382621838");//await getCryptoWallet());
  }

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    integratedMenu || (!walletAddress===null && wallet) ? (
    <button className="btn btn-outline-success" type="button" data-bs-toggle="modal" data-bs-target="#walletModal" onClick={connectWallet}>
      {!walletAddress===null ? 'LOADING...' : walletAddress ? "WALLET "+formatAddress(walletAddress) : "CONNECT WALLET"}
    </button>
    ) : (
      children
    )
  )
}

export default ConnectWalletButton;
