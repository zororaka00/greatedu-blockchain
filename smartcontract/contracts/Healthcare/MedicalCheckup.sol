pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MedicalCheckup is Ownable {
    struct DataCheckup {
        string identityHash;
        bool isHealthy;
        uint256 createdDate;
    }

    uint256 public id;
    mapping(uint256 => DataCheckup) public dataCheckup;

    event NewDataCheckup(uint256 indexed id, string identityHash, bool isHealthy, uint256 createdDate);

    function newDataCheckup(string memory _identityHash, bool _isHealthy) external onlyOwner {
        id++;
        uint256 timestamp = block.timestamp;
        dataCheckup[id] = DataCheckup(_identityHash, _isHealthy, timestamp);

        emit NewDataCheckup(id, _identityHash, _isHealthy, timestamp);
    }
}