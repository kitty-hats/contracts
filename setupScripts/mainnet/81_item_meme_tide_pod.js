module.exports = async function (callback) {
  var artistAddress = "0x4027B203A16158a39b80B2d3a353cA4870dCa63e";  // ADHD
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemMemeTidePod = artifacts.require("ItemMemeTidePod.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemMemeTidePod = ItemMemeTidePod.at(ItemMemeTidePod.address);

  console.log("Setup Token");
  var err, tx = await itemMemeTidePod.setupToken(25, "KHMT", "MemeTidePod");
  console.log(err, tx);
  await itemMemeTidePod.setKittyCoreAddress(kittyCoreAddress);
  await itemMemeTidePod.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemMemeTidePod.transfer(kittyItemMarket.address, 20);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("MemeTidePod", itemMemeTidePod.address, oneEtherInWei*0.002, artistAddress, 5000);
  console.log(err, tx);

}
