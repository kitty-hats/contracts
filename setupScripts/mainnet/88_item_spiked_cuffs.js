module.exports = async function (callback) {
  var artistAddress = "0xbccc57c75b5ad32c9f1655480a08d4fc0fd0f925";  // BxCat
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemSpikedCuffs = artifacts.require("ItemSpikedCuffs.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemSpikedCuffs = ItemSpikedCuffs.at(ItemSpikedCuffs.address);

  console.log("Setup Token");
  var err, tx = await itemSpikedCuffs.setupToken(60, "KHSC", "SpikedCuffs");
  console.log(err, tx);
  await itemSpikedCuffs.setKittyCoreAddress(kittyCoreAddress);
  await itemSpikedCuffs.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemSpikedCuffs.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("SpikedCuffs", itemSpikedCuffs.address, oneEtherInWei*0.003, artistAddress, 5000);
  console.log(err, tx);

}
