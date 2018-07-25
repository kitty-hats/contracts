module.exports = async function (callback) {
  var artistAddress = "0xeF7e51ADe42b9Bb9db5A613e5ccA83DdA7BBA708";  // KittyHawk's ETH address
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemMonocle = artifacts.require("ItemMonocle.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemMonocle = ItemMonocle.at(ItemMonocle.address);

  console.log("Setup Token");
  var err, tx = await itemMonocle.setupToken(500, "KHML", "Monocle");
  console.log(err, tx);
  await itemMonocle.setKittyCoreAddress(kittyCoreAddress);
  await itemMonocle.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemMonocle.transfer(kittyItemMarket.address, 450);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Monocle", itemMonocle.address, oneEtherInWei*0.003, artistAddress, 5000);
  console.log(err, tx);

}
