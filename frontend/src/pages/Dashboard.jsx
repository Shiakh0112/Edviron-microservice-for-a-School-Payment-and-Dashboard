// src/components/dashboard/Dashboard.js
import React, { useState, useEffect } from "react";
// import useAxios from "../../hooks/useAxios";
import LoadingSpinner from "../components/LoadingSpinner";
import StatsCards from "../components/dashboard/StatsCards";
import TransactionStats from "../components/dashboard/TransactionStats";
import QuickLinks from "../components/dashboard/QuickLinks";
import TransactionsOverTimeChart from "../components/dashboard/TransactionsOverTimeChart";
import PaymentMethodsChart from "../components/dashboard/PaymentMethodsChart";
import StatusTrendChart from "../components/dashboard/StatusTrendChart";
import TopSchoolsChart from "../components/dashboard/TopSchoolsChart";

import useAxios from "../hooks/useAxios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalAmount: 0,
    successRate: 0,
    minTransaction: 0,
    maxTransaction: 0,
    avgTransaction: 0,
    schoolCount: 0,
  });
  const [transactionData, setTransactionData] = useState([]);
  const [paymentMethodData, setPaymentMethodData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { axios } = useAxios();

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch transactions data with a larger limit to get all transactions
        const response = await axios.get("/orders/transactions?limit=1000");
        const transactions = response.data.transactions || [];

        // Calculate stats
        const totalTransactions = transactions.length;
        const totalAmount = transactions.reduce(
          (sum, t) => sum + (t.order_amount || 0),
          0
        );
        const successCount = transactions.filter(
          (t) => t.status === "SUCCESS"
        ).length;
        const successRate =
          totalTransactions > 0 ? (successCount / totalTransactions) * 100 : 0;

        const amounts = transactions.map((t) => t.order_amount || 0);
        const minTransaction = amounts.length > 0 ? Math.min(...amounts) : 0;
        const maxTransaction = amounts.length > 0 ? Math.max(...amounts) : 0;
        const avgTransaction =
          totalTransactions > 0 ? totalAmount / totalTransactions : 0;

        // Count unique schools
        const uniqueSchools = [
          ...new Set(transactions.map((t) => t.school_id)),
        ];
        const schoolCount = uniqueSchools.length;

        setStats({
          totalTransactions,
          totalAmount,
          successRate,
          minTransaction,
          maxTransaction,
          avgTransaction,
          schoolCount,
        });

        // Prepare transaction trend data (last 6 months)
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const trendData = [];

        for (let i = 5; i >= 0; i--) {
          const monthIndex = (currentMonth - i + 12) % 12;
          const year =
            monthIndex > currentMonth ? currentYear - 1 : currentYear;

          const monthTransactions = transactions.filter((t) => {
            if (!t.payment_time) return false;
            const date = new Date(t.payment_time);
            return (
              date.getMonth() === monthIndex && date.getFullYear() === year
            );
          });

          const monthTotal = monthTransactions.reduce(
            (sum, t) => sum + (t.order_amount || 0),
            0
          );

          trendData.push({
            name: months[monthIndex],
            transactions: monthTransactions.length,
            amount: monthTotal,
          });
        }

        setTransactionData(trendData);

        // Prepare payment method data
        const paymentMethods = {};
        transactions.forEach((t) => {
          if (t.gateway) {
            paymentMethods[t.gateway] = (paymentMethods[t.gateway] || 0) + 1;
          }
        });

        const paymentData = Object.entries(paymentMethods).map(
          ([name, value]) => {
            const percentage = (value / totalTransactions) * 100;
            return { name, value: parseFloat(percentage.toFixed(1)) };
          }
        );

        setPaymentMethodData(paymentData);

        // Prepare status trend data
        const statusTrend = [];

        for (let i = 5; i >= 0; i--) {
          const monthIndex = (currentMonth - i + 12) % 12;
          const year =
            monthIndex > currentMonth ? currentYear - 1 : currentYear;

          const monthTransactions = transactions.filter((t) => {
            if (!t.payment_time) return false;
            const date = new Date(t.payment_time);
            return (
              date.getMonth() === monthIndex && date.getFullYear() === year
            );
          });

          const success = monthTransactions.filter(
            (t) => t.status === "SUCCESS"
          ).length;
          const pending = monthTransactions.filter(
            (t) => t.status === "PENDING"
          ).length;
          const failed = monthTransactions.filter(
            (t) => t.status === "FAILED"
          ).length;

          statusTrend.push({
            name: months[monthIndex],
            success,
            pending,
            failed,
          });
        }

        setStatusData(statusTrend);

        // Prepare school data - top 5 schools by transaction count
        const schoolTransactionCounts = {};
        transactions.forEach((t) => {
          if (t.school_id) {
            if (!schoolTransactionCounts[t.school_id]) {
              schoolTransactionCounts[t.school_id] = {
                name: t.school_id,
                transactions: 0,
                amount: 0,
              };
            }
            schoolTransactionCounts[t.school_id].transactions += 1;
            schoolTransactionCounts[t.school_id].amount += t.order_amount || 0;
          }
        });

        // Convert to array, sort by transaction count, and take top 5
        const topSchools = Object.values(schoolTransactionCounts)
          .sort((a, b) => b.transactions - a.transactions)
          .slice(0, 5);

        setSchoolData(topSchools);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded dark:bg-red-900 dark:text-red-100 dark:border-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-wide">
        Payment Dashboard
      </h1>

      <StatsCards stats={stats} />
      <TransactionStats stats={stats} />
      <QuickLinks />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <TransactionsOverTimeChart data={transactionData} />
        <PaymentMethodsChart data={paymentMethodData} />
        <StatusTrendChart data={statusData} />
        <TopSchoolsChart data={schoolData} />
      </div>
    </div>
  );
};

export default Dashboard;
