import { DeployFunction } from "hardhat-deploy/types";

const deployChallenge2Solution: DeployFunction = async function (hre) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Get the Challenge2 contract address
  const challenge2 = await hre.deployments.get("Challenge2");
  const challenge2Address = challenge2.address;

  console.log("🚩 Deploying Challenge2Solution...");
  console.log("📋 Challenge2 address:", challenge2Address);

  await deploy("Challenge2Solution", {
    from: deployer,
    args: [challenge2Address],
    log: true,
    autoMine: true,
  });

  console.log("✅ Challenge2Solution deployed!");
};

export default deployChallenge2Solution;
deployChallenge2Solution.tags = ["solution2"];
