// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SmartGovernanceVoting {
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    enum VoteType { Approval, Ranked, Quadratic }
    enum DisputeStatus { None, Raised, Resolved }

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        bool verifiedBiometric;
        bool verifiedSMS;
        bool verifiedHardware;
        bytes32 ipHash;
        bytes32 name; // Added name field
    }

    struct RankedVote {
        uint[] rankedOptions;
    }

    struct Dispute {
        address voter;
        string reason;
        DisputeStatus status;
    }

    mapping(address => Voter) public voters;
    mapping(address => mapping(uint => bool)) private approvalVotes;
    mapping(address => mapping(uint => uint)) private quadraticVotes;
    mapping(address => RankedVote) private rankedVotes;

    Dispute[] public disputes;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can register voters");
        _;
    }

    modifier onlyVerified(address _voter) {
        Voter memory v = voters[_voter];
        require(v.verifiedBiometric && v.verifiedSMS && v.verifiedHardware, "You are not registered to vote");
        _;
    }

    function registerVoter(address _voter, bytes32 _ipHash, bytes32 _name) public onlyAdmin {
        voters[_voter] = Voter(true, false, false, false, false, _ipHash, _name);
    }

    function verifyBiometric(address _voter) public onlyAdmin {
        voters[_voter].verifiedBiometric = true;
    }

    function verifySMS(address _voter) public onlyAdmin {
        voters[_voter].verifiedSMS = true;
    }

    function verifyHardwareToken(address _voter) public onlyAdmin {
        voters[_voter].verifiedHardware = true;
    }

    function voteApproval(uint[] memory options) public onlyVerified(msg.sender) {
        require(!voters[msg.sender].hasVoted, "You have already voted");
        for (uint i = 0; i < options.length; i++) {
            approvalVotes[msg.sender][options[i]] = true;
        }
        voters[msg.sender].hasVoted = true;
    }

    function voteRanked(uint[] memory rankedOptions) public onlyVerified(msg.sender) {
        require(!voters[msg.sender].hasVoted, "You have already voted");
        rankedVotes[msg.sender] = RankedVote(rankedOptions);
        voters[msg.sender].hasVoted = true;
    }

    function voteQuadratic(uint[] memory options, uint[] memory weights) public onlyVerified(msg.sender) {
        require(!voters[msg.sender].hasVoted, "You have already voted");
        require(options.length == weights.length, "Mismatched inputs");

        for (uint i = 0; i < options.length; i++) {
            require(weights[i] * weights[i] <= 10, "Exceeded quadratic budget");
            quadraticVotes[msg.sender][options[i]] = weights[i];
        }
        voters[msg.sender].hasVoted = true;
    }

    function getApprovalVote(address voter, uint option) public view returns (bool) {
        return approvalVotes[voter][option];
    }

    function getQuadraticVote(address voter, uint option) public view returns (uint) {
        return quadraticVotes[voter][option];
    }

    function getRankedVote(address voter) public view returns (uint[] memory) {
        return rankedVotes[voter].rankedOptions;
    }

    function getVoterName(address voter) public view returns (string memory) {
        return string(abi.encodePacked(voters[voter].name));
    }

    function raiseDispute(string memory reason) public {
        require(voters[msg.sender].isRegistered, "Not a registered voter");
        disputes.push(Dispute({
            voter: msg.sender,
            reason: reason,
            status: DisputeStatus.Raised
        }));
    }

    function resolveDispute(uint disputeIndex) public onlyAdmin {
        require(disputeIndex < disputes.length, "Invalid dispute index");
        require(disputes[disputeIndex].status == DisputeStatus.Raised, "Dispute is not in a raised state");
        disputes[disputeIndex].status = DisputeStatus.Resolved;
    }

    function isAllowedGeoVote(address voter, bytes32 currentIPHash) public view returns (bool) {
        return voters[voter].ipHash == currentIPHash;
    }
}
