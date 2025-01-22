"use client";

import React, { useState, useEffect } from "react";

const FinancialEnvelopeViewer = () => {
  const [bidders, setBidders] = useState([]); // Dynamically fetched bidder IDs
  const [selectedBidder, setSelectedBidder] = useState(null);
  const [financialEnvelope, setFinancialEnvelope] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch bidders from an API
  useEffect(() => {
    const fetchBidders = async () => {
      try {
        const response = await fetch("/api/bidders"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch bidders.");
        }
        const data = await response.json();
        setBidders(data.bidders); // Assume API returns a `bidders` array
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bidders.");
      }
    };

    fetchBidders();
  }, []);

  const fetchFinancialEnvelope = async (bidderId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/financial-envelopes/${bidderId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch financial envelope.");
      }
      const data = await response.json();
      setFinancialEnvelope(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBidderChange = (event) => {
    const bidderId = event.target.value;
    if (bidderId) {
      setSelectedBidder(bidderId);
      fetchFinancialEnvelope(bidderId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-8">
        Financial Envelope Viewer
      </h1>

      <section className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Select a Bidder
        </h2>
        <div className="flex items-center justify-center">
          <select
            onChange={handleBidderChange}
            className="block w-full max-w-xs p-3 text-gray-700 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">-- Select a Bidder --</option>
            {bidders.map((bidder) => (
              <option key={bidder.walletAddress} value={bidder.walletAddress}>
                {bidder.name} ({bidder.walletAddress})
              </option>
            ))}
          </select>
        </div>
      </section>

      {loading && (
        <div className="text-center text-gray-700">
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div className="text-center text-red-500">
          <p>Error: {error}</p>
        </div>
      )}

      {financialEnvelope && (
        <section className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Financial Envelope for {financialEnvelope.companyName}
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Bid Details
            </h3>
            <ul className="list-disc pl-5 text-gray-600">
              {financialEnvelope.details.map((detail, index) => (
                <li key={index} className="mb-3">
                  <strong>{detail.name}</strong>: {detail.value}{" "}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Total Bid Amount
            </h3>
            <p className="text-gray-800 text-lg">
              {financialEnvelope.totalBidAmount} USD
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Breakdown of Costs
            </h3>
            <ul className="list-disc pl-5 text-gray-600">
              {financialEnvelope.costBreakdown.map((cost, index) => (
                <li key={index} className="mb-3">
                  <strong>{cost.name}</strong>: {cost.amount} USD
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Financial Documents
            </h3>
            <ul className="list-disc pl-5 text-gray-600">
              {financialEnvelope.documents.map((doc, index) => (
                <li key={index} className="mb-3">
                  <strong>{doc.name}</strong>: {doc.description}{" "}
                  <a
                    href={`https://ipfs.io/ipfs/${doc.ipfsCid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:underline"
                  >
                    View Document
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
};

export default FinancialEnvelopeViewer;
