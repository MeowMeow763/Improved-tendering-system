"use client";
import React, { useEffect, useState } from "react";
import { ethers, Contract } from "ethers";
import TenderSystemABI from "/utils/TenderSystemABI.json";

const ViewSubmittedBidsPage = () => {
  const [bids, setBids] = useState([]);
  const contractAddress = "0x2c39AeB9E8a8acb67529894dB3fd0147DCd8576b"; // Replace with your deployed contract address

  // Initialize the contract
  const getContract = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return new Contract(contractAddress, TenderSystemABI, signer);
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    } else {
      alert("MetaMask is not installed");
    }
  };

  // Fetch submitted bids
  const fetchBids = async () => {
    try {
      const contract = await getContract();

      // Fetch all contractor addresses
      const contractorAddresses = await contract.contractorAddresses();

      // Fetch bids for each contractor
      const bidDetails = await Promise.all(
        contractorAddresses.map(async (contractor) => {
          const bid = await contract.contractorBids(contractor);
          return {
            contractor,
            bidAmount: ethers.utils.formatEther(bid.bidAmount),
            evaluationScore: bid.evaluationScore,
            evaluated: bid.evaluated,
            boqItems: bid.boqItems,
          };
        })
      );

      setBids(bidDetails);
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };

  useEffect(() => {
    fetchBids();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Submitted Bids</h1>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Bids</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Contractor Address</th>
              <th className="border border-gray-300 p-2">Bid Amount (ETH)</th>
              <th className="border border-gray-300 p-2">Evaluation Score</th>
              <th className="border border-gray-300 p-2">Evaluated</th>
              <th className="border border-gray-300 p-2">BOQ Items</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{bid.contractor}</td>
                <td className="border border-gray-300 p-2">{bid.bidAmount}</td>
                <td className="border border-gray-300 p-2 text-center">
                  {bid.evaluationScore || "N/A"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {bid.evaluated ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 p-2">
                  <ul className="list-disc pl-4">
                    {bid.boqItems?.length > 0 ? (
                      bid.boqItems.map((item, i) => (
                        <li key={i}>
                          {item.description}: {item.quantity} @ {item.rate} = {item.amount}
                        </li>
                      ))
                    ) : (
                      <span>No BOQ Items</span>
                    )}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewSubmittedBidsPage;
