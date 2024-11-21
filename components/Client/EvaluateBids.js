// src/components/Client/EvaluateBids.js
import React, { useState, useEffect } from 'react';
import tenderSystem from '../../utils/contract';
import web3 from '../../utils/web3';

const EvaluateBids = () => {
  const [tenders, setTenders] = useState([]);
  const [selectedTender, setSelectedTender] = useState('');
  const [contractor, setContractor] = useState('');

  useEffect(() => {
    const fetchTenders = async () => {
      // Assuming you have a way to list all tenders. If not, you might need to track tender IDs separately.
      // For demonstration, let's assume a list of project IDs.
      const projectIds = ['Project1', 'Project2']; // Replace with actual logic
      const tenderData = await Promise.all(projectIds.map(async (pid) => {
        const tender = await tenderSystem.methods.tenders(web3.utils.asciiToHex(pid)).call();
        return { projectId: pid, ...tender };
      }));
      setTenders(tenderData);
    };

    fetchTenders();
  }, []);

  const evaluateBid = async () => {
    const accounts = await web3.eth.getAccounts();
    try {
      await tenderSystem.methods.evaluateContractorBid(
        contractor,
        web3.utils.asciiToHex(selectedTender)
      ).send({ from: accounts[0] });
      alert('Bid Evaluated Successfully!');
    } catch (error) {
      console.error(error);
      alert('Error evaluating bid.');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-4">Evaluate Bids</h3>
      <div className="mb-4">
        <label className="block mb-2">Select Tender</label>
        <select onChange={(e) => setSelectedTender(e.target.value)} className="border p-2 rounded w-full">
          <option value="">--Select Tender--</option>
          {tenders.map((tender) => (
            <option key={tender.projectId} value={tender.projectId}>{tender.projectId}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Contractor Address</label>
        <input type="text" value={contractor} onChange={(e) => setContractor(e.target.value)} placeholder="0x..." className="border p-2 rounded w-full"/>
      </div>
      <button onClick={evaluateBid} className="bg-green-600 text-white px-4 py-2 rounded">Evaluate Bid</button>
    </div>
  );
};

export default EvaluateBids;
