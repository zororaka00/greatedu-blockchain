pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NftExample is ERC721Enumerable {

    constructor() ERC721("NFT Example", "NFTE") { }

    function _baseURI() internal view virtual override returns (string memory) {
        return "ipfs://";
    }

    function mintTo(address _to) external {
        uint256 currentTokenId = totalSupply();
        _mint(_to, currentTokenId + 1);
    }
}