module.exports = async function (callback) {
  var artistAddress = "0xeF7e51ADe42b9Bb9db5A613e5ccA83DdA7BBA708";  // KittyHawk's ETH address
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemLadybug = artifacts.require("ItemLadybug.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemLadybug = ItemLadybug.at(ItemLadybug.address);

  console.log("Setup Token");
  var err, tx = await itemLadybug.setupToken(30, "KHLB", "Ladybug");
  console.log(err, tx);
  await itemLadybug.setKittyCoreAddress(kittyCoreAddress);
  await itemLadybug.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemLadybug.transfer(kittyItemMarket.address, 25);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Ladybug", itemLadybug.address, oneEtherInWei*0.05, artistAddress, 5000);
  console.log(err, tx);

}
