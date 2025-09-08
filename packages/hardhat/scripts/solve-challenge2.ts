import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "hardhat";

async function main() {
  console.log("🎯 Solving Challenge 2: Contract Call");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("👤 Using address:", deployer.address);

  // Get the Challenge2 contract address
  const challenge2Address = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"; // From deployedContracts.ts
  console.log("📋 Challenge2 contract address:", challenge2Address);

  // Deploy the solution contract
  console.log("🚀 Deploying Challenge2Solution contract...");
  const Challenge2Solution = await ethers.getContractFactory("Challenge2Solution");
  const solution = await Challenge2Solution.deploy(challenge2Address);
  await solution.waitForDeployment();
  
  const solutionAddress = await solution.getAddress();
  console.log("✅ Challenge2Solution deployed at:", solutionAddress);

  // Call the solve function
  console.log("🔧 Calling solve() function...");
  try {
    const tx = await solution.solve();
    console.log("✅ Transaction sent! Hash:", tx.hash);
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    console.log("🎉 Transaction confirmed in block:", receipt?.blockNumber);
    
    console.log("🚩 Challenge 2 completed! You should now have an NFT flag.");
    
  } catch (error) {
    console.error("❌ Error solving challenge:", error);
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
}); 