module.exports = async function (callback) {
  var artistAddress = "0xeF7e51ADe42b9Bb9db5A613e5ccA83DdA7BBA708";  // KittyHawk
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemBeret = artifacts.require("ItemBeret.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemBeret = ItemBeret.at(ItemBeret.address);

  console.log("Setup Token");
  var err, tx = await itemBeret.setupToken(60, "KHBT", "Beret");
  console.log(err, tx);
  await itemBeret.setKittyCoreAddress(kittyCoreAddress);
  await itemBeret.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemBeret.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Beret", itemBeret.address, oneEtherInWei*0.002, artistAddress, 5000);
  console.log(err, tx);

}
