pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";

contract Identity is Context {
    mapping(address => string) public dataIdentity;

    event NewDataIdentity(address indexed account, string profileName);

    function newDataIdentity(string memory _profileName) external {
        address who = _msgSender();
        dataIdentity[who] = _profileName;

        emit NewDataIdentity(who, _profileName);
    }
}