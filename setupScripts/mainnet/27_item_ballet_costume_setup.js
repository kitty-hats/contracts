module.exports = async function (callback) {
  var artistAddress = "0xeF7e51ADe42b9Bb9db5A613e5ccA83DdA7BBA708";  // KittyHawk's ETH address
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemBalletCostume = artifacts.require("ItemBalletCostume.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemBalletCostume = ItemBalletCostume.at(ItemBalletCostume.address);

  console.log("Setup Token");
  var err, tx = await itemBalletCostume.setupToken(35, "KHBC", "BalletCostume");
  console.log(err, tx);
  await itemBalletCostume.setKittyCoreAddress(kittyCoreAddress);
  await itemBalletCostume.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemBalletCostume.transfer(kittyItemMarket.address, 30);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("BalletCostume", itemBalletCostume.address, oneEtherInWei*0.035, artistAddress, 5000);
  console.log(err, tx);

}
