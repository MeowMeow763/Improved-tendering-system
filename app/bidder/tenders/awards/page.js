import React from "react";

const SubmitTenderPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Submit Tender</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium">Tender ID</label>
          <input type="text" className="w-full border rounded px-2 py-1" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Bid Amount</label>
          <input type="number" className="w-full border rounded px-2 py-1" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Attachment</label>
          <input type="file" className="w-full border rounded px-2 py-1" />
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default SubmitTenderPage;
