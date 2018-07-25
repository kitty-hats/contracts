module.exports = async function (callback) {
  var artistAddress = "0x5c2e98f4d0e345482cd06647ce768b98679cf4bd";  // Dada splitter contract for LadyWithErmine artist
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaLadyWithErmine = artifacts.require("ItemDadaLadyWithErmine.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaLadyWithErmine = ItemDadaLadyWithErmine.at(ItemDadaLadyWithErmine.address);

  console.log("Setup Token");
  var err, tx = await itemDadaLadyWithErmine.setupToken(20, "KHLE", "DadaLadyWithErmine");
  console.log(err, tx);
  await itemDadaLadyWithErmine.setKittyCoreAddress(kittyCoreAddress);
  await itemDadaLadyWithErmine.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaLadyWithErmine.transfer(kittyItemMarket.address, 15);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaLadyWithErmine", itemDadaLadyWithErmine.address, oneEtherInWei*0.05, artistAddress, 5000);
  console.log(err, tx);
}
