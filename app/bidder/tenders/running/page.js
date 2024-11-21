"use client";
import React from "react";
import Link from "next/link";

const RunningTendersPage = () => {
  const tenders = [
    {
      id: 3,
      title:
        "Design Review and Construction Supervision of Ziarat Mor-Kach Harnai Road",
      publicationDate: "Friday 20 August 2021 12:09:10",
      submissionClosing: "Wednesday 15 September 2021 15:45:00",
      openingDate: "Wednesday 15 September 2021 15:45:00",
      status: "Running",
    },
    {
      id: 4,
      title: "Construction of Ziarat Mor-Kach Harnai Sanjavi Road",
      publicationDate: "Wednesday 11 August 2021 14:32:30",
      submissionClosing: "Friday 27 August 2021 14:15:00",
      openingDate: "Friday 27 August 2021 14:45:00",
      status: "Running",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Running Tenders</h1>
      </header>

      {/* Tenders Table */}
      <div className="bg-white p-6 shadow-md rounded-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">e-Bid ID</th>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Publication Date/Time</th>
              <th className="border border-gray-300 p-2">Bid Submission Closing</th>
              <th className="border border-gray-300 p-2">Bid Opening Date/Time</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenders.map((tender) => (
              <tr key={tender.id}>
                <td className="border border-gray-300 p-2 text-center">{tender.id}</td>
                <td className="border border-gray-300 p-2">{tender.title}</td>
                <td className="border border-gray-300 p-2 text-center">
                  {tender.publicationDate}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {tender.submissionClosing}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {tender.openingDate}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <span
                    className={`px-2 py-1 rounded ${
                      tender.status === "Running"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {tender.status}
                  </span>
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {/* View Tender Button */}
                  <Link href={`/bidder/tenders/running/view/${tender.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2">
                      View
                    </button>
                  </Link>
                  {/* Respond to Tender Button */}
                  <Link href={`/bidder/tenders/running/respond/${tender.id}`}>
                    <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded">
                      Respond
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RunningTendersPage;
