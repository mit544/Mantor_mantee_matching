"use client"
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPopup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: true, // this allows NextAuth to run its internal redirect logic
      callbackUrl: "/", // baseUrl will be used for role-based redirection
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      setError("");
      setShowPopup(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowPopup(true)}
        className="bg-primary text-background font-semibold px-4 py-2 rounded-lg shadow hover:shadow-lg"
      >
        Login
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-background p-8 rounded-2xl shadow-2xl w-96 relative">
            <button
              className="absolute top-2 right-4 text-xl font-bold text-text hover:text-red-600"
              onClick={() => setShowPopup(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-text">Login to MentorSync</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-text mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-text mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-primary text-background py-2 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
