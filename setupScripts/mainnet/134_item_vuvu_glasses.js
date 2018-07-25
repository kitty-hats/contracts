module.exports = async function (callback) {
  var artistAddress = "0xbccc57c75b5ad32c9f1655480a08d4fc0fd0f925";  // BxKat
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemVuvuGlasses = artifacts.require("ItemVuvuGlasses.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemVuvuGlasses = ItemVuvuGlasses.at(ItemVuvuGlasses.address);

  console.log("Setup Token");
  var err, tx = await itemVuvuGlasses.setupToken(60, "KHWVG", "VuvuGlasses");
  console.log(err, tx);
  await itemVuvuGlasses.setKittyCoreAddress(kittyCoreAddress);
  await itemVuvuGlasses.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemVuvuGlasses.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("VuvuGlasses", itemVuvuGlasses.address, oneEtherInWei*0.02, artistAddress, 5000);
  console.log(err, tx);

}
