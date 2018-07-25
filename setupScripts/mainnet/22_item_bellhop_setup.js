module.exports = async function (callback) {
  var artistAddress = "0xeF7e51ADe42b9Bb9db5A613e5ccA83DdA7BBA708";  // KittyHawk's ETH address
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemBellhop = artifacts.require("ItemBellhop.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemBellhop = ItemBellhop.at(ItemBellhop.address);

  console.log("Setup Token");
  var err, tx = await itemBellhop.setupToken(30, "KHBH", "Bellhop");
  console.log(err, tx);
  await itemBellhop.setKittyCoreAddress(kittyCoreAddress);
  await itemBellhop.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemBellhop.transfer(kittyItemMarket.address, 25);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Bellhop", itemBellhop.address, oneEtherInWei*0.05, artistAddress, 5000);
  console.log(err, tx);

}
