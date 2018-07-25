module.exports = async function (callback) {
  var artistAddress = "0xeF7e51ADe42b9Bb9db5A613e5ccA83DdA7BBA708";  // KittyHawk's ETH address
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemChocoHeadband = artifacts.require("ItemChocoHeadband.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemChocoHeadband = ItemChocoHeadband.at(ItemChocoHeadband.address);

  console.log("Setup Token");
  var err, tx = await itemChocoHeadband.setupToken(5, "KHCH", "ChocoHeadband");
  console.log(err, tx);
  await itemChocoHeadband.setKittyCoreAddress(kittyCoreAddress);
  await itemChocoHeadband.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemChocoHeadband.transfer(kittyItemMarket.address, 5);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("ChocoHeadband", itemChocoHeadband.address, oneEtherInWei*0.002, artistAddress, 5000);
  console.log(err, tx);

}
