module.exports = async function (callback) {
  var artistAddress = web3.eth.accounts[0];
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemShutterShades = artifacts.require("ItemShutterShades.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemShutterShades = ItemShutterShades.at(ItemShutterShades.address);

  console.log("Setup Token");
  var err, tx = await itemShutterShades.setupToken(5000, "KHSH", "ShutterShades");
  console.log(err, tx);
  await itemShutterShades.setKittyCoreAddress(kittyCoreAddress);
  await itemShutterShades.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemShutterShades.transfer(kittyItemMarket.address, 4500);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("ShutterShades", itemShutterShades.address, oneEtherInWei*0.1, artistAddress, 2500);
  console.log(err, tx);

}
