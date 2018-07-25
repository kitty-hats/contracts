module.exports = async function (callback) {
  var artistAddress = web3.eth.accounts[0];
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemWayfarers = artifacts.require("ItemWayfarers.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemWayfarers = ItemWayfarers.at(ItemWayfarers.address);

  console.log("Setup Token");
  var err, tx = await itemWayfarers.setupToken(50000, "KHWF", "Wayfarers");
  console.log(err, tx);
  await itemWayfarers.setKittyCoreAddress(kittyCoreAddress);
  await itemWayfarers.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemWayfarers.transfer(kittyItemMarket.address, 45000);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Wayfarers", itemWayfarers.address, oneEtherInWei*0.03, artistAddress, 2500);
  console.log(err, tx);

}
