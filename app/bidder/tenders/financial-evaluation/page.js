"use client";

import React, { useState } from "react";
import { create } from "ipfs-http-client";

const ipfs = create({ url: "https://ipfs.infura.io:5001/api/v0" });

const FinancialEnvelopeSubmission = () => {
  const [uploadStatus, setUploadStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (event, documentType) => {
    setLoading(true);
    setError(null);
    const file = event.target.files[0];

    if (!file) {
      setError("No file selected");
      setLoading(false);
      return;
    }

    try {
      const added = await ipfs.add(file);
      setUploadStatus((prevStatus) => ({
        ...prevStatus,
        [documentType]: `https://ipfs.io/ipfs/${added.path}`,
      }));
    } catch (err) {
      console.error(err);
      setError("Failed to upload file to IPFS.");
    } finally {
      setLoading(false);
    }
  };

  const documentFields = [
    { label: "Bill of Quantities (BOQ)", key: "boq" },
    { label: "Pricing Schedule", key: "pricingSchedule" },
    { label: "Bid Security", key: "bidSecurity" },
    { label: "Payment Terms", key: "paymentTerms" },
    { label: "Financial Capacity Proof", key: "financialCapacityProof" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-8">
        Financial Envelope Submission
      </h1>

      <section className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Upload Required Documents
        </h2>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-4 text-left">Document</th>
              <th className="border border-gray-300 p-4 text-left">Status</th>
              <th className="border border-gray-300 p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {documentFields.map((field) => (
              <tr key={field.key}>
                <td className="border border-gray-300 p-4">{field.label}</td>
                <td className="border border-gray-300 p-4">
                  {uploadStatus[field.key] ? (
                    <a
                      href={uploadStatus[field.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 hover:underline"
                    >
                      View Uploaded Document
                    </a>
                  ) : (
                    "Not Uploaded"
                  )}
                </td>
                <td className="border border-gray-300 p-4">
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e, field.key)}
                    className="hidden"
                    id={`file-upload-${field.key}`}
                  />
                  <label
                    htmlFor={`file-upload-${field.key}`}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 cursor-pointer"
                  >
                    {uploadStatus[field.key] ? "Replace File" : "Upload File"}
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && (
          <div className="text-center text-gray-700 mt-4">Uploading...</div>
        )}
        {error && (
          <div className="text-center text-red-500 mt-4">{error}</div>
        )}
      </section>
    </div>
  );
};

export default FinancialEnvelopeSubmission;
