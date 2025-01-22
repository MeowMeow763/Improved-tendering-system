import mongoose from "mongoose";

const TechnicalEnvelopeSchema = new mongoose.Schema({
  bidderId: { type: String, required: true, unique: true }, // Wallet address
  companyName: { type: String, required: true },
  documents: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      ipfsCid: { type: String, required: true }, // IPFS CID for each document
    },
  ],
});

export default mongoose.models.TechnicalEnvelope ||
  mongoose.model("TechnicalEnvelope", TechnicalEnvelopeSchema);
