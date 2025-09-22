// src/components/dashboard/QuickLinks.js
import React from "react";
import { Link } from "react-router-dom";

const QuickLinks = () => {
  const links = [
    {
      to: "/transactions",
      title: "View Transactions",
      desc: "Browse and filter all payment transactions",
      color: "from-blue-400 to-blue-500",
    },
    {
      to: "/create-payment",
      title: "Create Payment",
      desc: "Generate new payment collect requests",
      color: "from-green-400 to-green-500",
    },
    {
      to: "/status-check",
      title: "Check Status",
      desc: "Verify transaction status by order ID",
      color: "from-purple-400 to-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {links.map((card) => (
        <Link
          key={card.to}
          to={card.to}
          className={`relative block p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-1 bg-gradient-to-r ${card.color} text-white`}
        >
          <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
          <p className="text-sm opacity-90">{card.desc}</p>
          <span className="absolute top-4 right-4 text-white opacity-30 text-4xl">
            ➤
          </span>
        </Link>
      ))}
    </div>
  );
};

export default QuickLinks;
