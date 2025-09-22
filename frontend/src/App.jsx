// src/App.js
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Transactions from "./components/Transactions";
import TransactionDetails from "./components/TransactionDetails";
import TransactionStatus from "./components/TransactionStatus";
import LoadingSpinner from "./components/LoadingSpinner";
import CreatePayment from "./pages/CreatePayment";
import Home from "./pages/Home";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {isAuthenticated && <Header />}
      <main>
        <Routes>
          {/* Home Page (only if not logged in) */}
          <Route
            path="/"
            element={!isAuthenticated ? <Home /> : <Navigate to="/dashboard" />}
          />

          <Route
            path="/login"
            element={
              !isAuthenticated ? <AuthPage /> : <Navigate to="/transactions" />
            }
          />
          <Route
            path="/register"
            element={!isAuthenticated ? <AuthPage /> : <Navigate to="/login" />}
          />

          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/transactions"
            element={
              isAuthenticated ? <Transactions /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/school/:schoolId"
            element={
              isAuthenticated ? (
                <TransactionDetails />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/status-check"
            element={
              isAuthenticated ? <TransactionStatus /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/create-payment"
            element={
              isAuthenticated ? <CreatePayment /> : <Navigate to="/login" />
            }
          />

          {/* Fallback Route */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
