module.exports = async function (callback) {
  var artistAddress = "0xbccc57c75b5ad32c9f1655480a08d4fc0fd0f925";  // BxCat
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemGoldHalo = artifacts.require("ItemGoldHalo.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemGoldHalo = ItemGoldHalo.at(ItemGoldHalo.address);

  console.log("Setup Token");
  var err, tx = await itemGoldHalo.setupToken(60, "KHGH", "GoldHalo");
  console.log(err, tx);
  await itemGoldHalo.setKittyCoreAddress(kittyCoreAddress);
  await itemGoldHalo.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemGoldHalo.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("GoldHalo", itemGoldHalo.address, oneEtherInWei*0.01, artistAddress, 5000);
  console.log(err, tx);

}
