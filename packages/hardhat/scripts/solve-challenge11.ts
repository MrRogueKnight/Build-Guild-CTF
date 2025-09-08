import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "hardhat";

async function main() {
  console.log("🎯 Solving Challenge 11: Bit Manipulation");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("👤 Using address:", deployer.address);

  // Get the Challenge11 contract address
  const challenge11Address = "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82";
  console.log("📋 Challenge11 contract address:", challenge11Address);

  // Deploy the solution contract
  console.log("🚀 Deploying Challenge11Solution contract...");
  const Challenge11Solution = await ethers.getContractFactory("Challenge11Solution");
  const solution = await Challenge11Solution.deploy();
  await solution.waitForDeployment();

  const solutionAddress = await solution.getAddress();
  console.log("✅ Challenge11Solution deployed at:", solutionAddress);

  // Call the solve function
  console.log("🔧 Calling solve() function...");
  try {
    const tx = await solution.solve(challenge11Address);
    console.log("✅ Transaction sent! Hash:", tx.hash);

    // Wait for transaction to be mined
    const receipt = await tx.wait();
    console.log("🎉 Transaction confirmed in block:", receipt?.blockNumber);

    console.log("🚩 Challenge 11 completed! You should now have an NFT flag.");
  } catch (error) {
    console.error("❌ Error solving challenge:", error);
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
