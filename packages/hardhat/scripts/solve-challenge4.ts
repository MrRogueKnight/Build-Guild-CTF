import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "hardhat";

async function main() {
  console.log("🎯 Solving Challenge 4: Signature Verification");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("👤 Using address:", deployer.address);

  // Get the Challenge4 contract address
  const challenge4Address = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
  console.log("📋 Challenge4 contract address:", challenge4Address);

  const challenge4Abi = [
    "function mintFlag(address _minter, bytes memory signature) public",
    "function addMinter(address _minter) public",
    "function owner() public view returns (address)",
  ];
  const challenge4 = new ethers.Contract(challenge4Address, challenge4Abi, deployer);

  try {
    // First, check if we're the owner and can add ourselves as minter
    const owner = await challenge4.owner();
    console.log("👑 Contract owner:", owner);
    console.log("👤 Our address:", deployer.address);

    if (owner.toLowerCase() === deployer.address.toLowerCase()) {
      console.log("✅ We are the owner! Adding ourselves as minter...");
      const addMinterTx = await challenge4.addMinter(deployer.address);
      await addMinterTx.wait();
      console.log("✅ Added as minter!");
    } else {
      console.log("❌ We are not the owner. Need to find another way...");
    }

    // Create the message to sign: "BG CTF Challenge 4" + msg.sender
    const message = ethers.solidityPackedKeccak256(["string", "address"], ["BG CTF Challenge 4", deployer.address]);

    // Sign the message (ethers.js automatically handles the Ethereum signed message format)
    const signature = await deployer.signMessage(ethers.getBytes(message));

    const tx = await challenge4.mintFlag(deployer.address, signature);
    await tx.wait();
    console.log("🚩 Challenge 4 completed! You should now have an NFT flag.");
  } catch (error) {
    console.error("❌ Error solving challenge:", error);
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
