pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenExample is ERC20("Token Example", "TOKEN") {
    constructor() {
        _mint(_msgSender(), 1000000e18); // Total supply is 1 Million
    }
}