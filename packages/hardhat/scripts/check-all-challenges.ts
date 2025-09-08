import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "hardhat";

async function main() {
  console.log("🔍 Checking All Challenges Status");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("👤 Using address:", deployer.address);

  // NFTFlags contract address
  const nftFlagsAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  console.log("📋 NFTFlags contract address:", nftFlagsAddress);

  const nftFlagsAbi = ["function hasMinted(address, uint256) public view returns (bool)"];
  const nftFlags = new ethers.Contract(nftFlagsAddress, nftFlagsAbi, deployer);

  try {
    console.log("\n🚩 Challenge Status:");
    console.log("====================");

    for (let i = 1; i <= 12; i++) {
      const hasMinted = await nftFlags.hasMinted(deployer.address, i);
      const status = hasMinted ? "✅ Completed" : "❌ Not completed";
      console.log(`Challenge ${i}: ${status}`);
    }
  } catch (error) {
    console.error("❌ Error checking challenges:", error);
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
