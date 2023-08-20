import { ethers } from "hardhat";

async function main() {
  let instance_basic_erc20 = await (await ethers.getContractFactory("BasicERC20")).deploy();
  console.log(`Address BasicERC20 Contract: ${await instance_basic_erc20.getAddress()}`);
  
  let instance_oz_erc20 = await (await ethers.getContractFactory("OzERC20")).deploy();
  console.log(`Address OzERC20 Contract: ${await instance_oz_erc20.getAddress()}`);
  
  let instance_oz_erc20_custom = await (await ethers.getContractFactory("OzERC20Custom")).deploy("OZ Custom Token", "OZCT");
  console.log(`Address OzERC20 Contract: ${await instance_oz_erc20_custom.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
