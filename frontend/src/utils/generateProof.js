import { groth16 } from "snarkjs";

export async function generateProof(inputSignal) {
  const input = { vote: inputSignal };

  const { proof, publicSignals } = await groth16.fullProve(
    input,
    "/zkp/vote.wasm",
    "/zkp/vote.zkey"
  );

  return { proof, publicSignals };
}
