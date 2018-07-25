module.exports = async function (callback) {
  var artistAddress = "0x4eb395c9c5829a6e87fc5facfc00ccd8ab4a91ad";  // Bruno donating to K4C
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemFranceHat = artifacts.require("ItemFranceHat.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemFranceHat = ItemFranceHat.at(ItemFranceHat.address);

  console.log("Setup Token");
  var err, tx = await itemFranceHat.setupToken(60, "KHWFH", "FranceHat");
  console.log(err, tx);
  itemFranceHat.setKittyCoreAddress(kittyCoreAddress);
  itemFranceHat.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemFranceHat.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("FranceHat", itemFranceHat.address, oneEtherInWei*0.02, artistAddress, 5000);
  console.log(err, tx);

}
