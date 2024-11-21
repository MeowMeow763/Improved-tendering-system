import React from "react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-blue-400 p-4 flex justify-between items-center">
        <img src="/logo.png" alt="Logo" className="h-12" />
        <h1 className="text-lg font-bold">Blockchain Tendering System</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-8 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        {/* Welcome Message */}
        <section className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to Blockchain Tendering System
          </h1>
          <p className="text-gray-600">
            This platform ensures transparency, accountability, and efficiency
            in public procurement through blockchain technology.
          </p>
        </section>

        {/* Buttons */}
        <section className="text-center mb-8">
  <Link href="/client" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded mx-2">
    Client
  </Link>
  <Link href="/bidder" className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded mx-2">
    Bidder
  </Link>
</section>

{/* Introduction Section */}
<section className="mt-12">
  <h2 className="text-xl font-semibold mb-6 text-center">Blockchain-Based Tendering System</h2>
  <p className="text-gray-700 text-center leading-relaxed px-6">
    Our <span className="font-bold">Blockchain-Based Tendering System</span> revolutionizes the 
    <span className="font-bold"> construction tendering process </span> in Pakistan by enhancing 
    <span className="font-bold"> transparency, security,</span> and <span className="font-bold"> efficiency</span>. 
    This <span className="font-bold"> decentralized application (dApp)</span> leverages 
    <span className="font-bold"> blockchain technology </span> to eliminate intermediaries, reduce corruption, 
    and provide a <span className="font-bold"> tamper-proof platform </span> for bid submissions and evaluations. 
    With <span className="font-bold"> real-time data validation </span> and automated 
    <span className="font-bold"> smart contracts</span>, it ensures fair competition and builds trust among stakeholders. 
    Transform the way you approach <span className="font-bold"> construction projects </span> with a 
    <span className="font-bold"> cutting-edge solution </span> tailored to meet industry demands.
  </p>
</section>


      </main>

      {/* Footer */}
      <footer className="bg-blue-400 p-4 text-center">
        <p className="text-sm">
          Powered by Blockchain Technology | Contact: support@blockchaintender.com
        </p>
      </footer>
    </div>
  );

};

export default LandingPage;
