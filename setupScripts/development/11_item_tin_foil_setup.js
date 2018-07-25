module.exports = async function (callback) {
  var artistAddress = web3.eth.accounts[0];
  const oneEtherInWei = 1000000000000000000;

  var KittyCoreExample = artifacts.require("KittyCoreExample.sol");
  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemTinFoil = artifacts.require("ItemTinFoil.sol");

  var kittyCoreExample = KittyCoreExample.at(KittyCoreExample.address);
  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemTinFoil = ItemTinFoil.at(ItemTinFoil.address);

  console.log("Setup Token");
  var err, tx = await itemTinFoil.setupToken(10, "KHTF", "TinFoil");
  console.log(err, tx);
  await itemTinFoil.setKittyCoreAddress(kittyCoreExample.address);
  await itemTinFoil.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemTinFoil.transfer(kittyItemMarket.address, 7);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("TinFoil", itemTinFoil.address, oneEtherInWei*10, artistAddress, 2500);
  console.log(err, tx);

}
