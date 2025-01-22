import connectDB from "../../../utils/db";
import TechnicalEnvelope from "../../../models/TechnicalEnvelope";

export default async function handler(req, res) {
  await connectDB();

  const { bidderId } = req.query;

  if (!bidderId) {
    return res.status(400).json({ error: "Bidder ID is required" });
  }

  try {
    // Find the technical envelope for the bidder
    const technicalEnvelope = await TechnicalEnvelope.findOne({ bidderId });

    if (!technicalEnvelope) {
      return res.status(404).json({ error: "Technical envelope not found" });
    }

    res.status(200).json({
      companyName: technicalEnvelope.companyName,
      documents: technicalEnvelope.documents,
    });
  } catch (error) {
    console.error("Error fetching technical envelope:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
