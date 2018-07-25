module.exports = async function (callback) {
  var artistAddress = "0xeF7e51ADe42b9Bb9db5A613e5ccA83DdA7BBA708";  // KittyHawk's ETH address
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemPawMePls = artifacts.require("ItemPawMePls.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemPawMePls = ItemPawMePls.at(ItemPawMePls.address);

  console.log("Setup Token");
  var err, tx = await itemPawMePls.setupToken(500, "KHPP", "PawMePls");
  console.log(err, tx);
  await itemPawMePls.setKittyCoreAddress(kittyCoreAddress);
  await itemPawMePls.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemPawMePls.transfer(kittyItemMarket.address, 450);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("PawMePls", itemPawMePls.address, oneEtherInWei*0.001, artistAddress, 5000);
  console.log(err, tx);

}
