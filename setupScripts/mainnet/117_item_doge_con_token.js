module.exports = async function (callback) {
  var artistAddress = "0x4027b203a16158a39b80b2d3a353ca4870dca63e";  // ADHDKitties 
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDogeConToken = artifacts.require("ItemDogeConToken.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDogeConToken = ItemDogeConToken.at(ItemDogeConToken.address);

  console.log("Setup Token");
  var err, tx = await itemDogeConToken.setupToken(50000, "KHDCT", "DogeConToken");
  console.log(err, tx);
  await itemDogeConToken.setKittyCoreAddress(kittyCoreAddress);
  await itemDogeConToken.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDogeConToken.transfer(kittyItemMarket.address, 45000);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DogeConToken", itemDogeConToken.address, oneEtherInWei*0.0000062, artistAddress, 5000);
  console.log(err, tx);

}
