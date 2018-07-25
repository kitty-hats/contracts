module.exports = async function (callback) {
  var artistAddress = "0xa9113eb4efb1bb45ee2a7e10e91e8c487fe5ee1d";  // Dada splitter contract for artist Serste
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaJupiterIo = artifacts.require("ItemDadaJupiterIo.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaJupiterIo = ItemDadaJupiterIo.at(ItemDadaJupiterIo.address);

  console.log("Setup Token");
  var err, tx = await itemDadaJupiterIo.setupToken(50, "KHJI", "DadaJupiterIo");
  console.log(err, tx);
  await itemDadaJupiterIo.setKittyCoreAddress(kittyCoreAddress);
  await itemDadaJupiterIo.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaJupiterIo.transfer(kittyItemMarket.address, 40);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaJupiterIo", itemDadaJupiterIo.address, oneEtherInWei*0.02, artistAddress, 5000);
  console.log(err, tx);
}
