// src/components/dashboard/TransactionStats.js
import React from "react";

const TransactionStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Minimum Transaction
        </h3>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          ₹{stats.minTransaction.toLocaleString("en-IN")}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Average Transaction
        </h3>
        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
          ₹
          {stats.avgTransaction.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Maximum Transaction
        </h3>
        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
          ₹{stats.maxTransaction.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
};

export default TransactionStats;
