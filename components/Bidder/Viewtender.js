import React from "react";

const ViewTenderPage = () => {
  const tenders = [
    { id: 1, title: "Road Construction", status: "Open" },
    { id: 2, title: "Building Renovation", status: "Closed" },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">View Tenders</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="px-4 py-2">Tender ID</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender) => (
            <tr key={tender.id}>
              <td className="border px-4 py-2">{tender.id}</td>
              <td className="border px-4 py-2">{tender.title}</td>
              <td className="border px-4 py-2">{tender.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTenderPage;
