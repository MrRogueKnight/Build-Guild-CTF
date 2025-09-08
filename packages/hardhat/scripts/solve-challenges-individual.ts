import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "hardhat";

async function main() {
  console.log("🎯 Solving CTF Challenges - Individual Approach");
  console.log("==============================================");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("👤 Using address:", deployer.address);

  // Correct challenge addresses from deployedContracts.ts
  const challenges = {
    challenge1: { address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", name: "The Greeting" },
    challenge2: { address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9", name: "Contract Call" },
    challenge3: { address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9", name: "No Code Contract" },
    challenge4: { address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707", name: "Signature Verification" },
    challenge5: { address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", name: "Points System" },
    challenge6: { address: "0x0165878A594ca255338adfa4d48449f69242Eb8F", name: "Code Verification" },
    challenge7: { address: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6", name: "Ownership Claim" },
    challenge8: { address: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318", name: "Custom Bytecode" },
    challenge9: { address: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788", name: "Password Cracking" },
    challenge10: { address: "0x5FbDB2315678afecb367f032d93F642f64180aa3", name: "NFTFlags Contract" },
    challenge11: { address: "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82", name: "Bit Manipulation" },
    challenge12: { address: "0x9A676e781A523b5d0C0e43731313A708CB607508", name: "RLP Decoding" },
  };

  const results = {};

  // Challenge 1: Simple registration
  console.log("\n🚩 Challenge 1: The Greeting");
  try {
    const challenge1Abi = [
      "function registerMe(string memory _name) public",
      "function builderNames(address) public view returns (string memory)",
    ];
    const challenge1 = new ethers.Contract(challenges.challenge1.address, challenge1Abi, deployer);

    const currentName = await challenge1.builderNames(deployer.address);
    if (currentName === "") {
      const tx = await challenge1.registerMe("CTF Player");
      await tx.wait();
      console.log("✅ Challenge 1 completed!");
      results.challenge1 = "✅ Completed";
    } else {
      console.log("✅ Challenge 1 already completed!");
      results.challenge1 = "✅ Already completed";
    }
  } catch (error) {
    console.log("❌ Challenge 1 failed:", error.message);
    results.challenge1 = "❌ Failed";
  }

  // Challenge 2: Contract call
  console.log("\n🚩 Challenge 2: Contract Call");
  try {
    const challenge2Abi = ["function justCallMe() public"];
    const challenge2 = new ethers.Contract(challenges.challenge2.address, challenge2Abi, deployer);

    // Deploy solution contract
    const Challenge2Solution = await ethers.getContractFactory("Challenge2Solution");
    const solution2 = await Challenge2Solution.deploy(challenges.challenge2.address);
    await solution2.waitForDeployment();

    const tx = await solution2.solve();
    await tx.wait();
    console.log("✅ Challenge 2 completed!");
    results.challenge2 = "✅ Completed";
  } catch (error) {
    console.log("❌ Challenge 2 failed:", error.message);
    results.challenge2 = "❌ Failed";
  }

  // Challenge 3: No code contract
  console.log("\n🚩 Challenge 3: No Code Contract");
  try {
    const Challenge3Solution = await ethers.getContractFactory("Challenge3Solution");
    const solution3 = await Challenge3Solution.deploy(challenges.challenge3.address);
    await solution3.waitForDeployment();
    console.log("✅ Challenge 3 completed!");
    results.challenge3 = "✅ Completed";
  } catch (error) {
    console.log("❌ Challenge 3 failed:", error.message);
    results.challenge3 = "❌ Failed";
  }

  // Challenge 4: Signature verification
  console.log("\n🚩 Challenge 4: Signature Verification");
  try {
    const challenge4Abi = ["function mintFlag(address _minter, bytes memory signature) public"];
    const challenge4 = new ethers.Contract(challenges.challenge4.address, challenge4Abi, deployer);

    // Create a message to sign
    const message = ethers.solidityPackedKeccak256(["address", "uint256"], [deployer.address, 4]);

    // Sign the message
    const signature = await deployer.signMessage(ethers.getBytes(message));

    const tx = await challenge4.mintFlag(deployer.address, signature);
    await tx.wait();
    console.log("✅ Challenge 4 completed!");
    results.challenge4 = "✅ Completed";
  } catch (error) {
    console.log("❌ Challenge 4 failed:", error.message);
    results.challenge4 = "❌ Failed";
  }

  // Challenge 5: Points system
  console.log("\n🚩 Challenge 5: Points System");
  try {
    const challenge5Abi = [
      "function resetPoints() public",
      "function claimPoints() public",
      "function mintFlag() public",
    ];
    const challenge5 = new ethers.Contract(challenges.challenge5.address, challenge5Abi, deployer);

    // Reset points first
    const resetTx = await challenge5.resetPoints();
    await resetTx.wait();

    // Claim points
    const claimTx = await challenge5.claimPoints();
    await claimTx.wait();

    // Mint flag
    const mintTx = await challenge5.mintFlag();
    await mintTx.wait();
    console.log("✅ Challenge 5 completed!");
    results.challenge5 = "✅ Completed";
  } catch (error) {
    console.log("❌ Challenge 5 failed:", error.message);
    results.challenge5 = "❌ Failed";
  }

  // Challenge 6: Code verification
  console.log("\n🚩 Challenge 6: Code Verification");
  try {
    const challenge6Abi = ["function mintFlag(uint256 code) public"];
    const challenge6 = new ethers.Contract(challenges.challenge6.address, challenge6Abi, deployer);

    // Get the contract's bytecode
    const code = await ethers.provider.getCode(challenges.challenge6.address);
    const codeLength = ethers.dataLength(code);

    const tx = await challenge6.mintFlag(codeLength);
    await tx.wait();
    console.log("✅ Challenge 6 completed!");
    results.challenge6 = "✅ Completed";
  } catch (error) {
    console.log("❌ Challenge 6 failed:", error.message);
    results.challenge6 = "❌ Failed";
  }

  // Challenge 7: Ownership claim
  console.log("\n🚩 Challenge 7: Ownership Claim");
  try {
    const challenge7Abi = ["function claimOwnership() public", "function mintFlag() public"];
    const challenge7 = new ethers.Contract(challenges.challenge7.address, challenge7Abi, deployer);

    // Claim ownership
    const claimTx = await challenge7.claimOwnership();
    await claimTx.wait();

    // Mint flag
    const mintTx = await challenge7.mintFlag();
    await mintTx.wait();
    console.log("✅ Challenge 7 completed!");
    results.challenge7 = "✅ Completed";
  } catch (error) {
    console.log("❌ Challenge 7 failed:", error.message);
    results.challenge7 = "❌ Failed";
  }

  // Challenge 8: Custom bytecode
  console.log("\n🚩 Challenge 8: Custom Bytecode");
  try {
    const challenge8Abi = ["function mintFlag() public"];
    const challenge8 = new ethers.Contract(challenges.challenge8.address, challenge8Abi, deployer);

    const tx = await challenge8.mintFlag();
    await tx.wait();
    console.log("✅ Challenge 8 completed!");
    results.challenge8 = "✅ Completed";
  } catch (error) {
    console.log("❌ Challenge 8 failed:", error.message);
    results.challenge8 = "❌ Failed";
  }

  // Challenge 9: Password cracking
  console.log("\n🚩 Challenge 9: Password Cracking");
  try {
    const challenge9Abi = ["function mintFlag(bytes32 _password) public"];
    const challenge9 = new ethers.Contract(challenges.challenge9.address, challenge9Abi, deployer);

    // Get the password from storage slot 0
    const password = await ethers.provider.getStorage(challenges.challenge9.address, 0);

    const tx = await challenge9.mintFlag(password);
    await tx.wait();
    console.log("✅ Challenge 9 completed!");
    results.challenge9 = "✅ Completed";
  } catch (error) {
    console.log("❌ Challenge 9 failed:", error.message);
    results.challenge9 = "❌ Failed";
  }

  // Challenge 10: NFTFlags contract
  console.log("\n🚩 Challenge 10: NFTFlags Contract");
  try {
    // Check if there's a mintFlag function in NFTFlags
    const nftFlagsAbi = ["function mintFlag() public"];
    const nftFlags = new ethers.Contract(challenges.challenge10.address, nftFlagsAbi, deployer);

    const tx = await nftFlags.mintFlag();
    await tx.wait();
    console.log("✅ Challenge 10 completed!");
    results.challenge10 = "✅ Completed";
  } catch (error) {
    console.log("❌ Challenge 10 failed:", error.message);
    results.challenge10 = "❌ Failed";
  }

  // Challenge 11: Bit manipulation
  console.log("\n🚩 Challenge 11: Bit Manipulation");
  try {
    const Challenge11Solution = await ethers.getContractFactory("Challenge11Solution");
    const solution11 = await Challenge11Solution.deploy();
    await solution11.waitForDeployment();

    const tx = await solution11.solve(challenges.challenge11.address);
    await tx.wait();
    console.log("✅ Challenge 11 completed!");
    results.challenge11 = "✅ Completed";
  } catch (error) {
    console.log("❌ Challenge 11 failed:", error.message);
    results.challenge11 = "❌ Failed";
  }

  // Challenge 12: RLP decoding
  console.log("\n🚩 Challenge 12: RLP Decoding");
  try {
    const challenge12Abi = ["function preMintFlag() public", "function mintFlag(bytes memory rlpBytes) public"];
    const challenge12 = new ethers.Contract(challenges.challenge12.address, challenge12Abi, deployer);

    // First call preMintFlag
    const preTx = await challenge12.preMintFlag();
    await preTx.wait();

    // Wait a bit for the block to be mined
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Get the current block number
    const blockNumber = await ethers.provider.getBlockNumber();

    // Create RLP encoded block number
    const rlpBytes = ethers.toBeHex(blockNumber);

    const tx = await challenge12.mintFlag(rlpBytes);
    await tx.wait();
    console.log("✅ Challenge 12 completed!");
    results.challenge12 = "✅ Completed";
  } catch (error) {
    console.log("❌ Challenge 12 failed:", error.message);
    results.challenge12 = "❌ Failed";
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("🎉 CHALLENGE SUMMARY");
  console.log("=".repeat(50));

  Object.entries(results).forEach(([challenge, status]) => {
    const challengeNum = challenge.replace("challenge", "");
    const challengeName = challenges[challenge].name;
    console.log(`Challenge ${challengeNum}: ${challengeName} - ${status}`);
  });

  const completed = Object.values(results).filter(r => r.includes("✅")).length;
  console.log(`\n🎯 Total completed: ${completed}/12 challenges`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
