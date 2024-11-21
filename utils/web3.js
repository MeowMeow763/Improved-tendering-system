import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && window.ethereum) {
  // Modern DApp browsers
  web3 = new Web3(window.ethereum);
  window.ethereum.request({ method: "eth_requestAccounts" });
} else if (typeof window !== "undefined" && window.web3) {
  // Legacy DApp browsers
  web3 = new Web3(window.web3.currentProvider);
} else {
  // Fallback for server-side rendering or non-DApp browsers
  const provider = new Web3.providers.HttpProvider("http://localhost:8545");
  web3 = new Web3(provider);
}

export default web3;
