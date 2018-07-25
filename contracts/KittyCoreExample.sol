pragma solidity ^0.4.8;

contract KittyCoreExample {
  mapping (uint256 => address) kittyOwners;

  function setOwnerOf(uint256 _kittyId, address _owner) public returns (bool success) {
    kittyOwners[_kittyId] = _owner;
    return true;
  }

  function ownerOf(uint256 _kittyId) view public returns (address owner) {
    return kittyOwners[_kittyId];
  }
}
