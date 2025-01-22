"use client";

import React, { useState, useEffect } from "react";

const AwardedTenders = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAwardedTenders = async () => {
      setLoading(true);
      setError(null);

      try {
        // Replace with actual API endpoint
        const response = await fetch("/api/awarded-tenders");
        if (!response.ok) {
          throw new Error("Failed to fetch awarded tenders.");
        }
        const data = await response.json();
        setTenders(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAwardedTenders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-8">
        Awarded Tenders
      </h1>

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
      {!loading && tenders.length === 0 && (
        <div className="text-center text-gray-700">
          <p>No tenders have been awarded yet.</p>
        </div>
      )}

      {tenders.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            List of Awarded Tenders
          </h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-4 text-left">Project Name</th>
                <th className="border border-gray-300 p-4 text-left">Award Date</th>
                <th className="border border-gray-300 p-4 text-left">Awarded Bidder</th>
                <th className="border border-gray-300 p-4 text-left">Contract Value</th>
              </tr>
            </thead>
            <tbody>
              {tenders.map((tender, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-4">{tender.projectName}</td>
                  <td className="border border-gray-300 p-4">{tender.awardDate}</td>
                  <td className="border border-gray-300 p-4">{tender.awardedBidder}</td>
                  <td className="border border-gray-300 p-4">{tender.contractValue} USD</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AwardedTenders;
