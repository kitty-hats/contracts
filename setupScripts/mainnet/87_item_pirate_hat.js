module.exports = async function (callback) {
  var artistAddress = "0xbccc57c75b5ad32c9f1655480a08d4fc0fd0f925";  // BxCat
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemPirateHat = artifacts.require("ItemPirateHat.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemPirateHat = ItemPirateHat.at(ItemPirateHat.address);

  console.log("Setup Token");
  var err, tx = await itemPirateHat.setupToken(60, "KHPH", "PirateHat");
  console.log(err, tx);
  await itemPirateHat.setKittyCoreAddress(kittyCoreAddress);
  await itemPirateHat.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemPirateHat.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("PirateHat", itemPirateHat.address, oneEtherInWei*0.005, artistAddress, 5000);
  console.log(err, tx);

}
