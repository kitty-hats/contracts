module.exports = async function (callback) {
  var artistAddress = "0xfe6f51f98c53b710db139644437b4cc43159eebf";  // Dada splitter contract for artist vVs
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaStarryNight = artifacts.require("ItemDadaStarryNight.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaStarryNight = ItemDadaStarryNight.at(ItemDadaStarryNight.address);

  console.log("Setup Token");
  var err, tx = await itemDadaStarryNight.setupToken(10, "KHSN", "DadaStarryNight");
  console.log(err, tx);
  await itemDadaStarryNight.setKittyCoreAddress(kittyCoreAddress);
  await itemDadaStarryNight.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaStarryNight.transfer(kittyItemMarket.address, 5);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaStarryNight", itemDadaStarryNight.address, oneEtherInWei*0.1, artistAddress, 5000);
  console.log(err, tx);
}
