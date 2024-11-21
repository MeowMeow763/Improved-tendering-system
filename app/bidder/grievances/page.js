import React from "react";

const GrievancesPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Grievances</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium">Enter Your Grievance</label>
          <textarea className="w-full border rounded px-2 py-1" rows="4"></textarea>
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded">Submit Grievance</button>
      </form>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Submitted Grievances</h3>
        <p>No grievances submitted yet.</p>
      </div>
    </div>
  );
};

export default GrievancesPage;
