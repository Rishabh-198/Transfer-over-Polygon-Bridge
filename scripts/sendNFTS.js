const hre = require("hardhat");

async function main() {
  console.log("Connected to network:", hre.network.name);

  const bridgeContractAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de"; 
  const myNFTContractAddress = "0x1b7295097e0aDaCe903D0c2f820A6f83594806f9"; 

  const MyNFTContract = await hre.ethers.getContractFactory("MyNFTContract");
  const myNFTContract = await MyNFTContract.attach(myNFTContractAddress);
  console.log("MyNFTContract address:", myNFTContract.address);

  // Token IDs of the NFTs to be sent
  const tokenIds = [1, 2, 3, 4, 5];
  const recipientWallet = "0xaf0AFe12e31a59C845064A9ffd6AcB5f073bCb43"; // Recipient's wallet address
  let nftCount = 0; 

  // Set a higher gas limit for the transactions
  const overrides = { gasLimit: 1000000 }; // Adjust the gas limit value as needed

  // Approve and deposit each token to the FxPortal Bridge for sending
  for (let i = 0; i < tokenIds.length; i++) {
    const tokenId = tokenIds[i];
    console.log(`Approving token transfer for token ID ${tokenId}`);
    await myNFTContract.approve(bridgeContractAddress, tokenId, overrides);

    console.log(`Transferring token with token ID ${tokenId} to the Bridge`); // FxPortal Bridge
    await myNFTContract["safeTransferFrom(address,address,uint256)"](recipientWallet, bridgeContractAddress, tokenId, overrides);

    nftCount++;
  }
  console.log("Transfer of tokens executed completely");
  console.log(`Total tokens transferred to the bridge: ${nftCount}`);

  // Print the balance of the recipient's wallet
  const recipientWalletBalance = await hre.ethers.provider.getBalance(recipientWallet);
  console.log("Balance of recipient's wallet", recipientWallet, "is:", recipientWalletBalance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
