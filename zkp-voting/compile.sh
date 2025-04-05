#!/bin/bash

circom vote.circom --r1cs --wasm --sym -o build

# Setup Powers of Tau ceremony
snarkjs powersoftau new bn128 12 pot12_0000.ptau -v
snarkjs powersoftau contribute pot12_0000.ptau pot12_final.ptau --name="First contribution" -v

# Generate zkey for this circuit
snarkjs groth16 setup build/vote.r1cs pot12_final.ptau build/vote_0000.zkey
snarkjs zkey contribute build/vote_0000.zkey build/vote_final.zkey --name="ZKP Voting Contributor" -v

# Export verification key
snarkjs zkey export verificationkey build/vote_final.zkey build/verification_key.json
