const hre = require("hardhat");
const { utils } = require("ethers");

async function main() {
  // Connect with the Mumbai Testnet
  if (hre.network.name !== "mumbai") {
    throw new Error("Please run the script on the Mumbai network.");
  }
  console.log("Connected to network:", hre.network.name);

  const fxRootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de"; // Address of the fxRoot contract
  const uniqueSingerAddress = "0xdAF0991B4335A6790C2cCdC54DbED7Cb46dAeB00"; // Address of the deployed NFT contract

  const UniqueSingerNFT = await hre.ethers.getContractFactory("MyNFTContract");
  const uniqueSingerContract = await UniqueSingerNFT.attach(uniqueSingerAddress);
  console.log("Contract address:", uniqueSingerContract.address);

  // Token IDs of the NFTs you want to send
  const tokenIds = [1, 2, 3, 4, 5];
  const wallet = "0xaf0AFe12e31a59C845064A9ffd6AcB5f073bCb43"; // Wallet address
  let nftCount = 0; // Store the count of NFTs owned by the wallet

  // Get a signer
  const signer = await hre.ethers.provider.getSigner();

  // Set a higher gas limit for the transactions
  const overrides = { gasLimit: 2000000, from: signer._address }; // Include the signer's address

  // Define the depositToFxRoot function
  async function depositToFxRoot(fxRootAddress, tokenContractAddress, tokenId, toAddress, signer, overrides) {
    const FxRoot = new hre.ethers.Contract(fxRootAddress, [
      "function depositERC721(address _token, uint256 _tokenId, address _to) external",
    ], signer);
    await FxRoot.depositERC721(tokenContractAddress, tokenId, toAddress, overrides);
  }

  // Approve and deposit each token to the fxRoot contract for sending
  for (let i = 0; i < tokenIds.length; i++) {
    const tokenId = tokenIds[i];
    console.log(`Confirm token with token ID ${tokenId} for transfer`);
    await uniqueSingerContract.approve(fxRootAddress, tokenId, overrides);

    console.log(`Deposit token with token ID ${tokenId} to the fxRoot`); // fxRoot contract
    await depositToFxRoot(fxRootAddress, uniqueSingerContract.address, tokenId, wallet, signer, overrides);

    // Increment the NFT count for each successful transfer
    nftCount++;
  }
  console.log("Transfer of tokens executed completely");
  console.log(`Total tokens owned by the wallet (${wallet}):`, nftCount);

  // Print the balance of the wallet (Note: This should be on the Mumbai network)
  const walletBalance = await hre.ethers.provider.getBalance(wallet);
  console.log("Balance of wallet", wallet, "is:", walletBalance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });