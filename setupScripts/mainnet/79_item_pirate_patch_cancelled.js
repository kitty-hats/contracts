module.exports = async function (callback) {
  var artistAddress = "";  // Janbro
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemPiratePatch = artifacts.require("ItemPiratePatch.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemPiratePatch = ItemPiratePatch.at(ItemPiratePatch.address);

  console.log("Setup Token");
  var err, tx = await itemPiratePatch.setupToken(40, "KHPP", "PiratePatch");
  console.log(err, tx);
  await itemPiratePatch.setKittyCoreAddress(kittyCoreAddress);
  await itemPiratePatch.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemPiratePatch.transfer(kittyItemMarket.address, 30);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("PiratePatch", itemPiratePatch.address, oneEtherInWei*0.005, artistAddress, 5000);
  console.log(err, tx);

}
