// src/components/Bidder/SubmitBid.js
import React, { useState } from "react";
// import tenderSystem from '../../utils/contract';
// import web3 from '../../utils/web3';

const SubmitBid = () => {
  const [form, setForm] = useState({
    projectId: "",
    descriptions: [""],
    quantities: [""],
    rates: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleArrayChange = (index, field, value) => {
    const newArray = [...form[field]];
    newArray[index] = value;
    setForm({ ...form, [field]: newArray });
  };

  const addItem = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const submitBid = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const { projectId, descriptions, quantities, rates } = form;

    try {
      await tenderSystem.methods
        .submitContractorBid(
          web3.utils.asciiToHex(projectId),
          descriptions,
          quantities.map((q) => Number(q)),
          rates.map((r) => Number(r))
        )
        .send({ from: accounts[0] });
      alert("Bid Submitted Successfully!");
    } catch (error) {
      console.error(error);
      alert("Error submitting bid.");
    }
  };

  return (
    <form onSubmit={submitBid} className="bg-white p-6 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-4">Submit Bid</h3>
      <div className="mb-4">
        <input
          type="text"
          name="projectId"
          placeholder="Project ID"
          value={form.projectId}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
      </div>
      {form.descriptions.map((desc, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 mb-2">
          <input
            type="text"
            placeholder="Description"
            value={desc}
            onChange={(e) =>
              handleArrayChange(index, "descriptions", e.target.value)
            }
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantities[index]}
            onChange={(e) =>
              handleArrayChange(index, "quantities", e.target.value)
            }
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Rate"
            value={form.rates[index]}
            onChange={(e) => handleArrayChange(index, "rates", e.target.value)}
            required
            className="border p-2 rounded"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => addItem("descriptions")}
        className="bg-gray-300 text-black px-2 py-1 rounded mb-4"
      >
        Add BOQ Item
      </button>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Bid
      </button>
    </form>
  );
};

export default SubmitBid;
