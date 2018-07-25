module.exports = async function (callback) {
  var artistAddress = "0xa1d3d85976970535474cf5479fc6449f9579f807";  // Dada splitter contract for artist Raul Avila
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaMoulinRouge = artifacts.require("ItemDadaMoulinRouge.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaMoulinRouge = ItemDadaMoulinRouge.at(ItemDadaMoulinRouge.address);

  console.log("Setup Token");
  var err, tx = await itemDadaMoulinRouge.setupToken(50, "KHMR", "DadaMoulinRouge");
  console.log(err, tx);
  await itemDadaMoulinRouge.setKittyCoreAddress(kittyCoreAddress);
  await itemDadaMoulinRouge.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaMoulinRouge.transfer(kittyItemMarket.address, 40);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaMoulinRouge", itemDadaMoulinRouge.address, oneEtherInWei*0.02, artistAddress, 5000);
  console.log(err, tx);
}
