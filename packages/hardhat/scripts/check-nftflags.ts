import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "hardhat";

async function main() {
  console.log("🔍 Checking NFTFlags Contract State");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("👤 Using address:", deployer.address);

  // NFTFlags contract address
  const nftFlagsAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  console.log("📋 NFTFlags contract address:", nftFlagsAddress);

  const nftFlagsAbi = [
    "function allowedMinters(address) public view returns (bool)",
    "function enabled() public view returns (bool)",
    "function hasMinted(address, uint256) public view returns (bool)",
    "function owner() public view returns (address)"
  ];
  const nftFlags = new ethers.Contract(nftFlagsAddress, nftFlagsAbi, deployer);

  try {
    // Check if minting is enabled
    const enabled = await nftFlags.enabled();
    console.log("🔓 Minting enabled:", enabled);

    // Check if we're the owner
    const owner = await nftFlags.owner();
    console.log("👑 Contract owner:", owner);
    console.log("👤 Our address:", deployer.address);
    console.log("👑 Are we owner?", owner.toLowerCase() === deployer.address.toLowerCase());

    // Check if Challenge2 is an allowed minter
    const challenge2Address = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
    const challenge2Allowed = await nftFlags.allowedMinters(challenge2Address);
    console.log("✅ Challenge2 allowed minter:", challenge2Allowed);

    // Check if we've minted Challenge 1
    const hasMinted1 = await nftFlags.hasMinted(deployer.address, 1);
    console.log("🚩 Has minted Challenge 1:", hasMinted1);

    // Check if we've minted Challenge 2
    const hasMinted2 = await nftFlags.hasMinted(deployer.address, 2);
    console.log("🚩 Has minted Challenge 2:", hasMinted2);

  } catch (error) {
    console.error("❌ Error checking NFTFlags:", error);
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
}); 