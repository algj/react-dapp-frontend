import memoize from "memoizee";
import { formatNumber } from "./formatNumber.js";

import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider);

const maxAgeStatic = 2 * 60 * 1000; // cache everything for 2 minutes for mostly static functions
const maxAgeRealTime = 1000; // real-time things (such as prices) may be updated every second

// ---

async function _getDepositAssets() {
  return [
    "aave",
    "uni",
    "eth",
    "bnb",
    "matic",
    "sol",
    "dot",
    "link",
    "xmr",
  ].map(i => ({ name: i.toUpperCase(), key: i.toLowerCase(), icon: "/img/crypto/color/" + i.toLowerCase() + ".svg", disabled: false }));
}
export const getDepositAssets = memoize(_getDepositAssets, { maxAge: maxAgeStatic, promise: true });

// ---

async function _getStrategyList() {
  // markdown descriptions
  return [
    {
      name: "Covered Call",
      key: "covered-call",
      description: "",
    },
    {
      name: "Put Selling",
      key: "put-selling",
      description: "",
    },
  ]
}
export const getStrategyList = memoize(_getStrategyList, { maxAge: maxAgeStatic, promise: true });

// ---

async function _getProducts() {
  async function getBalanceWallet() {
    const product = this;
    return product.currentDeposits / 420 + "";
  }
  async function getBalanceStaked() {
    const product = this;
    return 0 + "";
  }


  async function allowTokenUsage(token){
    const product = this;
    return true;
  }
  async function hasTokenUsageApproved(token){
    const product = this;
    return false;
  }

  return [
    {
      // ID of the product
      id: "t-eth-c",
      // Number ID of the product
      nrID: 0,
      // Asset of the product
      asset: "eth",
      // Strategy of the product
      strategy: "covered-call",

      icon: "/img/crypto/color/eth.svg",
      name: "T-ETH-C",
      token: "ETH",
      colorRGB: "#627EEA",
      badges: ["Covered Call", "ETH"],
      info: [
        {
          text: "Weekly Strike Price",
          value: formatNumber(20000) + " ETH",
          color: "white",
        },
        {
          text: "Current Price",
          value: formatNumber(10000) + " ETH",
          color: "cyan",
        },
      ],
      priceProgress: { from: 0.25, to: 0.5 },
      projectedAPY: 10.5,
      currentDeposits: 1000000,
      maxCapacity: 5000000,

      description: `
# VAULT STRATEGY

The ETH Vault strategy of Covered Call involves simultaneously holding a long position in Ether (ETH) while also selling call options on that same ETH. The goal of this strategy is to generate additional income from the sale of the call options, while also limiting potential losses on the ETH position.

In a Covered Call strategy, the investor first buys a certain amount of ETH and then sells call options with a strike price higher than the current market price of ETH. By selling these call options, the investor is essentially agreeing to sell their ETH at the higher strike price if the option is exercised by the option holder.

The premium earned from selling the call options can provide a source of income for the investor, especially if the options expire unexercised. If the options are exercised, however, the investor will be required to sell their ETH at the strike price, which may limit potential gains if the price of ETH continues to rise.

## RISK

The Covered Call strategy for ETH Vault can provide additional income and downside protection, but it also comes with risks. 

- If the price of ETH rises significantly above the strike price of the call options that you have sold, you may miss out on potential profits. 
- You could also face losses on the underlying ETH position if the price of ETH drops. 
- Furthermore, there is the possibility of being assigned to sell the ETH at the lower strike price, and the income generated from selling call options may not be enough to offset potential losses. 

General market risks such as [market volatility][1], [liquidity risk][2], and [systemic risk][3] may also impact the price of ETH and the call options sold. It is important to carefully consider your risk tolerance and investment objectives before implementing this strategy in your portfolio.

[1]: https://www.investopedia.com/terms/v/volatility.asp
[2]: https://www.investopedia.com/terms/l/liquidityrisk.asp
[3]: https://www.investopedia.com/terms/s/systemic-risk.asp
`,

      contractAddress: "0xDD9d1B7dEaB1A843A1B584d2CA5903B8A4735deF",
      contractLink: "https://etherscan.io/address/0xDD9d1B7dEaB1A843A1B584d2CA5903B8A4735deF",
    },

    {
      id: "t-bnb-c",
      nrID: 1,
      asset: "bnb",
      strategy: "covered-call",
      icon: "/img/crypto/color/bnb.svg",
      name: "T-BNB-C",
      token: "BNB",
      colorRGB: "#F0B90B",
      badges: ["Covered Call", "BNB"],
      info: [
        {
          text: "Weekly Strike Price",
          value: formatNumber(500) + " BNB",
          color: "white",
        },
        {
          text: "Current Price",
          value: formatNumber(400) + " BNB",
          color: "cyan",
        },
      ],
      priceProgress: { from: 0.2, to: 0.5 },
      projectedAPY: 9.8,
      currentDeposits: 800000,
      maxCapacity: 4000000,
      description: `
# VAULT STRATEGY

The BNB Vault strategy of Covered Call involves simultaneously holding a long position in Binance Coin (BNB) while also selling call options on that same BNB. The goal of this strategy is to generate additional income from the sale of the call options, while also limiting potential losses on the BNB position.

In a Covered Call strategy, the investor first buys a certain amount of BNB and then sells call options with a strike price higher than the current market price of BNB. By selling these call options, the investor is essentially agreeing to sell their BNB at the higher strike price if the option is exercised by the option holder.

The premium earned from selling the call options can provide a source of income for the investor, especially if the options expire unexercised. If the options are exercised, however, the investor will be required to sell their BNB at the strike price, which may limit potential gains if the price of BNB continues to rise.

## RISK

The Covered Call strategy for BNB Vault can provide additional income and downside protection, but it also comes with risks. 

- If the price of BNB rises significantly above the strike price of the call options that you have sold, you may miss out on potential profits. 
- You could also face losses on the underlying BNB position if the price of BNB drops. 
- Furthermore, there is the possibility of being assigned to sell the BNB at the lower strike price, and the income generated from selling call options may not be enough to offset potential losses. 

General market risks such as [market volatility][1], [liquidity risk][2], and [systemic risk][3] may also impact the price of BNB and the call options sold. It is important to carefully consider your risk tolerance and investment objectives before implementing this strategy in your portfolio.

[1]: https://www.investopedia.com/terms/v/volatility.asp
[2]: https://www.investopedia.com/terms/l/liquidityrisk.asp
[3]: https://www.investopedia.com/terms/s/systemic-risk.asp
`,
      contractAddress: "0x1234567890",
      contractLink: "https://ethererscan.io/address/0x1234567890",
    },

    {
      id: "t-matic-c",
      nrID: 2,
      asset: "matic",
      strategy: "covered-call",
      icon: "/img/crypto/color/matic.svg",
      name: "T-MATIC-C",
      token: "MATIC",
      colorRGB: "#8247E5",
      badges: ["Covered Call", "MATIC"],
      info: [
        {
          text: "Weekly Strike Price",
          value: formatNumber(10_000) + " MATIC",
          color: "white",
        },
        {
          text: "Current Price",
          value: formatNumber(7_500) + " MATIC",
          color: "cyan",
        },
      ],
      priceProgress: { from: 0.3, to: 0.5 },
      projectedAPY: 12.3,
      currentDeposits: 2_000_000,
      maxCapacity: 8_000_000,
      description: `
# VAULT STRATEGY

The MATIC Vault strategy of Covered Call involves simultaneously holding a long position in Polygon (MATIC) while also selling call options on that same MATIC. The goal of this strategy is to generate additional income from the sale of the call options, while also limiting potential losses on the MATIC position.

In a Covered Call strategy, the investor first buys a certain amount of MATIC and then sells call options with a strike price higher than the current market price of MATIC. By selling these call options, the investor is essentially agreeing to sell their MATIC at the higher strike price if the option is exercised by the option holder.

The premium earned from selling the call options can provide a source of income for the investor, especially if the options expire unexercised. If the options are exercised, however, the investor will be required to sell their MATIC at the strike price, which may limit potential gains if the price of MATIC continues to rise.

## RISK

The Covered Call strategy for MATIC Vault can provide additional income and downside protection, but it also comes with risks. 

- If the price of MATIC rises significantly above the strike price of the call options that you have sold, you may miss out on potential profits. 
- You could also face losses on the underlying MATIC position if the price of MATIC drops. 
- Furthermore, there is the possibility of being assigned to sell the MATIC at the lower strike price, and the income generated from selling call options may not be enough to offset potential losses. 

General market risks such as [market volatility][1], [liquidity risk][2], and [systemic risk][3] may also impact the price of MATIC and the call options sold. It is important to carefully consider your risk tolerance and investment objectives before implementing this strategy in your portfolio.

[1]: https://www.investopedia.com/terms/v/volatility.asp
[2]: https://www.investopedia.com/terms/l/liquidityrisk.asp
[3]: https://www.investopedia.com/terms/s/systemic-risk.asp
`,
      contractAddress: "0x1234567890",
      contractLink: "https://etherscan.io/address/0x1234567890",
    },
    

  ].map(proj=>({
    ...proj, 

    // Async getters
    getBalanceWallet,
    getBalanceStaked,
    hasTokenUsageApproved,

    // Async actions
    allowTokenUsage,
  }));
};
export const getProducts = memoize(_getProducts, { maxAge: maxAgeRealTime, promise: true });


// ---

async function _getProductByID(id) {
  return (await getProducts()).find(i => i.id === id);
};
export const getProductByID = memoize(_getProductByID, { maxAge: maxAgeRealTime, promise: true });

// ---

export async function getCryptoWallet() {
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
};