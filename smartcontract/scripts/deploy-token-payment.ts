import { ethers } from "hardhat";

async function main() {
  const instance_token_example = await ethers.deployContract("TokenExample");
  await instance_token_example.waitForDeployment();
  const addressTokenExample = await instance_token_example.getAddress();
  console.log(`Token Example: ${addressTokenExample}`);
  
  const instance_token_payment = await ethers.deployContract("TokenPayment");
  await instance_token_payment.waitForDeployment();
  console.log(`Token Payment: ${await instance_token_payment.getAddress()}`);
  const setAllowedTokenPayment = await instance_token_payment.setAllowedPayment(addressTokenExample, true);
  console.log('Set Allowed Token Payment: ', setAllowedTokenPayment.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
