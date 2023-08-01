const hre = require("hardhat");

async function main() {
  console.log("Connected to network:", hre.network.name);

  const bridgeAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
  const fxPortalAddress = "0x1234567890123456789012345678901234567890"; 
  const uniqueSingerAddress = "0x34afE2CF6DB448a1254D9c3cF4C93794671e2ed1";

  const UniqueSingerNFT = await hre.ethers.getContractFactory("MyNFTContract");
  const uniqueSingerContract = await UniqueSingerNFT.attach(uniqueSingerAddress);
  console.log("Contract address:", uniqueSingerContract.address);

  const tokenIds = [1, 2, 3, 4, 5];
  const wallet = "0xaf0AFe12e31a59C845064A9ffd6AcB5f073bCb43"; // Wallet address

  const overrides = { gasLimit: 1000000 }; // Adjust the gas limit value as needed

  // Loop through each token ID and approve, deposit, and withdraw the NFT
  for (let i = 0; i < tokenIds.length; i++) {
    const tokenId = tokenIds[i];
    console.log(`Confirm token with token ID ${tokenId} for transfer`);
    
    // Approve the FxPortal Bridge 
    await uniqueSingerContract.approve(bridgeAddress, tokenId, overrides);

    // Deposit the NFT to the FxPortal Bridge
    console.log(`Deposit token with token ID ${tokenId} to the FxPortal`); // FxPortal Bridge
    await depositToFxPortal(fxPortalAddress, uniqueSingerAddress, tokenId, overrides);

    // Withdraw the NFT from the FxPortal Bridge 
    console.log(`Withdraw token with token ID ${tokenId} from the FxPortal`); // FxPortal Bridge
    await withdrawFromFxPortal(fxPortalAddress, uniqueSingerAddress, wallet, tokenId, overrides);
  }
  
  console.log("Transfer of tokens executed completely");
}

async function depositToFxPortal(fxPortalAddress, tokenContractAddress, tokenId, overrides) {
  const FxPortal = await hre.ethers.getContractAt("FxPortal", fxPortalAddress);
  await FxPortal.depositERC721(tokenContractAddress, tokenId, overrides);
}

async function withdrawFromFxPortal(fxPortalAddress, tokenContractAddress, toAddress, tokenId, overrides) {
  const FxPortal = await hre.ethers.getContractAt("FxPortal", fxPortalAddress);
  await FxPortal.withdrawERC721(tokenContractAddress, tokenId, toAddress, overrides);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
