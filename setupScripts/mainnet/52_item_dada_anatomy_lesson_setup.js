module.exports = async function (callback) {
  var artistAddress = "0xd17a5c6b446bb3393231ef19dfe81b3cb7371ed3";  // Dada splitter contract for artist javier errecarte
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaAnatomyLesson = artifacts.require("ItemDadaAnatomyLesson.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaAnatomyLesson = ItemDadaAnatomyLesson.at(ItemDadaAnatomyLesson.address);

  console.log("Setup Token");
  var err, tx = await itemDadaAnatomyLesson.setupToken(50, "KHAL", "DadaAnatomyLesson");
  console.log(err, tx);
  await itemDadaAnatomyLesson.setKittyCoreAddress(kittyCoreAddress);
  await itemDadaAnatomyLesson.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaAnatomyLesson.transfer(kittyItemMarket.address, 40);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaAnatomyLesson", itemDadaAnatomyLesson.address, oneEtherInWei*0.02, artistAddress, 5000);
  console.log(err, tx);
}
