import React from 'react';

const ClarificationsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Clarifications</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-4/5">
        <form className="space-y-4">
          <div>
            <label htmlFor="clarification" className="block text-gray-700 font-medium">
              Clarification <span className="text-red-500">*</span>
            </label>
            <textarea
              id="clarification"
              rows="4"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your clarification here..."
            ></textarea>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-2">Previous Clarifications</h2>
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2">Question Date</th>
                  <th className="px-4 py-2">Question</th>
                  <th className="px-4 py-2">Answer</th>
                  <th className="px-4 py-2">Answer Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2" colSpan="4" align="center">
                    No records found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-between">
            <button type="button" className="bg-red-500 text-white py-2 px-4 rounded">
              Back
            </button>
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClarificationsPage;
