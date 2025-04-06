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

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useAuth();
  return isSignedIn ? children : <Navigate to="/sign-in" />;
};

const FeatureIcon = ({ icon, fallback, label, iconColor }) => {
  const [failed, setFailed] = useState(false);
  return (
    <div className="flex flex-col items-center text-center w-32">
      <div className="h-16 w-16 mb-2 flex items-center justify-center">
        {!failed ? (
          <img
            src={icon}
            alt={label}
            className="max-h-full max-w-full"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className={`text-4xl ${iconColor}`}>{fallback}</span>
        )}
      </div>
      <p className="text-sm font-medium text-gray-700 whitespace-pre-line">{label}</p>
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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logoo.png"
            alt="BallotChain Logo"
            className="h-20 w-30 "
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/40";
            }}
          />
          <h1 className="text-2xl font-bold text-blue-700">BallotChain</h1>
        </div>
        <div>
          <SignedOut>
            <SignInButton fallbackRedirectUrl="/vote">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton fallbackRedirectUrl="/" />
          </SignedIn>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center p-6">
        {/* Welcome Section */}
        {location.pathname === "/" && (
          <>
            <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-8 text-center mb-10 border">
              <img
                src="/logoo.png"
                alt="BallotChain Logo"
                className="mx-auto mb-6 w-40 h-30"
              />
              <h2 className="text-3xl font-bold text-blue-800 mb-3">Welcome to BallotChain</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Secure, Transparent, and Decentralized Voting powered by Blockchain.
              </p>
            </div>

            {/* Features Section */}
            <div className="w-full max-w-5xl bg-white shadow-md border rounded-xl p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
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
                  iconColor: "text-yellow-600",
                },
                {
                  icon: "/icons/detective.png",
                  fallback: "🕵️",
                  label: "ZKP\nVoting",
                  iconColor: "text-indigo-600",
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
          </>
        )}
      </main>

  {/* Routes */}
  <Routes>
    <Route
      path="/sign-in"
      element={
        <SignIn
          routing="path"
          path="/sign-in"
          appearance={{
            elements: {
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white font-medium",
            },
          }}
          signInOptions={{
            identifierFirst: true, // Show email/phone first, then OTP step
          }}
        />
      }
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
  );
}
