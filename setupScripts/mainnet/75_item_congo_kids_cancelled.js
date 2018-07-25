module.exports = async function (callback) {
  var artistAddress = "";  // Charity? Ours?
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemCongoKids = artifacts.require("ItemCongoKids.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemCongoKids = ItemCongoKids.at(ItemCongoKids.address);

  console.log("Setup Token");
  var err, tx = await itemCongoKids.setupToken(1000, "KHCK", "CongoKids");
  console.log(err, tx);
  await itemCongoKids.setKittyCoreAddress(kittyCoreAddress);
  await itemCongoKids.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemCongoKids.transfer(kittyItemMarket.address, 500);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("CongoKids", itemCongoKids.address, oneEtherInWei*0.003, artistAddress, 5000);
  console.log(err, tx);

}
