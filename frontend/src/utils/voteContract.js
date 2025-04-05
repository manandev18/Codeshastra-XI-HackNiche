import Web3 from "web3";
import VoteCommitment from "../abi/VoteCommitment.json"; // Adjust path if needed

const web3 = new Web3(window.ethereum);

const contractAddress = "0xD2D3C6e3b0904F5b9a27093959f607a352185783";
const contractInstance = new web3.eth.Contract(VoteCommitment.abi, contractAddress);

export { web3, contractInstance };
