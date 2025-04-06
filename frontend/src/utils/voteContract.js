import Web3 from "web3";
import VoteCommitment from "../abi/VoteCommitment.json"; // Adjust path if needed

const web3 = new Web3(window.ethereum);

const contractAddress = "0x4569F76eE43D03ff7aD727Df263B2eC5c2a54614";
const contractInstance = new web3.eth.Contract(VoteCommitment.abi, contractAddress);

export { web3, contractInstance };
