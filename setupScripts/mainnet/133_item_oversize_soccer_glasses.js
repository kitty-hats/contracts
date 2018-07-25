module.exports = async function (callback) {
  var artistAddress = "0xbccc57c75b5ad32c9f1655480a08d4fc0fd0f925";  // BxKat
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemOversizeSoccerGlasses = artifacts.require("ItemOversizeSoccerGlasses.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemOversizeSoccerGlasses = ItemOversizeSoccerGlasses.at(ItemOversizeSoccerGlasses.address);

  console.log("Setup Token");
  var err, tx = await itemOversizeSoccerGlasses.setupToken(60, "KHWOG", "OversizeSoccerGlasses");
  console.log(err, tx);
  await itemOversizeSoccerGlasses.setKittyCoreAddress(kittyCoreAddress);
  await itemOversizeSoccerGlasses.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemOversizeSoccerGlasses.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("OversizeSoccerGlasses", itemOversizeSoccerGlasses.address, oneEtherInWei*0.01, artistAddress, 5000);
  console.log(err, tx);

}
