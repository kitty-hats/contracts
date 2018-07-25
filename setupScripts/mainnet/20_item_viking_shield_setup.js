module.exports = async function (callback) {
  var artistAddress = "0xeF7e51ADe42b9Bb9db5A613e5ccA83DdA7BBA708";  // KittyHawk's ETH address
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemVikingShield = artifacts.require("ItemVikingShield.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemVikingShield = ItemVikingShield.at(ItemVikingShield.address);

  console.log("Setup Token");
  var err, tx = await itemVikingShield.setupToken(150, "KHVS", "VikingShield");
  console.log(err, tx);
  await itemVikingShield.setKittyCoreAddress(kittyCoreAddress);
  await itemVikingShield.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemVikingShield.transfer(kittyItemMarket.address, 130);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("VikingShield", itemVikingShield.address, oneEtherInWei*0.01, artistAddress, 5000);
  console.log(err, tx);

}
