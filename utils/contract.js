import { ethers } from "ethers";
import TenderSystemABI from "./TenderSystemABI.json";

async function getContract() {
  try {
    // Ensure MetaMask is connected
    if (!window.ethereum) {
      throw new Error("MetaMask is not available. Please install MetaMask.");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Contract address and ABI
    const contractAddress = "0x2c39AeB9E8a8acb67529894dB3fd0147DCd8576b";
    const contract = new ethers.Contract(contractAddress, TenderSystemABI, signer);

    return contract;
  } catch (error) {
    console.error("Error initializing contract:", error.message);
    alert("Failed to initialize the smart contract. Check your connection and try again.");
    throw error;
  }
}

export default getContract;
