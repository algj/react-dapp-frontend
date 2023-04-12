import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatAddress, formatNumber } from "../modules/formatNumber.js";
import CopyText from './CopyText.js';
import Loading from './Loading';
import ConnectWalletButton from './WalletConnectButton.js';

function WalletDepositWithdraw({ product }) {
  const [amount, setAmount] = useState('');
  const [isValidAmount, setIsValidAmount] = useState(true);
  const [balanceWallet, setBalanceWallet] = useState(undefined);
  const [balanceStaked, setBalanceStaked] = useState(undefined);
  const [isDeposit, setIsDeposit] = useState(true);

  const regex = /^[.0-9]+(?:[kKmMbBtT]|(?:[eE][-+]?[0-9]+))?$/;

  useEffect(() => {
    const fetchBalance = async () => {
      product.getBalanceWallet().then(b => setBalanceWallet(b));
      product.getBalanceStaked().then(b => setBalanceStaked(b));
    };
    fetchBalance();
    const interval = setInterval(fetchBalance, 30000);
    return () => clearInterval(interval);
  }, [product]);


  const handleAmountChange = (event) => {
    let value = (event.target.value + "").split(',').join('.');
    if (value === '' || regex.test(value)) {
      // Check if the last character is k, K, m, M, t, or T and update the value accordingly
      const lastChar = value.slice(-1);
      if (lastChar === 'k' || lastChar === 'K') {
        value = parseFloat(value.slice(0, -1)) * 1e3;
      } else if (lastChar === 'm' || lastChar === 'M') {
        value = parseFloat(value.slice(0, -1)) * 1e6;
      } else if (lastChar === 'b' || lastChar === 'B') {
        value = parseFloat(value.slice(0, -1)) * 1e9;
      } else if (lastChar === 't' || lastChar === 'T') {
        value = parseFloat(value.slice(0, -1)) * 1e12;
      }

      if (/([eE][-+]?[0-9]+)$/g.test(value + "")) {
        value = value.toLocaleString('fullwide', { useGrouping: false });
      }
      if (+value >= 1e80) value = "";

      setAmount(value + "");
      if (value !== event.target.value + "") {
        event.target.value = value + "";
      }
    }
    handleAmountValidity(value);
  };


  const handleAmountValidity = (value) => {
    value ??= amount;
    value += "";
    if (value === '' || regex.test(value)) {
      setIsValidAmount(value.split(".").length <= 2);
    } else {
      setIsValidAmount(false);
    }
  }

  const handleDeposit = () => {
    setIsDeposit(true);
  };

  const handleWithdraw = () => {
    setIsDeposit(false);
  };

  const handleAmountPercentage = (perc) => {
    let balance = isDeposit ? balanceStaked : balanceWallet;
    if (perc === undefined) {
      setAmount("");
      setIsValidAmount(true);
    } else {
      setAmount(balance * perc);
      handleAmountValidity(balance * perc);
    }
  }

  return (
    <div className="card text-white bg-dark">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img src={product.icon} alt={product.name} width="30" height="30" className="me-2" />
            <span className="h5 mt-1 mb-0">{product.name}</span>
          </div>
          <span className="badge bg-primary">{product.badges[0]}</span>
        </div>
        <hr />
        {/* bi ${isDeposit ? 'bi-box-arrow-in-down' : 'bi-box-arrow-up'} */}
        <div className="btn-group-horizontal mb-3 d-block" role="group">
          <button type="button" className={`w-50 btn ${isDeposit ? 'btn-outline-success btn-success text-white' : 'btn-outline-success'}`} onClick={handleDeposit}>
            <i className="bi bi-box-arrow-in-down me-2"></i>
            Deposit
          </button>
          <button type="button" className={`w-50 btn ${!isDeposit ? 'btn-outline-warning btn-warning text-black' : 'btn-outline-warning'}`} onClick={handleWithdraw}>
            <i className="bi bi-box-arrow-up me-2"></i>
            Withdraw
          </button>
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label text-white">
            Amount to {isDeposit ? "deposit" : "withdraw"} ({formatNumber(amount, 3)} {product.token}):
          </label>
          <div className="input-group">
            <input
              type="text"
              className={`form-control form-control-lg bg-primary rounded ${isValidAmount ? '' : 'is-invalid'} text-white text-center`}
              id="amount"
              placeholder={`Enter amount of ${product.token}`}
              value={amount}
              onChange={handleAmountChange}
              inputMode="numeric"
            />
            <div className="btn-group-vertical ms-2" role="group">
              <button className="btn py-0 px-4 btn-primary" type="button" onClick={() => handleAmountPercentage(1)}>100%</button>
              <button className="btn py-0 px-4 btn-primary" type="button" onClick={() => handleAmountPercentage(0.5)}>50%</button>
              <button className="btn py-0 px-4 btn-primary" type="button" onClick={() => handleAmountPercentage(undefined)}>Clear</button>
            </div>
          </div>
          {!isValidAmount && <div className="text-danger">Please enter a valid amount</div>}
        </div>

          {balanceWallet !== undefined ? (
            <>
              <div className="d-flex justify-content-between align-items-center mx-4 mt-4">
                <div className="text-white mb-1">Wallet Balance:</div>
                <div className="text-white h5"><CopyText value={balanceWallet}>{formatNumber(balanceWallet, 3)} {product.token}</CopyText></div>
              </div>
              <div className="d-flex justify-content-between align-items-center mx-4">
                <div className="text-white mb-1">Staked Balance:</div>
                <div className="text-white h5"><CopyText value={balanceStaked}>{formatNumber(balanceStaked, 3)} {product.token}</CopyText></div>
              </div>
            </>
          ) : (
            <p className="text-muted mt-3 mx-4">Loading balance...</p>
          )}
        <hr />
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <CopyText value={product.contractAddress}>
              <Link to={product.contractLink} className="btn btn-dark">
                <i className="bi bi-box me-2"></i>
                Contract {formatAddress(product.contractAddress)}
              </Link>
            </CopyText>
          </div>
          <ConnectWalletButton>
            <button type="button" className={`btn btn-secondary`} onClick={isDeposit ? handleDeposit : handleWithdraw}>
              <i className={`bi ${isDeposit ? 'bi-box-arrow-in-down' : 'bi-box-arrow-up'} me-2`}></i>
              {isDeposit ? 'Deposit' : 'Withdraw'}
            </button>
          </ConnectWalletButton>
        </div>

      </div>
    </div>
  );
}
export default WalletDepositWithdraw;
