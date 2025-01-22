import { useState } from "react";
import { getContract } from "../../services/contractService";

const ClientDashboard = () => {
  const [formData, setFormData] = useState({
    projectId: "",
    preqDate: "",
    bidsSubDate: "",
    signDate: "",
    bondAmount: "",
    estimatedCost: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contract = getContract();

    try {
      const tx = await contract.createTender(
        ethers.utils.formatBytes32String(formData.projectId),
        Math.floor(new Date(formData.preqDate).getTime() / 1000),
        Math.floor(new Date(formData.bidsSubDate).getTime() / 1000),
        Math.floor(new Date(formData.signDate).getTime() / 1000),
        ethers.utils.parseEther(formData.bondAmount),
        ethers.utils.parseEther(formData.estimatedCost)
      );
      await tx.wait();
      alert("Tender created successfully!");
    } catch (error) {
      console.error("Error creating tender:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="projectId" placeholder="Project ID" onChange={handleChange} required />
      <input type="date" name="preqDate" placeholder="Pre-Qualification Date" onChange={handleChange} required />
      <input type="date" name="bidsSubDate" placeholder="Bids Submission Date" onChange={handleChange} required />
      <input type="date" name="signDate" placeholder="Sign Date" onChange={handleChange} required />
      <input type="text" name="bondAmount" placeholder="Bond Amount (ETH)" onChange={handleChange} required />
      <input type="text" name="estimatedCost" placeholder="Estimated Cost (ETH)" onChange={handleChange} required />
      <button type="submit">Create Tender</button>
    </form>
  );
};

export default ClientDashboard;