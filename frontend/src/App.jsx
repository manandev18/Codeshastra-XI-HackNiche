import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  SignInButton,
  UserButton,
  RedirectToSignIn,
  useAuth,
} from "@clerk/clerk-react";
import { useEffect } from "react";
import VotePage from "./components/VotePage";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn && location.pathname === "/") {
      navigate("/vote");
    }
  }, [isSignedIn, location.pathname, navigate]);

  return (
    <div
      style={{
        backgroundImage: `url("/background.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        backgroundAttachment: "fixed", // Optional: makes background fixed during scroll
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header */}
      <header className="p-4 border-b flex justify-between items-center bg-white/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-8 w-8 object-contain" // Added object-contain for better image fitting
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "https://via.placeholder.com/32"; // Fallback image
            }}
          />
          <h1 className="text-xl font-bold">BallotChain</h1>
        </div>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton fallbackRedirectUrl="/vote" />
          </SignedOut>
          <SignedIn>
            <UserButton fallbackRedirectUrl="/" />
          </SignedIn>
        </div>
      </header>

      {/* Main */}
      <main className="p-4 bg-white bg-opacity-80 min-h-[calc(100vh-64px)]">
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
              <SignedIn>
                <VotePage />
              </SignedIn>
            }
          />

          <Route path="/" element={<h2>Welcome! Sign in to continue.</h2>} />
        </Routes>
      </main>
    </div>
  );
}