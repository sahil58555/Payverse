import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOkto, OktoContextType } from "okto-sdk-react";

export default function OTPPage(): React.FC {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("IN");
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { sendPhoneOTP, verifyPhoneOTP } = useOkto() as OktoContextType;
  const [otpToken, setOtpToken] = useState("");

  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) {
      setError("Invalid phone number. Please enter 10 digits.");
      setShowOTPVerification(false);
      return;
    }

    const response = await sendPhoneOTP(phoneNumber, countryCode);

    setOtpToken(response.token); // Store the token for verification

    setError("");
    setShowOTPVerification(true);
  };

  const handleVerifyOTP = async () => {
    const verified = await verifyPhoneOTP(
      phoneNumber,
      countryCode,
      otp,
      otpToken
    );
    if (verified) {
      navigate(localStorage.getItem("redirect") || "/");
    } else {
      setError("OTP verification failed. Please try again.");
    }
  };

  // Common country codes
  const countryCodes = ["IN", "US", "CAD"];

  return (
    <div className="min-h-screen bg-crypto-dark text-white p-4">
      {/* Back Button */}
      <button
        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-4"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="max-w-md mx-auto space-y-4">
        {/* Hero Section */}
        <div className="bg-crypto-card border border-gray-800 rounded-xl p-4 hover:border-indigo-500/50 transition-all">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Phone Verification
            </h1>
            <p className="text-gray-400 mt-2">
              Enter your phone number to receive an OTP
            </p>
          </div>
        </div>

        {/* Phone Input Section */}
        <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
          <div className="space-y-4">
            {/* Country Code Select */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Country Code
              </label>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-full px-4 py-2 bg-crypto-dark border border-gray-800 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
              >
                {countryCodes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setPhoneNumber(value);
                  setError("");
                }}
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 bg-crypto-dark border border-gray-800 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
                maxLength={10}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* Send OTP Button */}
            <button
              onClick={handleSendOTP}
              className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all"
            >
              Send OTP
            </button>
          </div>
        </div>

        {/* OTP Verification Section */}
        {showOTPVerification && (
          <div className="bg-crypto-card border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full px-4 py-2 bg-crypto-dark border border-gray-800 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
                  maxLength={6}
                />
              </div>

              {/* Verify OTP Button */}
              <button
                onClick={handleVerifyOTP}
                className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/20 transition-all"
              >
                Verify OTP
              </button>

              {/* Success Message */}
              <p className="text-center text-green-400 text-sm">
                OTP sent successfully! Please check your phone
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
