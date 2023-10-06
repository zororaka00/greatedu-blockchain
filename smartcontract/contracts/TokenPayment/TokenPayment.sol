pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenPayment is Ownable, ReentrancyGuard {
    struct StructPurchase {
        address seller;
        string metadata;
        address contractPayment;
        uint256 amount;
        address buyer;
        bool isSold;
        uint256 epochCreated;
        uint256 epochSold;
    }

    uint256 public id;

    mapping(address => bool) public allowedPayment;
    mapping(uint256 => StructPurchase) public dataPurchase;

    event Sell(uint256 indexed id, address indexed seller, address indexed contractPayment, uint256 amount);
    event Purchase(uint256 indexed id, address indexed buyer, address indexed contractPayment, uint256 amount);

    function setAllowedPayment(address _contractPayment, bool _allowed) external onlyOwner {
        allowedPayment[_contractPayment] = _allowed;
    }

    function sell(string memory _metadata, address _contractPayment, uint256 _amount) external nonReentrant {
        address who = _msgSender();
        id++;
        uint256 newId = id;
        dataPurchase[newId] = StructPurchase(who, _metadata, _contractPayment, _amount, address(0), false, block.timestamp, 0);
        emit Sell(newId, who, _contractPayment, _amount);
    }

    function purchase(uint256 _id) external nonReentrant {
        address who = _msgSender();
        StructPurchase memory getpurchase = dataPurchase[_id];
        require(getpurchase.seller != address(0) && getpurchase.seller != who && !getpurchase.isSold, "Not available");

        IERC20(getpurchase.contractPayment).transferFrom(who, getpurchase.seller, getpurchase.amount);
        emit Purchase(_id, who, getpurchase.contractPayment, getpurchase.amount);
    }
}