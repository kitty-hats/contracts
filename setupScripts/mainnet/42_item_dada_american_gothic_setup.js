module.exports = async function (callback) {
  var artistAddress = "0x4edba008e5da2183e9647de871c931b7517d2043";  // Dada splitter contract for artist Betunski
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaAmericanGothic = artifacts.require("ItemDadaAmericanGothic.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaAmericanGothic = ItemDadaAmericanGothic.at(ItemDadaAmericanGothic.address);

  console.log("Setup Token");
  //var err, tx = await itemDadaAmericanGothic.setupToken(50, "KHAG", "DadaAmericanGothic");
  //console.log(err, tx);
//  await itemDadaAmericanGothic.setKittyCoreAddress(kittyCoreAddress);
  await itemDadaAmericanGothic.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaAmericanGothic.transfer(kittyItemMarket.address, 40);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaAmericanGothic", itemDadaAmericanGothic.address, oneEtherInWei*0.02, artistAddress, 5000);
  console.log(err, tx);
}
