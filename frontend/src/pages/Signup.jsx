import { useState } from "react";
import { UserPlus, AlertCircle, Eye, EyeClosed } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../redux/actions/userActions.js";
import { useDispatch } from "react-redux";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    const responce = await dispatch(
      userRegister({ username, phone, email, password }),
    );

    if (responce?.error?.message === "Rejected") {
      await setLoading(false);
      await setError(JSON.stringify(responce.payload));
    } else {
      setTimeout(() => {
        setEmail("");
        setPassword("");
        setUsername("");
        setPhone("");
        setLoading(false);
        navigate("/login");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">SPORTX</h1>
          <p className="text-gray-400">Premium Sports Equipment</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
          <div className="flex items-center gap-2 mb-6">
            <UserPlus className="text-white" size={24} />
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
          </div>

          {error && (
            <div className="bg-red-950 border border-red-900 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                placeholder="Rohan Sane"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                phone No
              </label>
              <input
                id="phone"
                type="number"
                minLength={10}
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                placeholder="8424XXXXX1"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type={show === true ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                placeholder="••••••••"
              />
              {show === true ? (
                <Eye
                  onClick={() => setShow((c) => !c)}
                  className="absolute right-3 cursor-pointer top-13 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                />
              ) : (
                <EyeClosed
                  onClick={() => setShow((c) => !c)}
                  className="absolute right-3 cursor-pointer top-13 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-white hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
