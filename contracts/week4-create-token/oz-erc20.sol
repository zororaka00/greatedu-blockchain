pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OzERC20 is ERC20("OZ Token", "OZT") {
    constructor() {
        _mint(_msgSender(), 1000000e18); // Total supply is 1 Million
    }
}