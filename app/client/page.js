"use client";
import { useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import TenderSystemABI from "/utils/TenderSystemABI.json";

const ClientLandingPage = () => {
  const [tenders, setTenders] = useState([]); // To store tenders

  const contractAddress = "  0x2c39AeB9E8a8acb67529894dB3fd0147DCd8576b"; // Replace with your deployed contract address
  const getContract = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request accounts from MetaMask
        await window.ethereum.request({ method: "eth_requestAccounts" });
  
        // Use Web3Provider instead of BrowserProvider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
  
        // Create the contract instance
        return new Contract(contractAddress, TenderSystemABI, signer);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        alert("Failed to connect to MetaMask. Please try again.");
      }
    } else {
      alert("MetaMask is not installed");
    }
  }
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
    const validateToken = () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        alert("Please log in first!");
        window.location.href = "/";
        return;
      }

      try {
        const decodedToken = JSON.parse(atob(token)); // Decode the token
        const isExpired = Date.now() >= decodedToken.exp * 1000; // Token expiration in seconds

        if (isExpired) {
          alert("Session expired. Please log in again!");
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.href = "/";
          return;
        }

        // Check if the role is correct for client
        if (decodedToken.role !== "client" && window.location.pathname.includes("/client")) {
          alert("Unauthorized access to client dashboard!");
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Invalid token:", error);
        alert("Invalid session. Please log in again!");
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/";
      }
    };

    validateToken();
    fetchTenders();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-800 text-white p-6">
        <h2 className="text-lg font-bold mb-8">Client Dashboard</h2>
        <ul>
          <li className="mb-6">
            <a
              href="/client/create-tender"
              className="block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Create Tender
            </a>
          </li>
          <li className="mb-6">
            <a
              href="/client/view-tenders"
              className="block bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              View Tenders
            </a>
          </li>
          <li className="mb-6">
            <a
              href="/client/financial-evaluation"
              className="block bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
            >
              Financial Evaluation
            </a>
          </li>
          <li className="mb-6">
            <a
              href="/client/technical-evaluation"
              className="block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Technical Evaluation
            </a>
          </li>
          <li className="mb-6">
            <a
              href="/client/bid-submitted"
              className="block bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
            >
              View Submitted Bids
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-500 text-white p-6 rounded shadow">
            <h3 className="text-2xl font-bold">{tenders.length}</h3>
            <p>Total Tenders Created</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded shadow">
            <h3 className="text-2xl font-bold">
              {tenders.filter((tender) => tender.status === "Open").length}
            </h3>
            <p>Open Tenders</p>
          </div>
          <div className="bg-red-500 text-white p-6 rounded shadow">
            <h3 className="text-2xl font-bold">
              {tenders.filter((tender) => tender.status === "Closed").length}
            </h3>
            <p>Closed Tenders</p>
          </div>
        </div>

        {/* Tenders Table */}
        <div id="tenders" className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-6">Tenders</h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-4 text-left">Project ID</th>
                <th className="border border-gray-300 p-4 text-left">Pre-Qualification Date</th>
                <th className="border border-gray-300 p-4 text-left">Bids Submission Date</th>
                <th className="border border-gray-300 p-4 text-left">Sign Date</th>
                <th className="border border-gray-300 p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {tenders.map((tender, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-4">{tender.projectId}</td>
                  <td className="border border-gray-300 p-4">{tender.preqDate}</td>
                  <td className="border border-gray-300 p-4">{tender.bidsSubDate}</td>
                  <td className="border border-gray-300 p-4">{tender.signDate}</td>
                  <td className="border border-gray-300 p-4">
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
      </main>
    </div>
  );
};

export default ClientLandingPage;
