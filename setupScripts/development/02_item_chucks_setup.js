module.exports = async function (callback) {
  var artistAddress = web3.eth.accounts[0];
  const oneEtherInWei = 1000000000000000000;

  var KittyCoreExample = artifacts.require("KittyCoreExample.sol");
  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemChucks = artifacts.require("ItemChucks.sol");

  var kittyCoreExample = KittyCoreExample.at(KittyCoreExample.address);
  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemChucks = ItemChucks.at(ItemChucks.address);

  console.log("Setup Token");
  var err, tx = await itemChucks.setupToken(50000, "KHCV", "Chucks");
  console.log(err, tx);
  await itemChucks.setKittyCoreAddress(kittyCoreExample.address);
  await itemChucks.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemChucks.transfer(kittyItemMarket.address, 45000);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Chucks", itemChucks.address, oneEtherInWei*0.02, artistAddress, 2500);
  console.log(err, tx);
}
