import { ethers } from "ethers";
import tenderContractABI from "../utils/TenderSystemABI.json";

const contractAddress = "0x17eda43f874e6656ce2c4d771d01af91f57c0c7e"; // Replace with your deployed contract address

export const getContract = async () => {
  try {
    if (typeof window.ethereum !== "undefined") {
      // Request account access if needed
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Initialize provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Create and return the contract instance
      return new ethers.Contract(contractAddress, tenderContractABI.abi, signer);
    } else {
      throw new Error("Ethereum wallet is not connected. Please install MetaMask.");
    }
  } catch (error) {
    console.error("Error creating contract instance:", error.message);
    throw new Error(
      "Failed to create contract instance. Ensure MetaMask is installed, connected, and authorized."
    );
  }
};
