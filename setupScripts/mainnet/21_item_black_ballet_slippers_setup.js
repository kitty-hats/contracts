module.exports = async function (callback) {
  var artistAddress = "0xeF7e51ADe42b9Bb9db5A613e5ccA83DdA7BBA708";  // KittyHawk's ETH address
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemBlackBalletSlippers = artifacts.require("ItemBlackBalletSlippers.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemBlackBalletSlippers = ItemBlackBalletSlippers.at(ItemBlackBalletSlippers.address);

  console.log("Setup Token");
  var err, tx = await itemBlackBalletSlippers.setupToken(1000, "KHBS", "BlackBalletSlippers");
  console.log(err, tx);
  await itemBlackBalletSlippers.setKittyCoreAddress(kittyCoreAddress);
  await itemBlackBalletSlippers.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemBlackBalletSlippers.transfer(kittyItemMarket.address, 900);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("BlackBalletSlippers", itemBlackBalletSlippers.address, oneEtherInWei*0.001, artistAddress, 5000);
  console.log(err, tx);

}
