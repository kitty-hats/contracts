module.exports = async function (callback) {
  var artistAddress = "0x4eb395c9c5829a6e87fc5facfc00ccd8ab4a91ad";  // Bruno donating to K4C
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemWorldCupGlasses = artifacts.require("ItemWorldCupGlasses.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemWorldCupGlasses = ItemWorldCupGlasses.at(ItemWorldCupGlasses.address);

  console.log("Setup Token");
  var err, tx = await itemWorldCupGlasses.setupToken(60, "KHWCG", "WorldCupGlasses");
  console.log(err, tx);
  await itemWorldCupGlasses.setKittyCoreAddress(kittyCoreAddress);
  await itemWorldCupGlasses.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemWorldCupGlasses.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("WorldCupGlasses", itemWorldCupGlasses.address, oneEtherInWei*0.01, artistAddress, 5000);
  console.log(err, tx);

}
