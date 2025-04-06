// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoteCommitment {
    address public admin;

    // electionId => userIdHash => commitment
    mapping(bytes32 => mapping(bytes32 => bytes32)) public commitments;

    // Events
    event VoteSubmitted(bytes32 indexed electionId, bytes32 indexed userIdHash, bytes32 commitment);
    event DisputeDetected(bytes32 indexed electionId, bytes32 indexed userIdHash, string reason);

    constructor() {
        admin = msg.sender;
    }

    function submitVote(bytes32 electionId, bytes32 userIdHash, bytes32 commitment) public {
        // Prevent double voting for the same election
        if (commitments[electionId][userIdHash] != bytes32(0)) {
            emit DisputeDetected(electionId, userIdHash, "Double voting attempt");
            revert("Already voted in this election");
        }

        commitments[electionId][userIdHash] = commitment;

        emit VoteSubmitted(electionId, userIdHash, commitment);
    }

    function getCommitment(bytes32 electionId, bytes32 userIdHash) public view returns (bytes32) {
        return commitments[electionId][userIdHash];
    }
}
