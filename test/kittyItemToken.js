// Specifically request an abstraction for MetaCoin
var ItemiWatch = artifacts.require("ItemiWatch.sol");
var KittyCoreExample = artifacts.require("KittyCoreExample.sol");
var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
const artistAddress = web3.eth.accounts[9];
const oneEtherInWei = 1000000000000000000;

async function testSetupContract(kittyCoreInstance, itemAppleWatchInstance) {
  var _, _ = await itemAppleWatchInstance.setupToken(300, "AW", "iWatch");
  var _, _ = await itemAppleWatchInstance.setKittyCoreAddress(kittyCoreInstance.address);
  var err, totalSupply = await itemAppleWatchInstance.totalSupply();
  assert.equal(totalSupply, 300, "totalSupply was not 300");
  return;
}

async function testTransferItemBetweenAccounts(contract) {
  var err, owner = await contract.owner();
  var err, balance = await contract.balanceOf(owner);
  await contract.transfer(web3.eth.accounts[1], 10);
  var err, balance = await contract.balanceOf(web3.eth.accounts[1]);
  assert.equal(balance, 10, "Balance of Account[1] is not 10");
  var err, balance = await contract.balanceOf(web3.eth.accounts[0]);
  assert.equal(balance, 290, "Balance of Account[0] is not 290");
  return;
}

async function testApplyItem(kittyCoreInstance, itemAppleWatchInstance) {
  // set the owner of kittyId 235 to accounts[1]
  await kittyCoreInstance.setOwnerOf(235, web3.eth.accounts[1]);
  // get the current balance
  var err, balance = await itemAppleWatchInstance.balanceOf(web3.eth.accounts[1]);
  var newBalance = balance - 1;  // this is what the new balance will be after the item is applied
  var resultTx = await itemAppleWatchInstance.applyItem(235, {from: web3.eth.accounts[1]});
  var err, balance = await itemAppleWatchInstance.balanceOf(web3.eth.accounts[1]);
  assert.equal(newBalance, balance, "Balance of Account[1] is not 9");
  var err, applied = await itemAppleWatchInstance.applied(235);
  // we don't allow the same item to be applied twice
  // the result of this will be a VM exception (revert) because the require is not met on the contract
  try {
    var resultTx = await itemAppleWatchInstance.applyItem(235, {from: web3.eth.accounts[1]});
    assert.equal(true, false);  // we shouldn't get here
  } catch (error) {
    var err, balance = await itemAppleWatchInstance.balanceOf(web3.eth.accounts[1]);
    assert.equal(newBalance, balance, "Balance of Account[1] is not 9");
  }
  return;
}

async function testRemoveItem(kittyCoreInstance, itemAppleWatchInstance) {
  // make sure the item is currently applied
  var err, applied = await itemAppleWatchInstance.applied(235);
  assert.equal(applied, true);
  // remove the item
  var resultTx = await itemAppleWatchInstance.removeItem(235, {from: web3.eth.accounts[1]});
  var err, applied = await itemAppleWatchInstance.applied(235);
  assert.equal(applied, false);
  return;
}

async function testApplyItemNoKittyNoBalance(kittyCoreInstance, itemAppleWatchInstance) {
  // make sure the item is currently applied
  var err, applied = await itemAppleWatchInstance.applied(23);
  assert.equal(applied, false);
  // try to apply an item with no balance and not owning the kitty
  try {
    var resultTx = await itemAppleWatchInstance.removeItem(23, {from: web3.eth.accounts[2]});
    assert.equal(true, false);  // we should never get here
  } catch (error) {
    var err, applied = await itemAppleWatchInstance.applied(235);
    assert.equal(applied, false);
  }
  return;
}

async function testApplyItemNoKitty(kittyCoreInstance, itemAppleWatchInstance) {
  // make sure the item is currently applied
  var err, applied = await itemAppleWatchInstance.applied(23);
  assert.equal(applied, false);
  await itemAppleWatchInstance.transfer(web3.eth.accounts[2], 1);
  var err, balance = await itemAppleWatchInstance.balanceOf(web3.eth.accounts[2]);
  assert.equal(balance, 1);
  // try to apply an item with no balance and not owning the kitty
  try {
    var resultTx = await itemAppleWatchInstance.removeItem(23, {from: web3.eth.accounts[2]});
    assert.equal(true, false);  // we should never get here
  } catch (error) {
    var err, applied = await itemAppleWatchInstance.applied(235);
    assert.equal(applied, false);
  }
  return;
}

async function testApplyItemNoBalance(kittyCoreInstance, itemAppleWatchInstance) {
  // set accounts[2] as owner of kittyId 23
  await kittyCoreInstance.setOwnerOf(23, web3.eth.accounts[2]);
  var err, owner = await kittyCoreInstance.applied(23);
  assert.equal(owner, web3.eth.accounts[2]);
  // make sure the item is not currently applied
  var err, applied = await itemAppleWatchInstance.applied(23);
  assert.equal(applied, false);
  // send entire balane to another account
  var err, balance = await itemAppleWatchInstance.balanceOf(web3.eth.accounts[2]);
  await itemAppleWatchInstance.transfer(web3.eth.accounts[0], balance, {from: web3.eth.accounts[2]});
  // make sure balance is 0
  var err, balance = await itemAppleWatchInstance.balanceOf(web3.eth.accounts[2]);
  assert.equal(0, balance);
  // try to apply an item with no balance
  try {
    var resultTx = await itemAppleWatchInstance.removeItem(23, {from: web3.eth.accounts[2]});
    assert.equal(true, false);  // we should never get here
  } catch (error) {
    var err, applied = await itemAppleWatchInstance.applied(23);
    assert.equal(applied, false);
  }
  return;
}

async function testSetupMarket(kittyCoreInstance, itemAppleWatchInstance, kittyItemMarketInstance) {
  // allow kittyItemMarket to apply items on behalf of purchasers
  await itemAppleWatchInstance.setCanApplyAddress(kittyItemMarketInstance.address);

  // transfer all supply to kittyItemMarket and setup new item
  await itemAppleWatchInstance.transfer(kittyItemMarketInstance.address, 200);
  var err, balance = await itemAppleWatchInstance.balanceOf(kittyItemMarketInstance.address);
  assert.equal(balance, 200);

  // setup KittyItemMarket w/ new item iWatch
  await kittyItemMarketInstance.addItem("iWatch", itemAppleWatchInstance.address, oneEtherInWei/100, artistAddress, 2500);
  var err, item = await kittyItemMarketInstance.getItem("iWatch");
  assert.equal(item[0], itemAppleWatchInstance.address);
  assert.equal(item[1], oneEtherInWei/100);
  assert.equal(item[2], artistAddress);
  assert.equal(item[3], 2500);
  assert.equal(item[4], 0);
  return;
}

async function testBuyItem(kittyCoreInstance, itemAppleWatchInstance, kittyItemMarketInstance) {
  // eth.accounts[3] is going to buy an item from kittyItemMarket
  await kittyItemMarketInstance.buyItem("iWatch", 1, {from: web3.eth.accounts[3], value: oneEtherInWei/100});
  var err, balance = await itemAppleWatchInstance.balanceOf(web3.eth.accounts[3]);
  assert.equal(balance, 1);
  var err, balance = await itemAppleWatchInstance.balanceOf(kittyItemMarketInstance.address);
  assert.equal(balance, 199);
  
  // eth.accounts[4] is going to buy 2 items from kittyItemMarket
  await kittyItemMarketInstance.buyItem("iWatch", 2, {from: web3.eth.accounts[4], value: (oneEtherInWei/100)*2});
  var err, balance = await itemAppleWatchInstance.balanceOf(web3.eth.accounts[4]);
  assert.equal(balance, 2);
  var err, balance = await itemAppleWatchInstance.balanceOf(kittyItemMarketInstance.address);
  assert.equal(balance, 197);
  return;
}

async function testBuyAndApply(kittyCoreInstance, itemAppleWatchInstance, kittyItemMarketInstance) {
  // set accounts[5] as owner of kittyId 100
  await kittyCoreInstance.setOwnerOf(100, web3.eth.accounts[5]);
  var err, balance = await itemAppleWatchInstance.balanceOf(web3.eth.accounts[5]);
  assert.equal(balance, 0);

  await kittyItemMarketInstance.buyItemAndApply("iWatch", 100, {from: web3.eth.accounts[5], value: oneEtherInWei/100});
  var err, balance = await itemAppleWatchInstance.balanceOf(web3.eth.accounts[5]);
  assert.equal(balance, 0);
  var err, balance = await itemAppleWatchInstance.balanceOf(kittyItemMarketInstance.address);
  assert.equal(balance, 196);
  var err, applied = await itemAppleWatchInstance.applied(100);
  assert.equal(true, applied);
  return;
}

async function testBuyAndApplyOnNotOwnedKitty(kittyCoreInstance, itemAppleWatchInstance, kittyItemMarketInstance) {
  try {
    await kittyItemMarketInstance.buyItemAndApply("iWatch", 101, {from: web3.eth.accounts[6], value: oneEtherInWei/100});
    assert.equal(true, false);  // should never get here
  } catch (error ) {
    assert.equal(true, true);
  }
  return;
}

async function testTransferFunds(kittyCoreInstance, itemAppleWatchInstance, kittyItemMarketInstance) {
  var err, contractBalance = web3.eth.getBalance(kittyItemMarketInstance.address);
  var err, item = await kittyItemMarketInstance.getItem("iWatch");
  var err, owner = await kittyItemMarketInstance.owner()
  var artistAddress = item[2]
  var split = item[3];
  var totalFunds = item[4];
  var artistFunds = parseInt(totalFunds) * parseInt(split) / 10000;
  var ownerFunds = totalFunds - artistFunds;
  var err, ownerBalance = web3.eth.getBalance(owner);
  var err, artistBalance = web3.eth.getBalance(artistAddress);
  await kittyItemMarketInstance.splitFunds("iWatch");
  var err, newOwnerBalance = web3.eth.getBalance(owner);
  var err, newArtistBalance = web3.eth.getBalance(artistAddress);
  var err, contractBalance = web3.eth.getBalance(kittyItemMarketInstance.address);
  assert.equal(newArtistBalance, parseInt(artistBalance) +  parseInt(artistFunds));
  return;
}

async function testPausedMarket(kittyCoreInstance, itemAppleWatchInstance, kittyItemMarketInstance) {
  var err, success = await kittyItemMarketInstance.setPaused(true);
  await kittyCoreInstance.setOwnerOf(111, web3.eth.accounts[6]);
  try {
    await kittyItemMarketInstance.buyItemAndApply("iWatch", 111, {from: web3.eth.accounts[6], value: oneEtherInWei/100});
    assert.equal(false, true);  // we should never get here
  } catch (error) {
    assert.equal(true, true);
  }
  try {
    await kittyItemMarketInstance.buyItem("iWatch", 1, {from: web3.eth.accounts[3], value: oneEtherInWei/100});
    assert.equal(false, true);  // we should never get here
  } catch (error) {
    assert.equal(true, true);
  }
  var err, success = await kittyItemMarketInstance.setPaused(false);
  await kittyItemMarketInstance.buyItemAndApply("iWatch", 111, {from: web3.eth.accounts[6], value: oneEtherInWei/100});
  await kittyItemMarketInstance.buyItem("iWatch", 1, {from: web3.eth.accounts[3], value: oneEtherInWei/100});
  return;
}

async function testModifyItem(kittyCoreInstance, itemAppleWatchInstance, kittyItemMarketInstance) {
  var err, response = await kittyItemMarketInstance.modifyItem("iWatch", itemAppleWatchInstance.address, oneEtherInWei/10, web3.eth.accounts[7], 3500);
  var err, item = await kittyItemMarketInstance.getItem("iWatch");
  assert.equal(item[0], itemAppleWatchInstance.address);
  assert.equal(item[1], oneEtherInWei/10);
  assert.equal(item[2], web3.eth.accounts[7]);
  assert.equal(item[3], 3500);
  var err, response = await kittyItemMarketInstance.modifyItem("iWatch", itemAppleWatchInstance.address, oneEtherInWei/100, artistAddress, 2500);
  var err, item = await kittyItemMarketInstance.getItem("iWatch");
  assert.equal(item[0], itemAppleWatchInstance.address);
  assert.equal(item[1], oneEtherInWei/100);
  assert.equal(item[2], artistAddress);
  assert.equal(item[3], 2500);
}

async function testOnlyOwnerCanModifyItem(kittyCoreInstance, itemAppleWatchInstance, kittyItemMarketInstance) {
  try {
    var err, response = await kittyItemMarketInstance.modifyItem("iWatch", itemAppleWatchInstance.address, oneEtherInWei/10, web3.eth.accounts[7], 3500, {from: web3.eth.accounts[7]});
    assert.equal(false, true); // we shouldn't get here
  } catch (error) {
    assert.equal(true, true);
  }
}

async function testChangeOwnerOfKittyMarket(kittyCoreInstance, itemAppleWatchInstance, kittyItemMarketInstance) {
  await kittyItemMarketInstance.transferOwnership(web3.eth.accounts[1]);
  var err, owner = await kittyItemMarketInstance.owner()
  assert.equal(web3.eth.accounts[1], owner);
  await kittyItemMarketInstance.transferOwnership(web3.eth.accounts[0], {from: web3.eth.accounts[1]});
}

async function testTransferredTokensToOwner(kittyCoreInstance, itemAppleWatchInstance, kittyItemMarketInstance) {
  var err, currentOwnerBalance = await itemAppleWatchInstance.balanceOf(web3.eth.accounts[0]);
  var err, marketBalance = await itemAppleWatchInstance.balanceOf(kittyItemMarketInstance.address);
  await kittyItemMarketInstance.returnTokensToOwner("iWatch");
  var err, newOwnerBalance = await itemAppleWatchInstance.balanceOf(web3.eth.accounts[0]);
  assert.equal(newOwnerBalance, parseInt(currentOwnerBalance) + parseInt(marketBalance))
}

contract('ItemiWatch', async function(accounts) {
  // this test sets up account[0] with a balance of 300
  it("Should allow the owner to setup the contract", function() {
    return KittyCoreExample.deployed().then(async function(kittyCoreInstance) {
      return ItemiWatch.deployed().then(async function(itemAppleWatchInstance) {
        var results = await testSetupContract(kittyCoreInstance, itemAppleWatchInstance);
      });
    });
  });
  // this test transfers 10 ItemiWatch to account[1]
  // account[0] balance: 290
  // account[1] balance: 10
  it("Should allow transfers of items between addresses", function() {
    return ItemiWatch.deployed().then(async function(instance) {
      var results = await testTransferItemBetweenAccounts(instance);
    });
  });
  // this test applies a ItemiWatch to kittyId 235
  // account[0] balance: 290
  // account[1] balance: 9
  // kittyOwner[235] == accounts[1]
  // appliedToKittyMapping[235] == true
  it("Should allow an item to be placed on an owned kittyId", function() {
    return KittyCoreExample.deployed().then(async function(kittyCoreInstance) {
      return ItemiWatch.deployed().then(async function(itemAppleWatchInstance) {
        var results = await testApplyItem(kittyCoreInstance, itemAppleWatchInstance);
      });
    });
  });
  // this test removes a ItemiWatch from kittyId 235
  // account[0] balance: 290
  // account[1] balance: 9
  // kittyOwner[235] == accounts[1]
  // appliedToKittyMapping[235] == false
  it("Should allow an item to be removed on an owned kittyId", function() {
    return KittyCoreExample.deployed().then(async function(kittyCoreInstance) {
      return ItemiWatch.deployed().then(async function(itemAppleWatchInstance) {
        var results = await testRemoveItem(kittyCoreInstance, itemAppleWatchInstance);
      });
    });
  });
  // this test attempts to apply an item to a kitty not owned by transacting address with no balance
  // account[0] balance: 290
  // account[1] balance: 9
  // kittyOwner[235] == accounts[1]
  it("Should not allow an item to be applied with no balance", function() {
    return KittyCoreExample.deployed().then(async function(kittyCoreInstance) {
      return ItemiWatch.deployed().then(async function(itemAppleWatchInstance) {
        var results = await testApplyItemNoKittyNoBalance(kittyCoreInstance, itemAppleWatchInstance);
      });
    });
  });
  // this test attempts to apply an item to a kitty not owned by transacting address
  // account[0] balance: 289
  // account[1] balance: 9
  // account[2] balance: 1
  // kittyOwner[235] == accounts[1]
  it("Should not allow an item to be applied to a kitty not owned by the trasacting address", function() {
    return KittyCoreExample.deployed().then(async function(kittyCoreInstance) {
      return ItemiWatch.deployed().then(async function(itemAppleWatchInstance) {
        var results = await testApplyItemNoKitty(kittyCoreInstance, itemAppleWatchInstance);
      });
    });
  });
  // this test sets up the KittyItemMarket contract
  // account[0] balance: 89
  // account[1] balance: 9
  // account[2] balance: 1
  // KittyItemMarket.address balance: 200
  // kittyOwner[235] == accounts[1]
  it("Should allow owner to setup KittyItemMarket", function() {
    return KittyCoreExample.deployed().then(async function(kittyCoreInstance) {
      return ItemiWatch.deployed().then(async function(itemAppleWatchInstance) {
        return KittyItemMarket.deployed().then(async function(kittyItemMarketInstance) {
          var results = await testSetupMarket(kittyCoreInstance, itemAppleWatchInstance, kittyItemMarketInstance);
        });
      });
    });
  });
  // this test sets up the KittyItemMarket contract
  // account[0] balance: 89
  // account[1] balance: 9
  // account[2] balance: 1
  // accounts[3] balance: 1
  // accounts[4] balance: 2
  // KittyItemMarket.address balance: 197
  // kittyOwner[235] == accounts[1]
  it("Should allow an address to buy an item", function() {
    return KittyCoreExample.deployed().then(async function(kittyCoreInstance) {
      return ItemiWatch.deployed().then(async function(itemAppleWatchInstance) {
        return KittyItemMarket.deployed().then(async function(kittyItemMarketInstance) {
          var results = await testBuyItem(kittyCoreInstance, itemAppleWatchInstance, kittyItemMarketInstance);
        }); 
      }); 
    }); 
  });
  // this test tests buying and applying an item
  // account[0] balance: 89
  // account[1] balance: 9
  // account[2] balance: 1
  // accounts[3] balance: 1
  // accounts[4] balance: 2
  // accounts[5] balance: 0
  // KittyItemMarket.address balance: 196
  // kittyOwner[235] == accounts[1]
  // kittyOwner[100] == accounts[5]
  it("Should allow an address to buy an item and apply it", function() {
    return KittyCoreExample.deployed().then(async function(kittyCoreInstance) {
      return ItemiWatch.deployed().then(async function(itemAppleWatchInstance) {
        return KittyItemMarket.deployed().then(async function(kittyItemMarketInstance) {
          var results = await testBuyAndApply(kittyCoreInstance, itemAppleWatchInstance, kittyItemMarketInstance);
        }); 
      }); 
    }); 
  });
  it("Should allow items in KittyItemMarket to be updated", function() {
    return KittyCoreExample.deployed().then(async function(kittyCoreInstance) {
      return ItemiWatch.deployed().then(async function(itemAppleWatchInstance) {
        return KittyItemMarket.deployed().then(async function(kittyItemMarketInstance) {
          var results = await testModifyItem(kittyCoreInstance, itemAppleWatchInstance, kittyItemMarketInstance);
        }); 
      }); 
    }); 
  });
  it("Should not allow items in KittyItemMarket to be updated by addresses other than owner", function() {
    return KittyCoreExample.deployed().then(async function(kittyCoreInstance) {
      return ItemiWatch.deployed().then(async function(itemAppleWatchInstance) {
        return KittyItemMarket.deployed().then(async function(kittyItemMarketInstance) {
          var results = await testOnlyOwnerCanModifyItem(kittyCoreInstance, itemAppleWatchInstance, kittyItemMarketInstance);
        }); 
      }); 
    }); 
  });
  // this test tests buying and applying an item
  it("Should not allow an address to buy an item and apply it to a kitty they don't own", function() {
    return KittyCoreExample.deployed().then(async function(kittyCoreInstance) {
      return ItemiWatch.deployed().then(async function(itemAppleWatchInstance) {
        return KittyItemMarket.deployed().then(async function(kittyItemMarketInstance) {
          var results = await testBuyAndApplyOnNotOwnedKitty(kittyCoreInstance, itemAppleWatchInstance, kittyItemMarketInstance);
        }); 
      }); 
    }); 
  });
  it("Should let the funds transfer to the owner and the artist", function() {
    return KittyCoreExample.deployed().then(async function(kittyCoreInstance) {
      return ItemiWatch.deployed().then(async function(itemAppleWatchInstance) {
        return KittyItemMarket.deployed().then(async function(kittyItemMarketInstance) {
          var results = await testTransferFunds(kittyCoreInstance, itemAppleWatchInstance, kittyItemMarketInstance);
        }); 
      }); 
    }); 
  });
  it("Should not let you buy from the market when the market is paused", function() {
    return KittyCoreExample.deployed().then(async function(kittyCoreInstance) {
      return ItemiWatch.deployed().then(async function(itemAppleWatchInstance) {
        return KittyItemMarket.deployed().then(async function(kittyItemMarketInstance) {
          var results = await testPausedMarket(kittyCoreInstance, itemAppleWatchInstance, kittyItemMarketInstance);
        }); 
      }); 
    }); 
  });
  it("Should allow change of ownership", function() {
    return KittyCoreExample.deployed().then(async function(kittyCoreInstance) {
      return ItemiWatch.deployed().then(async function(itemAppleWatchInstance) {
        return KittyItemMarket.deployed().then(async function(kittyItemMarketInstance) {
          var results = await testChangeOwnerOfKittyMarket(kittyCoreInstance, itemAppleWatchInstance, kittyItemMarketInstance);
        }); 
      }); 
    }); 
  });
  it("Should allow tokens to be transferred back to owner", function() {
    return KittyCoreExample.deployed().then(async function(kittyCoreInstance) {
      return ItemiWatch.deployed().then(async function(itemAppleWatchInstance) {
        return KittyItemMarket.deployed().then(async function(kittyItemMarketInstance) {
          var results = await testTransferredTokensToOwner(kittyCoreInstance, itemAppleWatchInstance, kittyItemMarketInstance);
        }); 
      }); 
    }); 
  });
});
