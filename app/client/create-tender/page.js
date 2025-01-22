"use client";

import React, { useState } from "react";
import { ethers, Contract } from "ethers"; // Corrected import for ethers v5
import { create } from "ipfs-http-client";
import TenderSystemABI from "/utils/TenderSystemABI.json";

const CreateTenderPage = () => {
  const [newTender, setNewTender] = useState({
    projectId: "",
    preqDate: "",
    bidsSubDate: "",
    signDate: "",
    bondAmount: "",
    estimatedCost: "",
  });
  const [documentFile, setDocumentFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const contractAddress = "0x2c39AeB9E8a8acb67529894dB3fd0147DCd8576b";

  // Initialize IPFS client
  const ipfs = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
  });

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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTender({ ...newTender, [name]: value });
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setDocumentFile(file);
  };

  // Upload file to IPFS
  const uploadFileToIPFS = async (file) => {
    try {
      const result = await ipfs.add(file);
      return `https://ipfs.infura.io/ipfs/${result.path}`;
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
      throw error;
    }
  };

  // Create a new tender
  const handleAddTender = async (e) => {
    e.preventDefault();

    if (!documentFile) {
      alert("Please upload the bidding document.");
      return;
    }

    try {
      setUploading(true);

      // Upload document to IPFS and get the URL
      const documentUrl = await uploadFileToIPFS(documentFile);

      const contract = await getContract();
      const tx = await contract.createTender(
        ethers.utils.formatBytes32String(newTender.projectId),
        Math.floor(new Date(newTender.preqDate).getTime() / 1000),
        Math.floor(new Date(newTender.bidsSubDate).getTime() / 1000),
        Math.floor(new Date(newTender.signDate).getTime() / 1000),
        ethers.BigNumber.from(newTender.bondAmount),
        ethers.BigNumber.from(newTender.estimatedCost),
        documentUrl
      );

      await tx.wait(); // Wait for the transaction to be mined
      alert("Tender created successfully with bidding document!");

      // Reset form after submission
      setNewTender({
        projectId: "",
        preqDate: "",
        bidsSubDate: "",
        signDate: "",
        bondAmount: "",
        estimatedCost: "",
      });
      setDocumentFile(null);
    } catch (error) {
      console.error("Error creating tender:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-10 flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Tender</h1>
        <form onSubmit={handleAddTender} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Project ID</label>
            <input
              type="text"
              name="projectId"
              placeholder="Enter the unique Project ID"
              value={newTender.projectId}
              onChange={handleInputChange}
              className="p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Pre-Qualification Date</label>
            <input
              type="date"
              name="preqDate"
              value={newTender.preqDate}
              onChange={handleInputChange}
              className="p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Bids Submission Date</label>
            <input
              type="date"
              name="bidsSubDate"
              value={newTender.bidsSubDate}
              onChange={handleInputChange}
              className="p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Sign Date</label>
            <input
              type="date"
              name="signDate"
              value={newTender.signDate}
              onChange={handleInputChange}
              className="p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Bond Amount</label>
            <input
              type="number"
              name="bondAmount"
              placeholder="Enter the bond amount"
              value={newTender.bondAmount}
              onChange={handleInputChange}
              className="p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Estimated Cost</label>
            <input
              type="number"
              name="estimatedCost"
              placeholder="Enter the estimated cost"
              value={newTender.estimatedCost}
              onChange={handleInputChange}
              className="p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Upload Bidding Document</label>
            <input
              type="file"
              onChange={handleFileUpload}
              className="p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Create Tender"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTenderPage;
