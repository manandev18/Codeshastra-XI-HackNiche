pragma circom 2.0.0;

template VoteCircuit() {
    signal input vote;        // private input
    signal output result;     // public output

    // Constraint: vote must be 0 or 1
    vote * (1 - vote) === 0;

    // Output the vote (just proving you voted)
    result <== vote;
}

component main = VoteCircuit();
