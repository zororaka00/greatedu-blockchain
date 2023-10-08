import { ethers } from "hardhat";

async function main() {
  const instance_identity = await ethers.deployContract("Identity");
  await instance_identity.waitForDeployment();
  const addressIdentity = await instance_identity.getAddress();
  console.log(`Identity: ${addressIdentity}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
