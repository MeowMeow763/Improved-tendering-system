"use client";

import React from "react";
import Link from "next/link";

const BidderDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Bidder Dashboard</h2>
      <nav className="space-y-4">
        <Link href="/bidder/clarifications" className="block text-blue-500 hover:underline">
          Clarifications
        </Link>
        <Link href="/bidder/grievances" className="block text-blue-500 hover:underline">
          Grievances
        </Link>
        <Link href="/bidder/submit-tender" className="block text-blue-500 hover:underline">
          Submit Tender
        </Link>
        <Link href="/bidder/view-tender" className="block text-blue-500 hover:underline">
          View Tender
        </Link>
      </nav>
    </div>
  );
};

export default BidderDashboard;
