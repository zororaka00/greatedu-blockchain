pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OzERC20Custom is Ownable, ERC20 {
    uint256 public constant MAX_SUPPLY = 1000000000e18;
    
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        _mint(_msgSender(), 1000000e18); // Total supply is 1 Million
    }

    function mint(address _to, uint256 _amount) external onlyOwner {
        require(totalSupply() + _amount <= MAX_SUPPLY, "Limit max supply");

        _mint(_to, _amount);
    }

    function burn(uint256 _amount) external {
        _burn(_msgSender(), _amount);
    }

    function transferBatch(address[] memory _to, uint256[] memory _amount) external {
        require(_to.length == _amount.length, "Different length");

        address from = _msgSender();
        for (uint256 i = 0; i < _to.length; i++) {
            _transfer(from, _to[i], _amount[i]);
        }
    }
}