import { ethers } from "hardhat";

async function main() {
  const instance_medical_checkup = await ethers.deployContract("MedicalCheckup");
  await instance_medical_checkup.waitForDeployment();
  const addressMedicalCheckup = await instance_medical_checkup.getAddress();
  console.log(`Medical Checkup: ${addressMedicalCheckup}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
