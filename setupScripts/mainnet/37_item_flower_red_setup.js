module.exports = async function (callback) {
  var artistAddress = "0xeF7e51ADe42b9Bb9db5A613e5ccA83DdA7BBA708";  // KittyHawk
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemFlowerRed = artifacts.require("ItemFlowerRed.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemFlowerRed = ItemFlowerRed.at(ItemFlowerRed.address);

  console.log("Setup Token");
  var err, tx = await itemFlowerRed.setupToken(120, "KHFR", "FlowerRed");
  console.log(err, tx);
  await itemFlowerRed.setKittyCoreAddress(kittyCoreAddress);
  await itemFlowerRed.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemFlowerRed.transfer(kittyItemMarket.address, 100);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("FlowerRed", itemFlowerRed.address, oneEtherInWei*0.001, artistAddress, 5000);
  console.log(err, tx);

}
