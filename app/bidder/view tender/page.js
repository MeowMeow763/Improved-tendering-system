"use client";

import React from "react";

const ViewTenderPage = () => {
  const tenders = [
    {
      id: 1,
      name: "Construction of Bridge",
      deadline: "2024-12-15",
      status: "Open",
    },
    {
      id: 2,
      name: "Road Expansion Project",
      deadline: "2024-11-30",
      status: "Closed",
    },
    {
      id: 3,
      name: "School Renovation",
      deadline: "2024-12-20",
      status: "Open",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">View Tenders</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Tender ID</th>
            <th className="border border-gray-300 px-4 py-2">Tender Name</th>
            <th className="border border-gray-300 px-4 py-2">Deadline</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender) => (
            <tr key={tender.id}>
              <td className="border border-gray-300 px-4 py-2 text-center">{tender.id}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{tender.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{tender.deadline}</td>
              <td
                className={`border border-gray-300 px-4 py-2 text-center ${
                  tender.status === "Open" ? "text-green-600" : "text-red-600"
                }`}
              >
                {tender.status}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                  disabled={tender.status === "Closed"}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTenderPage;
