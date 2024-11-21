"use client"; // Add this at the top of the file

import React, { useState } from "react";
import Link from "next/link";

const BidderPage = () => {
  const [tendersMenuOpen, setTendersMenuOpen] = useState(true); // Manage dropdown state

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-6">Menu</h2>
        <ul>
          {/* Collapsible Tenders Section */}
          <li className="mb-4">
            <button
              onClick={() => setTendersMenuOpen(!tendersMenuOpen)}
              className="w-full text-left font-bold flex items-center justify-between hover:text-blue-400"
            >
              <span>Tenders</span>
              <span>{tendersMenuOpen ? "−" : "+"}</span>
            </button>
            {tendersMenuOpen && (
              <ul className="mt-2 pl-4 space-y-2">
                <li>
                  <Link href="/bidder/tenders/running" className="block hover:text-blue-400">
                    Running
                  </Link>
                </li>
                <li>
                  <Link href="/bidder/tenders/technical-evaluation" className="block hover:text-blue-400">
                    Technical Evaluation
                  </Link>
                </li>
                <li>
                  <Link href="/bidder/tenders/financial-evaluation" className="block hover:text-blue-400">
                    Financial Evaluation
                  </Link>
                </li>
                <li>
                  <Link href="/bidder/tenders/awards" className="block hover:text-blue-400">
                    Awards
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* Other Static Menu Items */}
          <li className="mb-4">
            <Link href="/bidder/jv-request" className="block hover:text-blue-400">
              JV Request
            </Link>
          </li>
          <li>
            <Link href="/bidder/company" className="block hover:text-blue-400">
              Company
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-100">
        {/* Link to Bidder Dashboard */}
        <div className="mb-4">
          <Link
            href="/bidder/dashboard"
            className="block text-blue-500 hover:underline font-bold"
          >
            Go to Bidder Dashboard
          </Link>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">62</h3>
            <p>All Tenders</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">24</h3>
            <p>Running Tenders</p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">6</h3>
            <p>Closed Tenders</p>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">4</h3>
            <p>Evaluations</p>
          </div>
        </div>

        {/* Tender Table */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Tenders</h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">e-Bid ID</th>
                <th className="border border-gray-300 p-2">Subject</th>
                <th className="border border-gray-300 p-2">Publication Date</th>
                <th className="border border-gray-300 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center">2</td>
                <td className="border border-gray-300 p-2">
                  Construction of Service Lane Bridge
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  11/08/2021
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  Closed
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center">3</td>
                <td className="border border-gray-300 p-2">
                  Design Review and Construction
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  15/09/2021
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  Running
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default BidderPage;
