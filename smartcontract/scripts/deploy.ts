import { ethers } from "hardhat";

async function main() {
  const instance_basic_erc20 = await ethers.deployContract("BasicERC20");
  await instance_basic_erc20.waitForDeployment();
  console.log(`Address BasicERC20 Contract: ${await instance_basic_erc20.getAddress()}`);
  
  const instance_oz_erc20 = await ethers.deployContract("OzERC20");
  await instance_oz_erc20.waitForDeployment();
  console.log(`Address OzERC20 Contract: ${await instance_oz_erc20.getAddress()}`);
  
  const instance_oz_erc20_custom = await ethers.deployContract("OzERC20Custom", ["OZ Custom Token", "OZCT"]);
  await instance_oz_erc20_custom.waitForDeployment();
  console.log(`Address OzERC20Custom Contract: ${await instance_oz_erc20_custom.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
