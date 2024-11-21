// src/components/Client/CreateTender.js
import React, { useState } from 'react';
import tenderSystem from '../../utils/contract';
import web3 from '../../utils/web3';

const CreateTender = () => {
  const [form, setForm] = useState({
    projectId: '',
    preqDate: '',
    bidsSubDate: '',
    signDate: '',
    bondAmount: '',
    estimatedCost: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createTender = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const { projectId, preqDate, bidsSubDate, signDate, bondAmount, estimatedCost } = form;

    try {
      await tenderSystem.methods.createTender(
        web3.utils.asciiToHex(projectId),
        web3.utils.toWei(preqDate, 'ether'), // Adjust unit as needed
        web3.utils.toWei(bidsSubDate, 'ether'),
        web3.utils.toWei(signDate, 'ether'),
        web3.utils.toWei(bondAmount, 'ether'),
        web3.utils.toWei(estimatedCost, 'ether')
      ).send({ from: accounts[0] });
      alert('Tender Created Successfully!');
    } catch (error) {
      console.error(error);
      alert('Error creating tender.');
    }
  };

  return (
    <form onSubmit={createTender} className="bg-white p-6 rounded shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">Create Tender</h3>
      <div className="grid grid-cols-2 gap-4">
        <input type="text" name="projectId" placeholder="Project ID" onChange={handleChange} required className="border p-2 rounded"/>
        <input type="number" name="preqDate" placeholder="Pre-Qualification Date" onChange={handleChange} required className="border p-2 rounded"/>
        <input type="number" name="bidsSubDate" placeholder="Bids Submission Date" onChange={handleChange} required className="border p-2 rounded"/>
        <input type="number" name="signDate" placeholder="Sign Date" onChange={handleChange} required className="border p-2 rounded"/>
        <input type="number" name="bondAmount" placeholder="Bond Amount" onChange={handleChange} required className="border p-2 rounded"/>
        <input type="number" name="estimatedCost" placeholder="Estimated Cost" onChange={handleChange} required className="border p-2 rounded"/>
      </div>
      <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Create Tender</button>
    </form>
  );
};

export default CreateTender;
