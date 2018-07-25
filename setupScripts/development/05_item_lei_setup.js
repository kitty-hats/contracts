module.exports = async function (callback) {
  var artistAddress = web3.eth.accounts[0];
  const oneEtherInWei = 1000000000000000000;

  var KittyCoreExample = artifacts.require("KittyCoreExample.sol");
  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemLei = artifacts.require("ItemLei.sol");

  var kittyCoreExample = KittyCoreExample.at(KittyCoreExample.address);
  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemLei = ItemLei.at(ItemLei.address);

  console.log("Setup Token");
  var err, tx = await itemLei.setupToken(500000, "KHLI", "Lei");
  console.log(err, tx);
  await itemLei.setKittyCoreAddress(kittyCoreExample.address);
  await itemLei.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemLei.transfer(kittyItemMarket.address, 450000);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Lei", itemLei.address, oneEtherInWei*0.0013, artistAddress, 2500);
  console.log(err, tx);

}
