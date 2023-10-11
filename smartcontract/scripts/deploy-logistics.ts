import { ethers } from "hardhat";

async function main() {
  const instance_inventory_management = await ethers.deployContract("InventoryManagement");
  await instance_inventory_management.waitForDeployment();
  const addressInventoryManagement = await instance_inventory_management.getAddress();
  console.log(`Inventory Management: ${addressInventoryManagement}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
