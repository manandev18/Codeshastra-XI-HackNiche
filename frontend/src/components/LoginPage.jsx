import { useState } from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login to BallotChain" : "Create a BallotChain Account"}
        </h1>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 border rounded"
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 underline"
          >
            {isLogin ? "Sign up here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
}
