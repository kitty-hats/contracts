/*
You should inherit from StandardToken or, for a token like you would want to
deploy in something like Mist, see HumanStandardToken.sol.
(This implements ONLY the standard functions and NOTHING else.
If you deploy this, you won't have anything useful.)

Implements ERC 20 Token standard: https://github.com/ethereum/EIPs/issues/20
.*/
pragma solidity ^0.4.8;

import "./Token.sol";


/**
 * @title KittyCore contract interface
 * https://ethereum.stackexchange.com/a/24721/25445
 * https://etherscan.io/address/0x06012c8cf97bead5deae237070f9587f8e7a266d#code
 */
contract KittyCore {
  function ownerOf(uint256 _tokenId) external view returns (address owner);
}


/**
 * @title KittyItemToken is an ERC20 token with some extra functions for applying items to kitties
 */
contract KittyItemToken is Token {
  uint256 constant MAX_UINT256 = 2**256 - 1;
  string public symbol = "";
  string public name = "";
  string public ipfsHash = "";
  uint8 public constant decimals = 0;
  address public owner;
  address public canApply;
  mapping (address => uint256) balances;
  mapping (address => mapping (address => uint256)) allowed;
  mapping (uint256 => bool) appliedToKittyMapping;
  KittyCore _kittyCore;

  // Events
  event Apply(uint256 kittyId);
  event Remove(uint256 kittyId);

  /**
   * @dev KittyItemToken constructor
   */
  function KittyItemToken() public {
    owner = msg.sender;
  }

  /** 
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to. 
   */  
  function transferOwnership(address newOwner) public {
    require(msg.sender == owner);
    if (newOwner != address(0)) {
      owner = newOwner;
    }   
  }

  /**
   * @dev sets the KittyCore contract address - https://ethereum.stackexchange.com/a/24721/25445
   * @param _addr KittyCore contract address
   */
  function setKittyCoreAddress(address _addr) public {
    require(msg.sender == owner);
    _kittyCore = KittyCore(_addr);
  }

  /**
   * @dev Sets the address other than the token holder that is allowed to apply items to kitties.
   *      This is always the KittyItemMarket address
   * @param _canApply address that can apply items to any Kitty, regardless of ownership
   */
  function setCanApplyAddress(address _canApply) public {
    require(msg.sender == owner);
    canApply = _canApply;
  }

  /**
   * @dev Sets up the token total supply, symbol, name. This is normally done through the constructor but
   *      an old version of Truffle didn't have the ability to do this. Dev made a bad assumption that Truffle 4.0 still
   *      lacked this feature. Ran out of time to fix.
   * @param _totalSupply Total supply of the token
   * @param _symbol Symbol of the token
   * @param _name Name of the token
   */
  function setupToken(uint256 _totalSupply, string _symbol, string _name) public {
    // only the owner can modify the contract attributes
    require(msg.sender == owner);

    // make sure the contract hasn't already been modified
    // https://ethereum.stackexchange.com/a/11754/25445
    require(totalSupply == 0);
    require(keccak256(symbol) == keccak256(""));
    require(keccak256(name) == keccak256(""));

    // make sure the contract hasn't already been modified
    require(_totalSupply > 0);
    require(keccak256(_symbol) != keccak256(""));
    require(keccak256(_name) != keccak256(""));

    totalSupply = _totalSupply;
    symbol = _symbol;
    name = _name;
    balances[owner] = _totalSupply;
  }

  /**
   * @dev Updates the IPFS hash for the token art
   * @param _ipfsHash IPFS Hash for the token art
   */
  function updateIpfsHash(string _ipfsHash) public {
    require(msg.sender == owner);
    ipfsHash = _ipfsHash;
  }

  /**
   * @dev Basic ERC20 transfer
   */
  function transfer(address _to, uint256 _value) public returns (bool success) {
    //Default assumes totalSupply can't be over max (2^256 - 1).
    //If your token leaves out totalSupply and can issue more tokens as time goes on, you need to check if it doesn't wrap.
    //Replace the if with this one instead.
    //require(balances[msg.sender] >= _value && balances[_to] + _value > balances[_to]);
    require(balances[msg.sender] >= _value);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    Transfer(msg.sender, _to, _value);
    return true;
  }

  /**
   * @dev Basic ERC20 transferFrom
   */
  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
    //same as above. Replace this line with the following if you want to protect against wrapping uints.
    //require(balances[_from] >= _value && allowed[_from][msg.sender] >= _value && balances[_to] + _value > balances[_to]);
    uint256 allowance = allowed[_from][msg.sender];
    require(balances[_from] >= _value && allowance >= _value);
    balances[_to] += _value;
    balances[_from] -= _value;
    if (allowance < MAX_UINT256) {
      allowed[_from][msg.sender] -= _value;
    }
    Transfer(_from, _to, _value);
    return true;
  }

  /**
   * @dev Basic ERC20 balanceOf
   */
  function balanceOf(address _owner) view public returns (uint256) {
    return balances[_owner];
  }

  /**
   * @dev Basic ERC20 approve
   */
  function approve(address _spender, uint256 _value) public returns (bool success) {
    allowed[msg.sender][_spender] = _value;
    Approval(msg.sender, _spender, _value);
    return true;
  }

  /**
   * @dev Basic ERC20 allowance
   */
  function allowance(address _owner, address _spender) view public returns (uint256) {
    return allowed[_owner][_spender];
  }

  /**
   * @dev Applies item to a kitty and burns token
   * @param _kittyId KittyId to apply item to
   */
  function applyItem(uint256 _kittyId) public {
    require(balances[msg.sender] > 0);
    require(msg.sender == _kittyCore.ownerOf(_kittyId));
    require(appliedToKittyMapping[_kittyId] == false);  // can't re-apply
    appliedToKittyMapping[_kittyId] = true;
    balances[msg.sender] -= 1;
    // emit events
    Apply(_kittyId);
  }

  /**
   * @dev Burns one token from ender and applies item to KittyId
   * @param _receiveAddress address that will "receive" a token
   * @param _kittyId KittyId to apply item to
   */
  function transferAndApply(address _receiveAddress, uint256 _kittyId) public {
    // NOTE - there is no transfer of item that takes place.
    // Only the `owner` and the `canApply` address can use this function.
    require(msg.sender == canApply || msg.sender == owner);  // owner and canApply address can apply a sticker
    require(balances[msg.sender] > 0);  // market contract or owner must own > 1 sticker
    require(_receiveAddress == _kittyCore.ownerOf(_kittyId));  // make sure the _receiveAddress owns the _kittyId
    require(appliedToKittyMapping[_kittyId] == false);  // can't re-apply
    appliedToKittyMapping[_kittyId] = true;
    balances[msg.sender] -= 1;
    // emit events
    Apply(_kittyId);
  }

  /**
   * @dev Removes an item from KittyId
   * @param _kittyId KittyId to remove item from
   */
  function removeItem(uint256 _kittyId) public {
    require(msg.sender == _kittyCore.ownerOf(_kittyId));
    appliedToKittyMapping[_kittyId] = false;
    //emit events
    Remove(_kittyId);
  }

  /**
   * @dev Return whether or not the item is applied to KittyId
   * @param _kittyId KittyId to check if item is applied to
   */
  function applied(uint256 _kittyId) view public returns (bool) {
    return appliedToKittyMapping[_kittyId];
  }
}
