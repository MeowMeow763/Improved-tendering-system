const hre = require("hardhat");

async function main() {
  // Get the contract to deploy
  const TenderSystem = await hre.ethers.getContractFactory("TenderSystem");
  const tenderSystem = await TenderSystem.deploy();

  await tenderSystem.deployed();

  console.log("TenderSystem deployed to:", tenderSystem.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
