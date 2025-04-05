pragma circom 2.0.0;

template VoteProof() {
    // Private input (your vote): must be 0 or 1
    signal input vote;

    // Public hash of the vote, to verify proof is linked
    signal output voteHash;

    // Ensure the vote is 0 or 1
    vote * (1 - vote) === 0;

    // Simple commitment: hash = vote * constant (we'll simulate this)
    voteHash <== vote * 1234567;
}

component main = VoteProof();
