// src/components/dashboard/StatsCards.js
import React from "react";

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white">
        <h3 className="text-lg font-medium mb-2">Total Transactions</h3>
        <p className="text-3xl font-bold">
          {stats.totalTransactions.toLocaleString()}
        </p>
      </div>
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white">
        <h3 className="text-lg font-medium mb-2">Total Transaction Amount</h3>
        <p className="text-3xl font-bold">
          ₹{stats.totalAmount.toLocaleString("en-IN")}
        </p>
      </div>
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white">
        <h3 className="text-lg font-medium mb-2">Success Rate</h3>
        <p className="text-3xl font-bold">{stats.successRate.toFixed(1)}%</p>
      </div>
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 rounded-xl shadow-lg text-white">
        <h3 className="text-lg font-medium mb-2">Active Schools</h3>
        <p className="text-3xl font-bold">{stats.schoolCount}</p>
      </div>
    </div>
  );
};

export default StatsCards;
