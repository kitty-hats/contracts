module.exports = async function (callback) {
  var artistAddress = "0xeF7e51ADe42b9Bb9db5A613e5ccA83DdA7BBA708";  // KittyHawk
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemKittyCoffee = artifacts.require("ItemKittyCoffee.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemKittyCoffee = ItemKittyCoffee.at(ItemKittyCoffee.address);

  // console.log("Setup Token");
  // var err, tx = await itemKittyCoffee.setupToken(60, "KHKCC", "KittyCoffee");
  // console.log(err, tx);
  // await itemKittyCoffee.setKittyCoreAddress(kittyCoreAddress);
  // await itemKittyCoffee.setCanApplyAddress(kittyItemMarket.address);
  // console.log("Transfer Tokens");
  // var err, tx = await itemKittyCoffee.transfer(kittyItemMarket.address, 50);
  // console.log(err, tx);
  // console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("KittyCoffee", itemKittyCoffee.address, oneEtherInWei*0.003, artistAddress, 5000);
  console.log(err, tx);

}
