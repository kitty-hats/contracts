module.exports = async function (callback) {
  var artistAddress = web3.eth.accounts[0];
  const oneEtherInWei = 1000000000000000000;

  var KittyCoreExample = artifacts.require("KittyCoreExample.sol");
  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemTiara = artifacts.require("ItemTiara.sol");

  var kittyCoreExample = KittyCoreExample.at(KittyCoreExample.address);
  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemTiara = ItemTiara.at(ItemTiara.address);

  console.log("Setup Token");
  var err, tx = await itemTiara.setupToken(50000, "KHTI", "Tiara");
  console.log(err, tx);
  await itemTiara.setKittyCoreAddress(kittyCoreExample.address);
  await itemTiara.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemTiara.transfer(kittyItemMarket.address, 45000);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Tiara", itemTiara.address, oneEtherInWei*0.01, artistAddress, 2500);
  console.log(err, tx);

}
