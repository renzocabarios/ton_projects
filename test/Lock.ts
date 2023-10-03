import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {
  async function deployFixture() {
    const provider = ethers.provider;
    const [owner, account_1] = await ethers.getSigners();
    const contract = await ethers.deployContract("Lock");
    await contract.waitForDeployment();
    return { provider, contract, owner, account_1 };
  }

  it("Should Deploy", async function () {
    const { contract } = await loadFixture(deployFixture);
    console.log(`deployed to ${contract.target}`);
  });

  it("Is deployer owner", async function () {
    const { contract, owner } = await loadFixture(deployFixture);
    expect(owner.address == (await contract.owner()));
  });

  it("Can mint", async function () {
    const { contract, account_1 } = await loadFixture(deployFixture);
    const connected = contract.connect(account_1);
    await connected.mint("");
    const tx = await connected.hasAccountMinted(account_1.address);
    expect(tx);
  });

  it("Should not be able to more then once", async function () {
    const { contract, account_1 } = await loadFixture(deployFixture);
    const connected = contract.connect(account_1);
    await connected.mint("");
    await expect(connected.mint("")).to.be.revertedWith(
      "Wallet has already minted"
    );
  });

  it("Should not be able to mint when balance is not enough", async function () {});
});
