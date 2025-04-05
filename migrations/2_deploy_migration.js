const SmartGovernanceVoting = artifacts.require("SmartGovernanceVoting");

module.exports = function (deployer) {
  deployer.deploy(SmartGovernanceVoting);
};
