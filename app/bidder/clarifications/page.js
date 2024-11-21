import React from "react";

const ClarificationsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Clarifications</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium">Enter Your Question</label>
          <textarea className="w-full border rounded px-2 py-1" rows="4"></textarea>
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded">Submit Clarification</button>
      </form>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Submitted Clarifications</h3>
        <p>No clarifications submitted yet.</p>
      </div>
    </div>
  );
};

export default ClarificationsPage;
