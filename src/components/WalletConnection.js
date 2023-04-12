import React from 'react';

const WalletConnection = ()=>{
  return (
    <div className="modal fade" id="walletModal" tabIndex="-1" aria-labelledby="walletModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="walletModalLabel">Connect to Web3 Wallet</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body text-black">
            <p>Please connect to your Web3 wallet to continue.</p>
            <button className="btn btn-primary" onClick={async () => {
              try {
                // Will open the MetaMask UI
                await window.ethereum.request({ method: 'eth_requestAccounts' });
              } catch (error) {
                console.error(error);
              }
            }}>Connect Wallet</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletConnection;