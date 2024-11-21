// src/components/Bidder/ApplyPreQualification.js
import React, { useState } from "react";
//import tenderSystem from '../../utils/contract';
//import web3 from "../../utils/web3";

const ApplyPreQualification = () => {
  const [form, setForm] = useState({
    name: "",
    completedProjects: "",
    inHandProjects: "",
    electricalProjects: "",
    enlistments: "",
    bscEngineers: "",
    bscEngineersExp: "",
    associateEngineers: "",
    associateEngineersExp: "",
    equipmentScore: "",
    financialScore: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const applyPreQual = async (e) => {
    e.preventDefault();
    //const accounts = await web3.eth.getAccounts();
    const {
      name,
      completedProjects,
      inHandProjects,
      electricalProjects,
      enlistments,
      bscEngineers,
      bscEngineersExp,
      associateEngineers,
      associateEngineersExp,
      equipmentScore,
      financialScore,
    } = form;

    try {
      await tenderSystem.methods
        .applyForPreQualification(
          name,
          {
            completedProjects: Number(completedProjects),
            inHandProjects: Number(inHandProjects),
            electricalProjects: Number(electricalProjects),
            enlistments: Number(enlistments),
          },
          {
            bscEngineers: Number(bscEngineers),
            bscEngineersExp: Number(bscEngineersExp),
            associateEngineers: Number(associateEngineers),
            associateEngineersExp: Number(associateEngineersExp),
          },
          Number(equipmentScore),
          Number(financialScore)
        )
        .send({ from: accounts[0] });
      alert("Pre-Qualification Applied Successfully!");
    } catch (error) {
      console.error(error);
      alert("Error applying for pre-qualification.");
    }
  };

  return (
    <form
      onSubmit={applyPreQual}
      className="bg-white p-6 rounded shadow-md mb-6"
    >
      <h3 className="text-xl font-semibold mb-4">
        Apply for Pre-Qualification
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Add input fields for all required data */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="completedProjects"
          placeholder="Completed Projects"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="inHandProjects"
          placeholder="In-Hand Projects"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="electricalProjects"
          placeholder="Electrical Projects"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="enlistments"
          placeholder="Enlistments"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="bscEngineers"
          placeholder="BSc Engineers"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="bscEngineersExp"
          placeholder="BSc Engineers Experience (years)"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="associateEngineers"
          placeholder="Associate Engineers"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="associateEngineersExp"
          placeholder="Associate Engineers Experience (years)"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="equipmentScore"
          placeholder="Equipment Score"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="financialScore"
          placeholder="Financial Score"
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Apply
      </button>
    </form>
  );
};

export default ApplyPreQualification;
