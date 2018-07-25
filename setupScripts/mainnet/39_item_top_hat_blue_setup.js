module.exports = async function (callback) {
  var artistAddress = "0xeF7e51ADe42b9Bb9db5A613e5ccA83DdA7BBA708";  // KittyHawk
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemTopHatBlue = artifacts.require("ItemTopHatBlue.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemTopHatBlue = ItemTopHatBlue.at(ItemTopHatBlue.address);

  console.log("Setup Token");
  var err, tx = await itemTopHatBlue.setupToken(40, "KHTB", "TopHatBlue");
  console.log(err, tx);
  await itemTopHatBlue.setKittyCoreAddress(kittyCoreAddress);
  await itemTopHatBlue.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemTopHatBlue.transfer(kittyItemMarket.address, 30);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("TopHatBlue", itemTopHatBlue.address, oneEtherInWei*0.004, artistAddress, 5000);
  console.log(err, tx);

}
