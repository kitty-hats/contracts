module.exports = async function (callback) {
  var artistAddress = "0xeF7e51ADe42b9Bb9db5A613e5ccA83DdA7BBA708";  // KittyHawk's ETH address
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemVikingHat = artifacts.require("ItemVikingHat.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemVikingHat = ItemVikingHat.at(ItemVikingHat.address);

  console.log("Setup Token");
  var err, tx = await itemVikingHat.setupToken(500, "KHVH", "VikingHat");
  console.log(err, tx);
  await itemVikingHat.setKittyCoreAddress(kittyCoreAddress);
  await itemVikingHat.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemVikingHat.transfer(kittyItemMarket.address, 450);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("VikingHat", itemVikingHat.address, oneEtherInWei*0.003, artistAddress, 5000);
  console.log(err, tx);

}
