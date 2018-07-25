module.exports = async function (callback) {
  var artistAddress = "0x4eb395c9c5829a6e87fc5facfc00ccd8ab4a91ad";  // Bruno donating to K4C
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemSoccerBallHat = artifacts.require("ItemSoccerBallHat.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemSoccerBallHat = ItemSoccerBallHat.at(ItemSoccerBallHat.address);

  console.log("Setup Token");
  var err, tx = await itemSoccerBallHat.setupToken(60, "KHWSBH", "SoccerBallHat");
  console.log(err, tx);
  await itemSoccerBallHat.setKittyCoreAddress(kittyCoreAddress);
  await itemSoccerBallHat.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemSoccerBallHat.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("SoccerBallHat", itemSoccerBallHat.address, oneEtherInWei*0.01, artistAddress, 5000);
  console.log(err, tx);

}
