// src/components/Client/ClientDashboard.js
import React from 'react';
import CreateTender from './CreateTender';
import EvaluateBids from './EvaluateBids';

const ClientDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Client Dashboard</h2>
      <CreateTender />
      <EvaluateBids />
    </div>
  );
};

export default ClientDashboard;
