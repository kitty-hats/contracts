module.exports = async function (callback) {
  var artistAddress = "0x4eb395c9c5829a6e87fc5facfc00ccd8ab4a91ad";  // Bruno donating to K4C
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemEnglandHat = artifacts.require("ItemEnglandHat.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemEnglandHat = ItemEnglandHat.at(ItemEnglandHat.address);

  console.log("Setup Token");
  var err, tx = await itemEnglandHat.setupToken(60, "KHBWEH", "EnglandHat");
  console.log(err, tx);
  itemEnglandHat.setKittyCoreAddress(kittyCoreAddress);
  itemEnglandHat.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemEnglandHat.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("EnglandHat", itemEnglandHat.address, oneEtherInWei*0.02, artistAddress, 5000);
  console.log(err, tx);

}
