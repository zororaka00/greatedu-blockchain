import { expect } from "chai";
import { ethers } from "hardhat";

describe("Week 4", () => {
  let accounts: any;
  let instance_basic_erc20: any;
  let instance_oz_erc20: any;
  let instance_oz_erc20_custom: any;

  before(async function() {
    accounts = await ethers.getSigners();
    
    instance_basic_erc20 = await (await ethers.getContractFactory("BasicERC20")).deploy();
    instance_oz_erc20 = await (await ethers.getContractFactory("OzERC20")).deploy();
    instance_oz_erc20_custom = await (await ethers.getContractFactory("OzERC20Custom")).deploy("OZ Custom Token", "OZCT");
  });

  it("1. Get Info Token", async () => {
    // BasicERC20
    expect(await instance_basic_erc20.name()).to.equal("Basic Token");
    expect(await instance_basic_erc20.symbol()).to.equal("BT");
    
    // OzERC20
    expect(await instance_oz_erc20.name()).to.equal("OZ Token");
    expect(await instance_oz_erc20.symbol()).to.equal("OZT");
    
    // OzERC20Custom
    expect(await instance_oz_erc20_custom.name()).to.equal("OZ Custom Token");
    expect(await instance_oz_erc20_custom.symbol()).to.equal("OZCT");
  });

  it("2. Mint & Burn", async () => {
    // Mint
    expect(await instance_oz_erc20_custom.balanceOf(accounts[0].address)).to.equal(ethers.parseEther('1000000'));
    expect(await instance_oz_erc20_custom.mint(accounts[0].address, ethers.parseEther('1000000')))
    .to.emit(instance_oz_erc20_custom, 'Transfer');
    expect(await instance_oz_erc20_custom.balanceOf(accounts[0].address)).to.equal(ethers.parseEther('2000000'));

    // Burn
    expect(await instance_oz_erc20_custom.burn(ethers.parseEther('1500000')))
    .to.emit(instance_oz_erc20_custom, 'Transfer');
    expect(await instance_oz_erc20_custom.balanceOf(accounts[0].address)).to.equal(ethers.parseEther('500000'));
  });

  it("2. Transfer Batch", async () => {
    expect(await instance_oz_erc20_custom.transferBatch(
      [accounts[1].address, accounts[2].address],
      [ethers.parseEther('10'), ethers.parseEther('20')]
    )).to.emit(instance_oz_erc20_custom, 'Transfer');
    expect(await instance_oz_erc20_custom.balanceOf(accounts[1].address)).to.equal(ethers.parseEther('10'));
    expect(await instance_oz_erc20_custom.balanceOf(accounts[2].address)).to.equal(ethers.parseEther('20'));
  });
});