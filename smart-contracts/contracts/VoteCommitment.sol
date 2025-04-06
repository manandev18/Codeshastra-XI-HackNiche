// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoteCommitment {
    address public admin;

    mapping(bytes32 => bytes32) public commitments;

    event VoteSubmitted(bytes32 indexed userIdHash, bytes32 commitment);

    constructor() {
        admin = msg.sender;
    }

    function submitVote(bytes32 userIdHash, bytes32 commitment) public {
        require(commitments[userIdHash] == bytes32(0), "Already voted: user has already submitted a vote");
        commitments[userIdHash] = commitment;

        emit VoteSubmitted(userIdHash, commitment);
    }

    function getCommitment(bytes32 userIdHash) public view returns (bytes32) {
        return commitments[userIdHash];
    }
}
