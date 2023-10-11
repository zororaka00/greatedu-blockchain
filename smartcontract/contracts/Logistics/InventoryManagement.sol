pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract InventoryManagement is Ownable {
    mapping(string => uint256) public inventory;

    event StockUpdated(string itemName, uint256 quantity);

    function addStock(string memory _itemName, uint256 _quantity) public onlyOwner {
        inventory[_itemName] += _quantity;
        emit StockUpdated(_itemName, inventory[_itemName]);
    }

    function reduceStock(string memory _itemName, uint256 _quantity) public onlyOwner {
        require(inventory[_itemName] >= _quantity, "Insufficient stock");
        inventory[_itemName] -= _quantity;
        emit StockUpdated(_itemName, inventory[_itemName]);
    }
}
