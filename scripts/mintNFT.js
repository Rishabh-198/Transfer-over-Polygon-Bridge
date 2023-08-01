const hre = require("hardhat");

// Define the main function as an async function separately
async function main() {
  // Connect to the Goerli Ethereum Testnet
  const network = hre.network.name;
  console.log("Connected to network:", network);

  // Retrieve the deployed contract instance
  const MyNFTContract = await hre.ethers.getContractFactory("SingersNft");
  const contractAddress = "0x34afE2CF6DB448a1254D9c3cF4C93794671e2ed1";
  const myNFTContract = await MyNFTContract.attach(contractAddress);
  console.log("Contract address:", contractAddress);

  // Define the IPFS URLs for the NFTs
  const ipfsUrls = [
    "https://gateway.pinata.cloud/ipfs/QmXur7wVLsvvciTTgwyF35jJfFjibqCj9CqFbQkV2fhno6",
    "https://gateway.pinata.cloud/ipfs/QmUD89DFRsc8jPgoGZTuzhGQQfip3DFGsjV8H6E1iBr56r",
    "https://gateway.pinata.cloud/ipfs/QmQ5YDL84TegDX5YRiKvJr7vG3sY53FPXL5skQ5TYnsV2v",
    "https://gateway.pinata.cloud/ipfs/QmUAiM7XtrnXjYGLc5SzYBRMdw8LnoUzA7z9SH53cBjGmy",
    "https://gateway.pinata.cloud/ipfs/QmQV2Pf1Qs54whtNjJXePd2c2h5aC5zkWE2UQ81u6v2Xes"
  ];

  // Batch mint all NFTs
  const signer = await hre.ethers.provider.getSigner();
  const contractOwner = await myNFTContract.owner();
  for (let i = 0; i < ipfsUrls.length; i++) {
    // Check if the caller is the contract owner before minting
    if (await signer.getAddress() === contractOwner) {
      const transaction = await myNFTContract.mintNFT(ipfsUrls[i]);
      const receipt = await transaction.wait();
      const tokenId = receipt.events[0].args.tokenId;
      console.log(`Minted NFT with token ID ${tokenId}`);
    } else {
      console.log("Only the contract owner can mint NFTs.");
    }
  }
}

// Immediately invoke the async main function
(async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
