module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Ganache
      port: 8545,            // Check this in Ganache GUI
      network_id: "*",       // Accept any network ID
      gas: 6721975,          // Set gas limit for deployment
      gasPrice: 20000000000, // Optional: Set gas price
    },
  },
  compilers: {
    solc: {
      version: "0.8.21",     // Make sure this matches your contract
    },
  },
};
