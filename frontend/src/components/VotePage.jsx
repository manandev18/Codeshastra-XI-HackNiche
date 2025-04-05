import { useUser, UserButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export default function VotePage() {
  const { user } = useUser();
  const [selectedElection, setSelectedElection] = useState(null);

  useEffect(() => {
    if (user) {
      console.log("🧑 Clerk User ID:", user.id);
      console.log("📧 Email:", user.primaryEmailAddress.emailAddress);
    }
  }, [user]);

  const elections = [
    {
      id: "1",
      title: "Campus President 2025",
      description: "Vote for the next campus president",
      method: "Approval Voting",
    },
    {
      id: "2",
      title: "Best Hackathon Theme",
      description: "Choose your favorite theme for upcoming hackathons",
      method: "Ranked Choice Voting",
    },
    {
      id: "3",
      title: "Budget Allocation",
      description: "Distribute your vote weight (Quadratic)",
      method: "Quadratic Voting",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-blue-700 mb-6">BallotChain 🗳️</h1>
          <p className="text-sm text-gray-600 mb-2">Welcome,</p>
          <p className="font-medium text-gray-800">{user?.fullName}</p>
          <p className="text-xs text-gray-400">{user?.primaryEmailAddress?.emailAddress}</p>
        </div>
        <div className="mt-8">
  <UserButton
    redirectUrl="/"
    appearance={{
      elements: {
        userButtonAvatarBox: { display: "none" },
      },
    }}
  />
</div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Available Elections</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {elections.map((election) => (
            <div
              key={election.id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
              onClick={() => setSelectedElection(election)}
            >
              <h3 className="text-xl font-semibold text-blue-700">{election.title}</h3>
              <p className="text-gray-600 mt-2">{election.description}</p>
              <span className="text-sm text-blue-500 italic mt-1 block">{election.method}</span>
            </div>
          ))}
        </div>
      </main>

      {/* Vote Modal */}
      {selectedElection && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setSelectedElection(null)}
            >
              ✖
            </button>
            <h3 className="text-2xl font-bold mb-2">{selectedElection.title}</h3>
            <p className="mb-4 text-gray-600">{selectedElection.description}</p>
            <p className="text-sm text-blue-500 italic mb-2">
              Voting method: {selectedElection.method}
            </p>
            <button
              onClick={() => {
                alert("✅ Vote submitted anonymously!");
                setSelectedElection(null);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Submit Vote (Simulated ZKP)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
