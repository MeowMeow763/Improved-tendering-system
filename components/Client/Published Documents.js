import React from "react";

const PublishedDocuments = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">PA Published Documents</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">S.No</th>
            <th className="border px-4 py-2">Publication Name</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">1</td>
            <td className="border px-4 py-2">Document A</td>
            <td className="border px-4 py-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="bg-red-500 text-white px-4 py-2 rounded mt-4">Back</button>
    </div>
  );
};

export default PublishedDocuments;
