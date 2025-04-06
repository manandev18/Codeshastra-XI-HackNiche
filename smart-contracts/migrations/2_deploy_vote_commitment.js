const VoteCommitment = artifacts.require("VoteCommitment");

module.exports = function (deployer) {
  deployer.deploy(VoteCommitment /*, constructor params if any */);
};
