const SmartGovernance = artifacts.require("SmartGovernanceVoting");

contract("SmartGovernanceVoting", (accounts) => {
  const admin = accounts[0];
  const voter = accounts[1];
  const otherVoter = accounts[2];

  let instance;

  beforeEach(async () => {
    instance = await SmartGovernance.new();
  });

  it("should deploy the contract properly", async () => {
    assert.ok(instance.address);
  });

  it("should allow registration of a voter", async () => {
    const name = web3.utils.asciiToHex("Alice");
    const ipHash = web3.utils.asciiToHex("127.0.0.1");

    await instance.registerVoter(voter, ipHash, name, { from: admin });

    const voterInfo = await instance.voters.call(voter);
    assert.equal(
      web3.utils.hexToAscii(voterInfo.name).replace(/\u0000/g, ""),
      "Alice",
      "Name should match"
    );
    assert.equal(voterInfo.isRegistered, true, "Voter should be registered");
  });

  it("should allow a registered voter to cast approval vote", async () => {
    const name = web3.utils.asciiToHex("Alice");
    const ipHash = web3.utils.asciiToHex("127.0.0.1");

    await instance.registerVoter(voter, ipHash, name, { from: admin });
    await instance.verifyBiometric(voter, { from: admin });
    await instance.verifySMS(voter, { from: admin });
    await instance.verifyHardwareToken(voter, { from: admin });

    await instance.voteApproval([1, 2], { from: voter });

    const voted = await instance.voters.call(voter);
    assert.equal(voted.hasVoted, true, "Voter should have voted");
  });

  // ✅ New Test 1: Non-admin trying to register voter
  it("should not allow non-admin to register voters", async () => {
    const name = web3.utils.asciiToHex("Bob");
    const ipHash = web3.utils.asciiToHex("127.0.0.2");

    try {
      await instance.registerVoter(otherVoter, ipHash, name, { from: voter });
      assert.fail("Non-admin was able to register a voter");
    } catch (error) {
      assert(error.message.includes("Only admin can register voters"));
    }
  });

  // ✅ New Test 2: Unregistered voter trying to vote
  it("should not allow unregistered voter to vote", async () => {
    try {
      await instance.voteApproval([1], { from: otherVoter });
      assert.fail("Unregistered voter was able to vote");
    } catch (error) {
      assert(error.message.includes("You are not registered to vote"));
    }
  });

  // ✅ New Test 3: Voter trying to vote twice
  it("should not allow a voter to vote twice", async () => {
    const name = web3.utils.asciiToHex("Alice");
    const ipHash = web3.utils.asciiToHex("127.0.0.1");

    await instance.registerVoter(voter, ipHash, name, { from: admin });
    await instance.verifyBiometric(voter, { from: admin });
    await instance.verifySMS(voter, { from: admin });
    await instance.verifyHardwareToken(voter, { from: admin });

    await instance.voteApproval([1], { from: voter });

    try {
      await instance.voteApproval([2], { from: voter });
      assert.fail("Voter was able to vote twice");
    } catch (error) {
      assert(error.message.includes("You have already voted"));
    }
  });
});
