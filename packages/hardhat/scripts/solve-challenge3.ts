import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "hardhat";

async function main() {
  console.log("🎯 Solving Challenge 3: No Code Contract");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("👤 Using address:", deployer.address);

  // Get the Challenge3 contract address
  const challenge3Address = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
  console.log("📋 Challenge3 contract address:", challenge3Address);

  // Deploy the solution contract
  console.log("🚀 Deploying Challenge3Solution contract...");
  const Challenge3Solution = await ethers.getContractFactory("Challenge3Solution");
  const solution = await Challenge3Solution.deploy(challenge3Address);
  await solution.waitForDeployment();
  
  const solutionAddress = await solution.getAddress();
  console.log("✅ Challenge3Solution deployed at:", solutionAddress);
  console.log("🚩 Challenge 3 completed! You should now have an NFT flag.");
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
}); 