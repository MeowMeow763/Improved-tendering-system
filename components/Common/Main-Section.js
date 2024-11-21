// components/MainSection.js
const MainSection = () => {
  return (
    <div className="text-center my-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Blockchain Tendering System</h1>
      <p className="text-gray-600 mb-6">
        This platform ensures transparency and accountability in the public procurement process,
        leveraging blockchain technology to simplify and secure tender management.
      </p>
      <div className="space-x-4">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded">
          Active Tenders
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded">
          Closed Tenders
        </button>
      </div>
    </div>
  );
};

export default MainSection;
