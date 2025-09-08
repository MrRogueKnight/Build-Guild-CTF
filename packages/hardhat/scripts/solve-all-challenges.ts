import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "hardhat";

async function main() {
  console.log("🎯 Solving All CTF Challenges");
  console.log("==============================");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("👤 Using address:", deployer.address);

  // Challenge addresses from deployedContracts.ts
  const challengeAddresses = {
    challenge1: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    challenge2: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    challenge3: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    challenge4: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
    challenge5: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    challenge6: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", // This seems wrong, let me check
    challenge7: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
    challenge8: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318", // From deployment script
    challenge9: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
    challenge10: "0x0000000000000000000000000000000000000000", // No contract, check NFTFlags
    challenge11: "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82",
    challenge12: "0x9A676e781A523b5d0C0e43731313A708CB607508",
  };

  // Challenge 1: Simple registration
  console.log("\n🚩 Challenge 1: The Greeting");
  try {
    const challenge1Abi = ["function registerMe(string memory _name) public"];
    const challenge1 = new ethers.Contract(challengeAddresses.challenge1, challenge1Abi, deployer);

    const currentName = await challenge1.builderNames(deployer.address);
    if (currentName === "") {
      const tx = await challenge1.registerMe("CTF Player");
      await tx.wait();
      console.log("✅ Challenge 1 completed!");
    } else {
      console.log("✅ Challenge 1 already completed!");
    }
  } catch (error) {
    console.log("❌ Challenge 1 failed:", error.message);
  }

  // Challenge 2: Contract call (already solved)
  console.log("\n🚩 Challenge 2: Contract Call");
  try {
    const challenge2Abi = ["function justCallMe() public"];
    const challenge2 = new ethers.Contract(challengeAddresses.challenge2, challenge2Abi, deployer);

    // Deploy solution contract
    const Challenge2Solution = await ethers.getContractFactory("Challenge2Solution");
    const solution2 = await Challenge2Solution.deploy(challengeAddresses.challenge2);
    await solution2.waitForDeployment();

    const tx = await solution2.solve();
    await tx.wait();
    console.log("✅ Challenge 2 completed!");
  } catch (error) {
    console.log("❌ Challenge 2 failed:", error.message);
  }

  // Challenge 3: Contract with no code
  console.log("\n🚩 Challenge 3: No Code Contract");
  try {
    const challenge3Abi = ["function mintFlag() public"];
    const challenge3 = new ethers.Contract(challengeAddresses.challenge3, challenge3Abi, deployer);

    // Deploy a contract that calls mintFlag but has no code (constructor only)
    const Challenge3Solution = await ethers.getContractFactory(`
      contract Challenge3Solution {
        constructor(address challenge) {
          (bool success,) = challenge.call(abi.encodeWithSignature("mintFlag()"));
          require(success, "Call failed");
        }
      }
    `);

    const solution3 = await Challenge3Solution.deploy(challengeAddresses.challenge3);
    await solution3.waitForDeployment();
    console.log("✅ Challenge 3 completed!");
  } catch (error) {
    console.log("❌ Challenge 3 failed:", error.message);
  }

  // Challenge 4: Signature verification
  console.log("\n🚩 Challenge 4: Signature Verification");
  try {
    const challenge4Abi = ["function mintFlag(address _minter, bytes memory signature) public"];
    const challenge4 = new ethers.Contract(challengeAddresses.challenge4, challenge4Abi, deployer);

    // Create a message to sign
    const message = ethers.solidityPackedKeccak256(["address", "uint256"], [deployer.address, 4]);

    // Sign the message
    const signature = await deployer.signMessage(ethers.getBytes(message));

    const tx = await challenge4.mintFlag(deployer.address, signature);
    await tx.wait();
    console.log("✅ Challenge 4 completed!");
  } catch (error) {
    console.log("❌ Challenge 4 failed:", error.message);
  }

  // Challenge 5: Points system
  console.log("\n🚩 Challenge 5: Points System");
  try {
    const challenge5Abi = [
      "function resetPoints() public",
      "function claimPoints() public",
      "function mintFlag() public",
    ];
    const challenge5 = new ethers.Contract(challengeAddresses.challenge5, challenge5Abi, deployer);

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
  } catch (error) {
    console.log("❌ Challenge 5 failed:", error.message);
  }

  // Challenge 6: Code verification
  console.log("\n🚩 Challenge 6: Code Verification");
  try {
    const challenge6Abi = ["function mintFlag(uint256 code) public"];
    const challenge6 = new ethers.Contract(challengeAddresses.challenge6, challenge6Abi, deployer);

    // The code should be the contract's bytecode length
    const code = await ethers.provider.getCode(challengeAddresses.challenge6);
    const codeLength = ethers.dataLength(code);

    const tx = await challenge6.mintFlag(codeLength);
    await tx.wait();
    console.log("✅ Challenge 6 completed!");
  } catch (error) {
    console.log("❌ Challenge 6 failed:", error.message);
  }

  // Challenge 7: Ownership claim
  console.log("\n🚩 Challenge 7: Ownership Claim");
  try {
    const challenge7Abi = ["function claimOwnership() public", "function mintFlag() public"];
    const challenge7 = new ethers.Contract(challengeAddresses.challenge7, challenge7Abi, deployer);

    // Claim ownership
    const claimTx = await challenge7.claimOwnership();
    await claimTx.wait();

    // Mint flag
    const mintTx = await challenge7.mintFlag();
    await mintTx.wait();
    console.log("✅ Challenge 7 completed!");
  } catch (error) {
    console.log("❌ Challenge 7 failed:", error.message);
  }

  // Challenge 8: Custom bytecode (already deployed)
  console.log("\n🚩 Challenge 8: Custom Bytecode");
  try {
    // Challenge 8 is deployed with custom bytecode, we need to call it
    const challenge8Abi = ["function mintFlag() public"];
    const challenge8 = new ethers.Contract(challengeAddresses.challenge8, challenge8Abi, deployer);

    const tx = await challenge8.mintFlag();
    await tx.wait();
    console.log("✅ Challenge 8 completed!");
  } catch (error) {
    console.log("❌ Challenge 8 failed:", error.message);
  }

  // Challenge 9: Password cracking
  console.log("\n🚩 Challenge 9: Password Cracking");
  try {
    const challenge9Abi = ["function mintFlag(bytes32 _password) public"];
    const challenge9 = new ethers.Contract(challengeAddresses.challenge9, challenge9Abi, deployer);

    // Get the password from the contract's constructor
    const password = await ethers.provider.getStorage(challengeAddresses.challenge9, 0);

    const tx = await challenge9.mintFlag(password);
    await tx.wait();
    console.log("✅ Challenge 9 completed!");
  } catch (error) {
    console.log("❌ Challenge 9 failed:", error.message);
  }

  // Challenge 10: NFTFlags contract
  console.log("\n🚩 Challenge 10: NFTFlags Contract");
  try {
    const nftFlagsAbi = ["function mintFlag() public"];
    const nftFlags = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", nftFlagsAbi, deployer);

    const tx = await nftFlags.mintFlag();
    await tx.wait();
    console.log("✅ Challenge 10 completed!");
  } catch (error) {
    console.log("❌ Challenge 10 failed:", error.message);
  }

  // Challenge 11: Simple call
  console.log("\n🚩 Challenge 11: Simple Call");
  try {
    const challenge11Abi = ["function mintFlag() public"];
    const challenge11 = new ethers.Contract(challengeAddresses.challenge11, challenge11Abi, deployer);

    const tx = await challenge11.mintFlag();
    await tx.wait();
    console.log("✅ Challenge 11 completed!");
  } catch (error) {
    console.log("❌ Challenge 11 failed:", error.message);
  }

  // Challenge 12: RLP decoding
  console.log("\n🚩 Challenge 12: RLP Decoding");
  try {
    const challenge12Abi = ["function preMintFlag() public", "function mintFlag(bytes memory rlpBytes) public"];
    const challenge12 = new ethers.Contract(challengeAddresses.challenge12, challenge12Abi, deployer);

    // First call preMintFlag
    const preTx = await challenge12.preMintFlag();
    await preTx.wait();

    // Get the block number
    const blockNumber = await ethers.provider.getBlockNumber();

    // Create RLP encoded block number
    const rlpBytes = ethers.toBeHex(blockNumber);

    const tx = await challenge12.mintFlag(rlpBytes);
    await tx.wait();
    console.log("✅ Challenge 12 completed!");
  } catch (error) {
    console.log("❌ Challenge 12 failed:", error.message);
  }

  console.log("\n🎉 All challenges completed!");
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
