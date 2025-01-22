"use client";

import React, { useState, useEffect } from "react";

const TechnicalEnvelopeViewer = () => {
  const [bidders, setBidders] = useState([]); // Bidders will be fetched dynamically
  const [selectedBidder, setSelectedBidder] = useState(null);
  const [technicalEnvelope, setTechnicalEnvelope] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch bidders from the API
  useEffect(() => {
    const fetchBidders = async () => {
      try {
        const response = await fetch("/api/bidders"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch bidders.");
        }
        const data = await response.json();
        setBidders(data.bidders); // Assume the API returns a JSON object with a `bidders` array
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bidders.");
      }
    };

    fetchBidders();
  }, []);

  const fetchTechnicalEnvelope = async (bidderId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/technical-envelopes/${bidderId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch technical envelope.");
      }
      const data = await response.json();
      setTechnicalEnvelope(data);
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
      fetchTechnicalEnvelope(bidderId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Technical Envelope Viewer
      </h1>

      <section className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Select a Bidder
        </h2>
        <div className="flex items-center justify-center">
          <select
            onChange={handleBidderChange}
            className="block w-full max-w-xs p-3 text-gray-700 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {technicalEnvelope && (
        <section className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Technical Envelope for {technicalEnvelope.companyName}
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Documents Submitted
            </h3>
            <ul className="list-disc pl-5 text-gray-600">
              {technicalEnvelope.documents.map((doc, index) => (
                <li key={index} className="mb-3">
                  <strong>{doc.name}</strong>: {doc.description}{" "}
                  <a
                    href={`https://ipfs.io/ipfs/${doc.ipfsCid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
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

export default TechnicalEnvelopeViewer;
