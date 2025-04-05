require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
const { PRIVATE_KEY, ALCHEMY_API_KEY } = process.env;
// console.log("PRIVATE_KEY from env:", process.env.PRIVATE_KEY);
// console.log("PRIVATE_KEY from env:", PRIVATE_KEY);

module.exports = {
  solidity: {
    version: "0.8.28", // 👈 Match the pragma in Lock.sol
  },
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/1eNwQnQIMak0qALf-Fc0GvNMDuwubKnm",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
