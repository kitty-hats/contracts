module.exports = async function (callback) {
  var artistAddress = "0x4027B203A16158a39b80B2d3a353cA4870dCa63e";  // ADHDKitties
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemCloud = artifacts.require("ItemCloud.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemCloud = ItemCloud.at(ItemCloud.address);

  console.log("Setup Token");
  var err, tx = await itemCloud.setupToken(60, "KHCD", "Cloud");
  console.log(err, tx);
  await itemCloud.setKittyCoreAddress(kittyCoreAddress);
  await itemCloud.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemCloud.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Cloud", itemCloud.address, oneEtherInWei*0.003, artistAddress, 5000);
  console.log(err, tx);

}
