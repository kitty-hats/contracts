module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,  // ganache
      network_id: "*", // Match any network id
      gasPrice: 3000000000,  // 3 gwei
      gas: 2300000,
      from: "0x9380d7ac91b1bf4dc48ae8e1b0c11160188acddc"
    },
    ropsten: {
      network_id: 3,
      host: "localhost",
      port: 8545,
      gasPrice: 3000000000,  // 3 gwei
      gas: 2300000,
      from: "0x9380d7ac91b1bf4dc48ae8e1b0c11160188acddc"
    },
    mainnet: {
      network_id: 1,
      host: "localhost",
      port: 8545,
      gasPrice: 3000000000,  // 3 gwei
      gas: 2300000,
      from: "0x9380d7ac91b1bf4dc48ae8e1b0c11160188acddc"
    }
  }
};
