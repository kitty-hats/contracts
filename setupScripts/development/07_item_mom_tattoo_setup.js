module.exports = async function (callback) {
  var artistAddress = web3.eth.accounts[0];
  const oneEtherInWei = 1000000000000000000;

  var KittyCoreExample = artifacts.require("KittyCoreExample.sol");
  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemMomTattoo = artifacts.require("ItemMomTattoo.sol");

  var kittyCoreExample = KittyCoreExample.at(KittyCoreExample.address);
  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemMomTattoo = ItemMomTattoo.at(ItemMomTattoo.address);

  console.log("Setup Token");
  var err, tx = await itemMomTattoo.setupToken(50000, "KHMO", "MomTattoo");
  console.log(err, tx);
  await itemMomTattoo.setKittyCoreAddress(kittyCoreExample.address);
  await itemMomTattoo.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemMomTattoo.transfer(kittyItemMarket.address, 45000);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("MomTattoo", itemMomTattoo.address, oneEtherInWei*0.015, artistAddress, 2500);
  console.log(err, tx);

}
