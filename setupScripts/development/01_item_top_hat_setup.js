module.exports = async function (callback) {
  var artistAddress = web3.eth.accounts[0];
  const oneEtherInWei = 1000000000000000000;

  var KittyCoreExample = artifacts.require("KittyCoreExample.sol");
  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemTopHat = artifacts.require("ItemTopHat.sol");

  var kittyCoreExample = KittyCoreExample.at(KittyCoreExample.address);
  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemTopHat = ItemTopHat.at(ItemTopHat.address);

  console.log("Setup Token");
  var err, tx = await itemTopHat.setupToken(500000, "KHTH", "TopHat");
  console.log(err, tx);
  await itemTopHat.setKittyCoreAddress(kittyCoreExample.address);
  await itemTopHat.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemTopHat.transfer(kittyItemMarket.address, 450000);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("TopHat", itemTopHat.address, oneEtherInWei*0.001, artistAddress, 2500);
  console.log(err, tx);

}
