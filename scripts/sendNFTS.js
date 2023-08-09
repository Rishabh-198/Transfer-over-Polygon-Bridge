const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const SingersNFTJSON = require("../artifacts/contracts/SingersNft.sol/MyNFTContract.json");

const FxERC721RootTunnel = "0xF9bc4a80464E48369303196645e876c8C7D972de";
const walletAddress = "0xaf0AFe12e31a59C845064A9ffd6AcB5f073bCb43";

async function main() {
  const contract = await hre.ethers.getContractFactory("MyNFTContract");
  const SingersNFT = await hre.ethers.getContractAt(SingersNFTJSON.abi, walletAddress);
  const fxContract = await hre.ethers.getContractAt(fxRootContractABI, FxERC721RootTunnel);

  const nftAddresses = [walletAddress];
  const tokenIds = [11, 12, 13, 14, 15]; // Add all the token IDs you want to approve and deposit

  async function approveAndDepositNFTs(fxContract, nftAddress, tokenIds) {
    for (let i = 0; i < tokenIds.length; i++) {
      const tokenId = tokenIds[i];

      const approveTx = await SingersNFT.approve(FxERC721RootTunnel, tokenId);
      await approveTx.wait();

      console.log(`Approval for tokenId ${tokenId} confirmed`);

      const depositTx = await fxContract.deposit(nftAddress, walletAddress, tokenId, "0x6556");
      await depositTx.wait();

      console.log(`Deposit for tokenId ${tokenId} confirmed`);
    }
  }

  await approveAndDepositNFTs(fxContract, walletAddress, tokenIds);

  console.log("All tokens approved and deposited");

  // Print the balance of the wallet (Note: This should be on the Mumbai network)
  const walletBalance = await hre.ethers.provider.getBalance(walletAddress);
  console.log("Balance of wallet", walletAddress, "is:", walletBalance.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
