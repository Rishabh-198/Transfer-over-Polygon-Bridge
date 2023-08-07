require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: {
    version: "0.8.1",
  },
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/a72f479c5bde43e39e3fa15e646bf4b8",
      accounts: ['d3d6d0b3caa72d10e1ed51a4289d921e6ef7f27cc9d913c906e32338ebc5b22d'],
    },
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78",
      accounts: ['d3d6d0b3caa72d10e1ed51a4289d921e6ef7f27cc9d913c906e32338ebc5b22d'],
    },
    goerli: {
      url: "https://goerli.infura.io/v3/a72f479c5bde43e39e3fa15e646bf4b8",
      accounts: ['d3d6d0b3caa72d10e1ed51a4289d921e6ef7f27cc9d913c906e32338ebc5b22d'],
    },
  },
};


