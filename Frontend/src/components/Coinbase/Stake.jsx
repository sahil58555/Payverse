import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PiggyBank, Wallet, TrendingUp } from "lucide-react";
import axios from "axios";
import { backendDomain } from "../../constant/domain";
const sampleStakingHistory = [
  {
    id: 1,
    date: "2024-03-15 14:30",
    amount: 1.5,
    type: "stake",
    status: true,
    apy: "5.2%",
  },
  {
    id: 2,
    date: "2024-03-14 09:15",
    amount: 0.8,
    type: "unstake",
    status: false,
    apy: "5.2%",
  },
  {
    id: 3,
    date: "2024-03-16 16:45",
    amount: 0.3,
    type: "claim",
    status: true,
    apy: "5.2%",
  },
];

export default function Stake() {
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [stakeBalance, setStakeBalance] = useState(0);
  const [unstakeBalance, setUnstakeBalance] = useState(0);
  const navigate = useNavigate();

  const fetchStakeBalance = async () => {
    const response = await axios.get(`${backendDomain}/stake/stake-balance`);

    setStakeBalance(response.data.balance);
  };

  const fetchUnstakeBalance = async () => {
    const response = await axios.get(`${backendDomain}/stake/unstake-balance`);

    setUnstakeBalance(response.data.balance);
  };

  const stakeOperation = async () => {
    const response = await axios.post(`${backendDomain}/stake/stake-amount`, {
      amount: stakeAmount,
    });

    console.log(response.data);
  };

  const unstakeOperation = async () => {
    const response = await axios.post(`${backendDomain}/stake/unstake-amount`, {
      amount: unstakeAmount,
    });

    console.log(response.data);
  };

  const handleStake = async () => {
    await stakeOperation();
    window.location.reload();
  };

  const handleUnstake = async () => {
    await unstakeOperation();
    window.location.reload();
  };

  const handleClaim = () => {
    console.log("Claiming:", claimAmount, "ETH");
  };

  const totalRewards = 0.23;
  const averageAPY = "5.2%";

  useEffect(() => {
    fetchStakeBalance();
    fetchUnstakeBalance();
  }, []);

  return (
    <div className="min-h-screen bg-crypto-dark text-white p-4">
      <button
        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-4"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="max-w-full mx-auto space-y-4">
        <div className="bg-crypto-card border border-gray-800 rounded-xl p-4 hover:border-indigo-500/50 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Stake Your ETH
              </h1>
              <p className="text-gray-400 mt-2">
                Earn rewards by staking your ETH in our shared pools
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-crypto-dark rounded-xl p-4 border border-gray-800">
            <div className="flex items-center space-x-3 mb-2">
              <PiggyBank className="w-5 h-5 text-indigo-400" />
              <span className="text-gray-400">Available Staked ETH</span>
            </div>
            <div className="text-2xl font-bold">{stakeBalance} ETH</div>
            <div className="text-green-400 text-sm">+15.3% this month</div>
          </div>

          <div className="bg-crypto-dark rounded-xl p-4 border border-gray-800">
            <div className="flex items-center space-x-3 mb-2">
              <Wallet className="w-5 h-5 text-purple-400" />
              <span className="text-gray-400">Available Unstaked ETH</span>
            </div>
            <div className="text-2xl font-bold">{unstakeBalance} ETH</div>
            <div className="text-green-400 text-sm">+2.8% this week</div>
          </div>

          <div className="bg-crypto-dark rounded-xl p-4 border border-gray-800">
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-gray-400">Average APY</span>
            </div>
            <div className="text-2xl font-bold">{averageAPY}</div>
            <div className="text-green-400 text-sm">+0.5% this week</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-crypto-card border border-gray-800 rounded-xl p-4 hover:border-indigo-500/50 transition-all">
            <h2 className="text-xl font-bold mb-4">Stake ETH</h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Amount to stake"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="flex-1 px-4 py-2 bg-crypto-dark border border-gray-800 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
              />
              <button
                onClick={handleStake}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all"
              >
                Stake
              </button>
            </div>
          </div>

          <div className="bg-crypto-card border border-gray-800 rounded-xl p-4 hover:border-indigo-500/50 transition-all">
            <h2 className="text-xl font-bold mb-4">Unstake ETH</h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Amount to unstake"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
                className="flex-1 px-4 py-2 bg-crypto-dark border border-gray-800 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
              />
              <button
                onClick={handleUnstake}
                className="px-6 py-2 rounded-lg border border-gray-700 hover:border-indigo-500 transition-all"
              >
                Unstake
              </button>
            </div>
          </div>

          <div className="bg-crypto-card border border-gray-800 rounded-xl p-4 hover:border-indigo-500/50 transition-all">
            <h2 className="text-xl font-bold mb-4">Claim Rewards</h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Amount to claim"
                value={claimAmount}
                onChange={(e) => setClaimAmount(e.target.value)}
                className="flex-1 px-4 py-2 bg-crypto-dark border border-gray-800 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
              />
              <button
                onClick={handleClaim}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/20 transition-all"
              >
                Claim
              </button>
            </div>
          </div>
        </div>

        <div className="bg-crypto-card border border-gray-800 rounded-xl p-4 hover:border-indigo-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Staking History</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "all"
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab("stakes")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "stakes"
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Stakes
              </button>
              <button
                onClick={() => setActiveTab("unstakes")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "unstakes"
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Unstakes
              </button>
              <button
                onClick={() => setActiveTab("claims")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "claims"
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Claims
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-crypto-dark/90 backdrop-blur-sm">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                    Date & Time
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                    APY
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {sampleStakingHistory
                  .filter(
                    (item) =>
                      activeTab === "all" ||
                      (activeTab === "stakes" && item.type === "stake") ||
                      (activeTab === "unstakes" && item.type === "unstake") ||
                      (activeTab === "claims" && item.type === "claim")
                  )
                  .map((item) => (
                    <tr
                      key={item.id}
                      className="group hover:bg-crypto-dark/30 transition-colors"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-gray-400">
                        {item.date}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={
                            item.type === "stake"
                              ? "text-green-400"
                              : item.type === "unstake"
                              ? "text-red-400"
                              : "text-yellow-400"
                          }
                        >
                          {item.type.charAt(0).toUpperCase() +
                            item.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {item.amount} ETH
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-indigo-400">
                        {item.apy}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            item.status
                              ? "bg-green-500/10 text-green-400"
                              : "bg-gray-500/10 text-gray-400"
                          }`}
                        >
                          {item.status ? "Completed" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
