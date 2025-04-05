import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  SignInButton,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import VotePage from "./components/VotePage";

// Reusable Protected Route
const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useAuth();
  return isSignedIn ? children : <Navigate to="/sign-in" />;
};

// Reusable Icon Component
const FeatureIcon = ({ icon, fallback, label, iconColor }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center text-center w-32">
      <div className="h-20 w-20 flex items-center justify-center">
        {!failed ? (
          <img
            src={icon}
            alt={label}
            className="max-w-full max-h-full"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className={`text-6xl ${iconColor}`}>{fallback}</span>
        )}
      </div>
      <p className="mt-2 font-semibold text-base text-white whitespace-pre-line">
        {label}
      </p>
    </div>
  );
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn } = useAuth();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (isSignedIn && location.pathname === "/" && !hasRedirected) {
      navigate("/vote");
      setHasRedirected(true);
    }
  }, [isSignedIn, location.pathname, navigate, hasRedirected]);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/backgroundimage.png')",
        backgroundColor: "#001429",
      }}
    >
      <div className="min-h-screen w-full flex flex-col bg-black/40 backdrop-blur-sm">
        {/* Header */}
        <header className="p-6 text-center">
          <div className="flex justify-center items-center gap-4">
            {/* <img src="/logo.png" alt="BallotChain Logo" className="h-24 w-auto" /> */}
            {/* <img src="/logo.png" alt="BallotChain Logo" className="h-32 w-auto" /> */}
            <img src="/logo.png" alt="BallotChain Logo" className="mb-4 h-32 w-32" />



            <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
              BallotChain
            </h1>
          </div>
        </header>

        {/* Main Card Section */}
        <main className="flex flex-col items-center justify-center px-4 py-6 flex-grow">
        <div className="w-full max-w-md h-[45vh] flex flex-col justify-center items-center bg-white/10 text-white shadow-[0_0_30px_10px_rgba(0,123,255,0.3)] rounded-3xl p-6 backdrop-blur-md mb-6">
            {/* Logo */}
            <img
  src="/logo.png"
  alt="BallotChain Logo"
  className="mb-8 w-full max-w-[120px] h-auto"
/>

            {/* Title */}
            <h2 className="text-4xl font-extrabold mb-3 text-center">
              Welcome to BallotChain
            </h2>
            {/* Subtitle */}
            <p className="text-lg font-medium mb-6 text-center max-w-md leading-relaxed">
              Secure, Transparent, and Decentralized Voting<br />
              powered by Blockchain.
            </p>
            {/* Auth Button */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-6 py-3 bg-white text-blue-800 text-lg font-semibold rounded-xl shadow hover:bg-gray-100 transition">
                  Sign In to Vote
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton fallbackRedirectUrl="/" />
            </SignedIn>
          </div>

          {/* Feature Icons */}
          <div className="w-full flex flex-wrap justify-center items-center gap-10 px-4 py-4 bg-white/10 rounded-2xl">
            {[
              {
                icon: "/icons/scales.png",
                fallback: "⚖️",
                label: "Dispute\nResolution",
                iconColor: "text-yellow-500",
              },
              {
                icon: "/icons/briefcase.png",
                fallback: "💼",
                label: "Smart\nContracts",
                iconColor: "text-amber-700",
              },
              {
                icon: "/icons/lock.png",
                fallback: "🔒",
                label: "Multi-Factor\nAuth",
                iconColor: "text-yellow-500",
              },
              {
                icon: "/icons/detective.png",
                fallback: "🕵️",
                label: "ZKP\nVoting",
                iconColor: "text-indigo-400",
              },
              {
                icon: "/icons/location-pin-2.png",
                fallback: "📍",
                label: "Geofencing",
                iconColor: "text-pink-500",
              },
            ].map((feature, idx) => (
              <FeatureIcon key={idx} {...feature} />
            ))}
          </div>
        </main>

        {/* Routes */}
        <Routes>
          <Route
            path="/sign-in"
            element={<SignIn routing="path" path="/sign-in" fallbackRedirectUrl="/vote" />}
          />
          <Route
            path="/sign-up"
            element={<SignUp routing="path" path="/sign-up" fallbackRedirectUrl="/vote" />}
          />
          <Route
            path="/vote"
            element={
              <ProtectedRoute>
                <VotePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
