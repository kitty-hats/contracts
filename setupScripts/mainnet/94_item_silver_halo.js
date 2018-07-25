module.exports = async function (callback) {
  var artistAddress = "0xbccc57c75b5ad32c9f1655480a08d4fc0fd0f925";  // BxCat
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemSilverHalo = artifacts.require("ItemSilverHalo.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemSilverHalo = ItemSilverHalo.at(ItemSilverHalo.address);

  console.log("Setup Token");
  var err, tx = await itemSilverHalo.setupToken(60, "KHSH", "SilverHalo");
  console.log(err, tx);
  await itemSilverHalo.setKittyCoreAddress(kittyCoreAddress);
  await itemSilverHalo.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemSilverHalo.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("SilverHalo", itemSilverHalo.address, oneEtherInWei*0.05, artistAddress, 5000);
  console.log(err, tx);

}
