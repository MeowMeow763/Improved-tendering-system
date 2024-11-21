"use client";
import React from "react";
import { useParams } from "next/navigation";

const ViewTenderPage = () => {
  // Use `useParams` to retrieve the dynamic route parameter in the `app` directory.
  const params = useParams();
  const tenderId = params.tenderId; // Retrieve the tenderId from the dynamic route

  // Placeholder: Replace with fetched data for the specific tender
  const tenderData = {
    id: tenderId,
    title: "Design Review and Construction Supervision of Ziarat Mor-Kach Harnai Road	",
    status: "Running",
    ppraRefNo: "TS688116 (DUMMY)",
    procurementMethod: "Single Stage Two Envelope",
    bidSubmissionTime: "Tuesday, 31 August 2021 10:30",
    jointVenture: "Yes",
    documents: [
      { name: "Bidding Document(s)", link: "https://ipfs.io/ipfs/<hash1>" },
      { name: "Technical Envelope", link: "https://ipfs.io/ipfs/<hash2>" },
      { name: "Financial Envelope", link: "https://ipfs.io/ipfs/<hash3>" },
      { name: "Addendum/Corrections", link: "https://ipfs.io/ipfs/<hash4>" },
    ],
    boqLink: "https://ipfs.io/ipfs/<boqHash>", // Replace with actual hash
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{tenderData.title}</h1>
        <span className="bg-blue-500 text-white px-4 py-2 rounded-full">
          {tenderData.status}
        </span>
      </header>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Left Panel: Status and Details */}
        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-bold mb-4">Status</h2>
          <p>
            <strong>PPRA Ref No:</strong> {tenderData.ppraRefNo}
          </p>
          <p>
            <strong>Procurement Method:</strong> {tenderData.procurementMethod}
          </p>
          <p>
            <strong>Bid Submission Date/Time:</strong>{" "}
            {tenderData.bidSubmissionTime}
          </p>
          <p>
            <strong>Joint Venture Allowed?</strong> {tenderData.jointVenture}
          </p>
        </div>

        {/* Documents Links */}
        <div className="col-span-2 bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-bold mb-4">Documents</h2>
          <ul>
            {tenderData.documents.map((doc, index) => (
              <li key={index}>
                <a
                  href={doc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOQ Document Section */}
      <div className="bg-white p-6 shadow-md rounded-md">
        <h2 className="text-lg font-bold mb-4">Bill of Quantities (BOQ)</h2>
        <a
          href={tenderData.boqLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View/Download BOQ Document
        </a>
      </div>
    </div>
  );
};

export default ViewTenderPage;
