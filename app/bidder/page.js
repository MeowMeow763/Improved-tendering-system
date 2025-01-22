"use client";

import React, { useEffect, useState } from "react";
import { getContract } from "../../services/contractService";
import { ethers } from "ethers";
import Link from "next/link";

function BidderDashboard() {
  const [tenders, setTenders] = useState([]);
  const [bid, setBid] = useState({ projectId: "", boq: [] });
  const [tendersMenuOpen, setTendersMenuOpen] = useState(true);

  useEffect(() => {
    const validateToken = () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        alert("Please log in first!");
        window.location.href = "/";
        return;
      }

      try {
        const decodedToken = JSON.parse(atob(token)); // Decode the token
        const isExpired = Date.now() >= decodedToken.exp * 1000; // Token expiration in seconds

        if (isExpired) {
          alert("Session expired. Please log in again!");
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.href = "/";
          return;
        }

        // Check if the role is correct for bidder
        if (decodedToken.role !== "bidder" && window.location.pathname.includes("/bidder")) {
          alert("Unauthorized access! Only bidders can access this page.");
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.href = "/";
        }

        // Additional check for unauthorized client access
        if (decodedToken.role !== "client" && window.location.pathname.includes("/client")) {
          alert("Unauthorized access to client dashboard!");
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Invalid token:", error);
        alert("Invalid session. Please log in again!");
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/";
      }
    };

    validateToken();
  }, []);

  // Fetch Tenders from Smart Contract
  const fetchTenders = async () => {
    try {
      const contract = await getContract();

      // Check if the function exists
      if (!contract.getAllTenderIds) {
        throw new Error("Function getAllTenderIds does not exist on the contract");
      }

      // Fetch tender IDs
      const tenderIds = await contract.getAllTenderIds();

      // Fetch tender details for each ID
      const tenderDetails = await Promise.all(
        tenderIds.map(async (id) => await contract.tenders(id))
      );

      setTenders(tenderDetails);
    } catch (error) {
      console.error("Error fetching tenders:", error.message);
    }
  };

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
                  <Link
                    href="/bidder/tenders/technical-evaluation"
                    className="block hover:text-blue-400"
                  >
                    Technical Evaluation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bidder/tenders/financial-evaluation"
                    className="block hover:text-blue-400"
                  >
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
        {/* Dashboard Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">{tenders.length}</h3>
            <p>All Tenders</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">
              {tenders.filter((tender) => tender.status === "Running").length}
            </h3>
            <p>Running Tenders</p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded shadow">
            <h3 className="text-lg font-bold">
              {tenders.filter((tender) => tender.status === "Closed").length}
            </h3>
            <p>Closed Tenders</p>
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
              {tenders.map((tender, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    {ethers.utils.parseBytes32String(tender.projectId)}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {new Date(tender.preqDate * 1000).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {tender.status === true ? "Running" : "Closed"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default BidderDashboard;
