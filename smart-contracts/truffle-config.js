module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Ganache
      port: 5000,            // Check this in Ganache GUI
      network_id: "*",       // Accept any network ID
      gas: 10000000,          // Set gas limit for deployment
    },
  },
  compilers: {
    solc: {
      version: "0.8.21",     // Make sure this matches your contract
    },
  },
};
