import Web3 from "web3";
import VoteCommitment from "../abi/VoteCommitment.json"; // Adjust path if needed

const web3 = new Web3(window.ethereum);

const contractAddress = "0x4B36ccc30A155cD6c37950181F94E14F7fbE3984";
const contractInstance = new web3.eth.Contract(VoteCommitment.abi, contractAddress);

export { web3, contractInstance };
