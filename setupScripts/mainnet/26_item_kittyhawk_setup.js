module.exports = async function (callback) {
  var artistAddress = "0xeF7e51ADe42b9Bb9db5A613e5ccA83DdA7BBA708";  // KittyHawk's ETH address
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemKittyHawk = artifacts.require("ItemKittyHawk.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemKittyHawk = ItemKittyHawk.at(ItemKittyHawk.address);

  console.log("Setup Token");
  var err, tx = await itemKittyHawk.setupToken(35, "KHKH", "KittyHawk");
  console.log(err, tx);
  await itemKittyHawk.setKittyCoreAddress(kittyCoreAddress);
  await itemKittyHawk.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemKittyHawk.transfer(kittyItemMarket.address, 30);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("KittyHawk", itemKittyHawk.address, oneEtherInWei*0.03, artistAddress, 5000);
  console.log(err, tx);

}
