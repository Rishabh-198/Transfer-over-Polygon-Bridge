const hre = require("hardhat");

async function main() {
  // Connect to the Goerli Ethereum Testnet
  const network = hre.network.name;
  console.log("Connected to network:", network);

  // Retrieve the deployed contract instance
  const MyNFTContract = await hre.ethers.getContractFactory("MyNFTContract");
  const contractAddress = "0xdAF0991B4335A6790C2cCdC54DbED7Cb46dAeB00"; 
  const myNFTContract = await MyNFTContract.attach(contractAddress);
  console.log("Contract address:", myNFTContract.address);

  // Define the IPFS URLs for the NFTs
  const ipfsUrls = [
    "https://gateway.pinata.cloud/ipfs/QmXur7wVLsvvciTTgwyF35jJfFjibqCj9CqFbQkV2fhno6",
    "https://gateway.pinata.cloud/ipfs/QmUD89DFRsc8jPgoGZTuzhGQQfip3DFGsjV8H6E1iBr56r",
    "https://gateway.pinata.cloud/ipfs/QmQ5YDL84TegDX5YRiKvJr7vG3sY53FPXL5skQ5TYnsV2v",
    "https://gateway.pinata.cloud/ipfs/QmUAiM7XtrnXjYGLc5SzYBRMdw8LnoUzA7z9SH53cBjGmy",
    "https://gateway.pinata.cloud/ipfs/QmQV2Pf1Qs54whtNjJXePd2c2h5aC5zkWE2UQ81u6v2Xes"
  ];

  // Batch mint all NFTs
  for (let i = 0; i < ipfsUrls.length; i++) {
    const tx = await myNFTContract.mintNFT(ipfsUrls[i]);
    const receipt = await tx.wait();
    const tokenId = receipt.events[0].args.tokenId;
    console.log(`Minted NFT with token ID ${tokenId}`);
  }
}

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
