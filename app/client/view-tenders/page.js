"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import TenderSystemABI from "/utils/TenderSystemABI.json";

const ViewTendersPage = () => {
  const [tenders, setTenders] = useState([]);

  const contractAddress = "0x2c39AeB9E8a8acb67529894dB3fd0147DCd8576b"; // Replace with your deployed contract address

  // Initialize the contract
  const getContract = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      return new ethers.Contract(contractAddress, TenderSystemABI.abi, signer);
    } else {
      alert("MetaMask is not installed");
    }
  };

  // Fetch all tenders
  const fetchTenders = async () => {
    try {
      const contract = await getContract();
      const tenderIds = await contract.getAllTenderIds();

      const tenderDetails = await Promise.all(
        tenderIds.map(async (id) => {
          const tender = await contract.tenders(id);
          return {
            projectId: ethers.utils.parseBytes32String(tender.projectId),
            preqDate: new Date(tender.preqDate * 1000).toLocaleDateString(),
            bidsSubDate: new Date(tender.bidsSubDate * 1000).toLocaleDateString(),
            signDate: new Date(tender.signDate * 1000).toLocaleDateString(),
            bondAmount: tender.bondAmount.toString(),
            estimatedCost: tender.estimatedCost.toString(),
            status: tender.isCreated ? "Open" : "Closed",
          };
        })
      );

      setTenders(tenderDetails);
    } catch (error) {
      console.error("Error fetching tenders:", error);
    }
  };

  useEffect(() => {
    fetchTenders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">View Tenders</h1>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Tenders</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Project ID</th>
              <th className="border border-gray-300 p-2">Pre-Qualification Date</th>
              <th className="border border-gray-300 p-2">Bids Submission Date</th>
              <th className="border border-gray-300 p-2">Sign Date</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {tenders.map((tender, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 text-center">{tender.projectId}</td>
                <td className="border border-gray-300 p-2 text-center">{tender.preqDate}</td>
                <td className="border border-gray-300 p-2 text-center">{tender.bidsSubDate}</td>
                <td className="border border-gray-300 p-2 text-center">{tender.signDate}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <span
                    className={`py-1 px-3 rounded ${
                      tender.status === "Open"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {tender.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTendersPage;
