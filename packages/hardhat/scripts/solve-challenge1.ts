import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "hardhat";

async function main() {
  console.log("🎯 Solving Challenge 1: The Greeting");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("👤 Using address:", deployer.address);

  // Get the Challenge1 contract
  const challenge1Address = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // From deployedContracts.ts
  const challenge1Abi = [
    "function registerMe(string memory _name) public",
    "function builderNames(address) public view returns (string memory)",
    "function nftContract() public view returns (address)",
    "event BuilderInit(address indexed player, string name)",
  ];

  const challenge1 = new ethers.Contract(challenge1Address, challenge1Abi, deployer);

  console.log("📋 Challenge1 contract address:", challenge1Address);

  // Check if we're already registered
  const currentName = await challenge1.builderNames(deployer.address);
  if (currentName !== "") {
    console.log("📋 Already registered with name:", currentName);
    console.log("✅ Challenge 1 already completed!");
    return;
  }

  // Call registerMe function with a name
  const playerName = "CTF Player";
  console.log("📝 Registering with name:", playerName);

  try {
    const tx = await challenge1.registerMe(playerName);
    console.log("✅ Transaction sent! Hash:", tx.hash);

    // Wait for transaction to be mined
    const receipt = await tx.wait();
    console.log("🎉 Transaction confirmed in block:", receipt?.blockNumber);

    // Check if we're registered
    const registeredName = await challenge1.builderNames(deployer.address);
    console.log("📋 Registered name:", registeredName);

    console.log("🚩 Challenge 1 completed! You should now have an NFT flag.");
  } catch (error) {
    console.error("❌ Error solving challenge:", error);
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
