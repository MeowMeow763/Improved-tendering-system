import web3 from "./web3";
import TenderSystemABI from "./TenderSystemABI.json"; // Ensure this path is correct

const contractAddress = "0xCA20FE49c7464D93A15A80BEc7Eae6b4662706AF"; // Replace with your contract's address

const tenderSystem = new web3.eth.Contract(TenderSystemABI, contractAddress);

export default tenderSystem;
