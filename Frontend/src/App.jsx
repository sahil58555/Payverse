import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeesPage from "./pages/EmployeesPage";
import PaymentsPage from "./pages/PaymentsPage";
import ESOPPage from "./pages/ESOPPage";
import SettingsPage from "./pages/SettingsPage";
import { Web3Provider } from "./context/useWeb3";
import LendingPage from "./pages/LendingPage";
import { OktoProvider, BuildType } from "okto-sdk-react";
import OTPPage from "./components/Okto/otp";
import Stake from "./components/Coinbase/Stake";
const OKTO_CLIENT_API_KEY = "bebe6b3d-3f40-4b51-8315-d74db21b0acb";

export default function App() {
  const EmployerRoutes = () => (
    <Web3Provider>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employer/employees" element={<EmployeesPage />} />
        <Route path="/employer/payments" element={<PaymentsPage />} />
        <Route path="/employer/esops" element={<ESOPPage />} />
        <Route path="/employer/settings" element={<SettingsPage />} />
        <Route path="/lending" element={<LendingPage />} />
        <Route
          path="/stake"
          element={<Stake></Stake>}
        />
      </Routes>
    </Web3Provider>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Wrap employer-specific routes in Web3Provider */}
        <Route path="/*" element={<EmployerRoutes />} />
      </Routes>
    </Router>
  );
}
