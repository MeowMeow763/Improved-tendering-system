"use client";

import React from "react";
import TechnicalEnvelopeViewer from "@/components/Client/TechnicalEnvelopeViewer"; // Adjusted path

const TechnicalEvaluation = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Technical Evaluation</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <TechnicalEnvelopeViewer />
      </div>
    </div>
  );
};

export default TechnicalEvaluation;
