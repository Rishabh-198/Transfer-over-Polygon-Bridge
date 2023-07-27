// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFTContract is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    string private _description;
    address private _owner;

    constructor(string memory name, string memory symbol, string memory description) ERC721(name, symbol) {
        _description = description;
        _owner = msg.sender; // Set contract deployer as the owner
    }

    function mintNFT(string memory tokenURI) public returns (uint256) {
        require(msg.sender == _owner, "Only the contract owner can mint NFTs");
        
        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        return newTokenId;
    }

    function promptDescription() public view returns (string memory) {
        return _description;
    }
}
