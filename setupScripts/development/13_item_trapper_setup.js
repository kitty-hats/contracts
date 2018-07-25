module.exports = async function (callback) {
  var artistAddress = web3.eth.accounts[0];
  const oneEtherInWei = 1000000000000000000;

  var KittyCoreExample = artifacts.require("KittyCoreExample.sol");
  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemTrapper = artifacts.require("ItemTrapper.sol");

  var kittyCoreExample = KittyCoreExample.at(KittyCoreExample.address);
  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemTrapper = ItemTrapper.at(ItemTrapper.address);

  console.log("Setup Token");
  var err, tx = await itemTrapper.setupToken(500000, "KHTR", "Trapper");
  console.log(err, tx);
  await itemTrapper.setKittyCoreAddress(kittyCoreExample.address);
  await itemTrapper.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemTrapper.transfer(kittyItemMarket.address, 450000);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Trapper", itemTrapper.address, oneEtherInWei*0.002, artistAddress, 2500);
  console.log(err, tx);

}
