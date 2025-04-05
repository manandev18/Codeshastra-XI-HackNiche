export default function HomePage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Welcome to BallotChain 🗳️</h1>
        <a href="/login" className="text-blue-500 underline">Login to continue</a>
      </div>
    );
  }
  