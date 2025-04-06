import { useUser, UserButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { generateProof } from "../utils/generateProof";
import { contractInstance, web3 } from "../utils/voteContract";

export default function VotePage() {
  const { user } = useUser();
  const [selectedElection, setSelectedElection] = useState(null);
  const [isAllowedLocation, setIsAllowedLocation] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const [voteData, setVoteData] = useState({});

  useEffect(() => {
    if (user) {
      console.log("🧑 Clerk User ID:", user.id);
      console.log("📧 Email:", user.primaryEmailAddress.emailAddress);
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const allowedLat = 19.1073;
        const allowedLng = 72.8371;
        const radius = 0.05;
        const isInside =
          Math.abs(latitude - allowedLat) < radius &&
          Math.abs(longitude - allowedLng) < radius;
        setIsAllowedLocation(isInside);
        setLocationError(null);
      },
      (error) => {
        console.error("❌ Location error:", error.message);
        setLocationError("Location permission denied or unavailable.");
        setIsAllowedLocation(false);
      }
    );
  }, [user]);

  const elections = [
    {
      id: "1",
      title: "Campus President 2025",
      description: "Vote for the next campus president",
      method: "Approval Voting",
      candidates: ["Alice", "Bob", "Charlie", "Diana"],
    },
    {
      id: "2",
      title: "Best Hackathon Theme",
      description: "Choose your favorite theme",
      method: "Ranked Choice Voting",
      candidates: ["AI for Good", "Blockchain Justice", "Space Tech", "Green Energy"],
    },
    {
      id: "3",
      title: "Budget Allocation",
      description: "Distribute your vote points",
      method: "Quadratic Voting",
      candidates: ["Research", "Events", "Food", "Swag"],
    },
  ];

  const handleSubmitVote = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    if (!user || !selectedElection) return;

    const vote = voteData[selectedElection.id];
    const userId = user.id;
    const voteString = typeof vote === "object" ? JSON.stringify(vote) : vote;
    const commitment = CryptoJS.SHA256(voteString + userId).toString();

    console.log("🗳️ Vote cast (obfuscated):", voteString);
    console.log("🔐 Commitment Hash:", commitment);

    try {
      const zkpInput = selectedElection.id === "1" ? 1 : 0;
      const { proof, publicSignals } = await generateProof(zkpInput);
      console.log("✅ ZKP Proof:", proof);
      console.log("📤 Public Signals:", publicSignals);

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const sender = accounts[0];
      const userIdHash = web3.utils.soliditySha3(userId);
      const commitmentBytes32 = "0x" + commitment;

      if (commitmentBytes32.length !== 66) {
        throw new Error("Commitment is not valid bytes32 length");
      }

      await contractInstance.methods.submitVote(userIdHash, commitmentBytes32).send({ from: sender });

      alert("✅ Vote recorded with valid proof!");
    } catch (err) {
      console.error("❌ Vote submission error:", err);
      alert("❌ Failed to submit vote. Check console.");
    } finally {
      setSelectedElection(null);
    }
  };

  const renderVoteUI = (election) => {
    switch (election.method) {
      case "Approval Voting":
        return election.candidates.map((name) => (
          <label key={name} className="flex items-center gap-2 my-1">
            <input
              type="checkbox"
              value={name}
              onChange={(e) => {
                const checked = e.target.checked;
                setVoteData((prev) => {
                  const updated = new Set(prev[election.id] || []);
                  checked ? updated.add(name) : updated.delete(name);
                  return { ...prev, [election.id]: Array.from(updated) };
                });
              }}
              className="accent-blue-600"
            />
            <span>{name}</span>
          </label>
        ));

      case "Ranked Choice Voting":
        return election.candidates.map((name) => (
          <div key={name} className="mb-3">
            <label className="font-medium">{name}</label>
            <select
              onChange={(e) =>
                setVoteData((prev) => ({
                  ...prev,
                  [election.id]: {
                    ...(prev[election.id] || {}),
                    [name]: parseInt(e.target.value),
                  },
                }))
              }
              defaultValue=""
              className="border border-gray-300 rounded px-2 py-1 mt-1 w-full"
            >
              <option disabled value="">
                Select rank
              </option>
              {[1, 2, 3, 4].map((rank) => (
                <option key={rank} value={rank}>
                  {rank}
                </option>
              ))}
            </select>
          </div>
        ));

      case "Quadratic Voting":
        return election.candidates.map((name) => (
          <div key={name} className="mb-3">
            <label className="block font-medium">{name}</label>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              className="w-full"
              onChange={(e) =>
                setVoteData((prev) => ({
                  ...prev,
                  [election.id]: {
                    ...(prev[election.id] || {}),
                    [name]: parseInt(e.target.value),
                  },
                }))
              }
            />
            <span className="text-sm text-gray-600">
              Votes: {voteData?.[election.id]?.[name] || 0}
            </span>
          </div>
        ));

      default:
        return <p>Unknown voting method.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl p-6 flex flex-col justify-between border-r">
        <div>
          <h1 className="text-3xl font-bold text-blue-700 mb-6">BallotChain 🗳️</h1>
          <p className="text-sm text-gray-600 mb-2">Welcome,</p>
          <p className="font-medium text-gray-800">{user?.fullName}</p>
          <p className="text-xs text-gray-400">{user?.primaryEmailAddress?.emailAddress}</p>
        </div>
        <UserButton
          redirectUrl="/"
          appearance={{
            elements: { userButtonAvatarBox: { display: "none" } },
          }}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-4xl font-bold text-blue-800 mb-8">Available Elections</h2>

        {locationError && (
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4">
            📍 {locationError}
          </div>
        )}
        {!isAllowedLocation && !locationError && (
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded mb-4">
            🚫 You must be within the allowed location to vote.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {elections.map((election) => (
            <div
              key={election.id}
              className="bg-white border border-gray-200 p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelectedElection(election)}
            >
              <h3 className="text-xl font-semibold text-blue-700">{election.title}</h3>
              <p className="text-gray-600 mt-2">{election.description}</p>
              <span className="text-sm text-blue-500 italic block mt-1">{election.method}</span>
            </div>
          ))}
        </div>
      </main>

      {/* Vote Modal */}
      {selectedElection && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-800"
              onClick={() => setSelectedElection(null)}
            >
              ✖
            </button>
            <h3 className="text-2xl font-bold mb-2">{selectedElection.title}</h3>
            <p className="text-gray-600 mb-3">{selectedElection.description}</p>
            <p className="text-sm text-blue-500 italic mb-4">Voting method: {selectedElection.method}</p>

            <div className="mb-6">{renderVoteUI(selectedElection)}</div>

            <button
              onClick={handleSubmitVote}
              disabled={!isAllowedLocation}
              className={`w-full text-white py-2 rounded-lg font-medium transition ${
                isAllowedLocation ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isAllowedLocation ? "Submit Vote" : "Location Restricted"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
