import React, { useState } from "react";

const BidSecurityForm = ({ tenders }) => {
  const [formData, setFormData] = useState({
    tenderId: "",
    instrumentType: "",
    instrumentNo: "",
    issueDate: "",
    expiryDate: "",
    bankName: "",
    bidSecurityAmount: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add API call or Web3 interaction to submit bid security
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Create Bid Security</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select Tender</label>
          <select
            name="tenderId"
            value={formData.tenderId}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">Select Tender</option>
            {tenders?.map((tender, index) => (
              <option key={index} value={tender.id}>
                {tender.title}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Instrument Type</label>
            <select
              name="instrumentType"
              value={formData.instrumentType}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">Select</option>
              <option value="Bank Guarantee">Bank Guarantee</option>
              <option value="Pay Order">Pay Order</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Instrument No</label>
            <input
              type="text"
              name="instrumentNo"
              value={formData.instrumentNo}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Issue Date</label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bank Name</label>
            <select
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">Select</option>
              <option value="Bank A">Bank A</option>
              <option value="Bank B">Bank B</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bid Security Amount</label>
            <input
              type="number"
              name="bidSecurityAmount"
              value={formData.bidSecurityAmount}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Attachment</label>
          <input
            type="file"
            name="attachment"
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => console.log("Back clicked")}
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BidSecurityForm;
