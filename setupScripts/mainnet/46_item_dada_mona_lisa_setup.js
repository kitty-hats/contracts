module.exports = async function (callback) {
  var artistAddress = "0x5c2e98f4d0e345482cd06647ce768b98679cf4bd";  // Dada splitter contract for artist Boris Toledo
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaMonaLisa = artifacts.require("ItemDadaMonaLisa.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaMonaLisa = ItemDadaMonaLisa.at(ItemDadaMonaLisa.address);

  console.log("Setup Token");
  var err, tx = await itemDadaMonaLisa.setupToken(50, "KHMNL", "DadaMonaLisa");
  console.log(err, tx);
  await itemDadaMonaLisa.setKittyCoreAddress(kittyCoreAddress);
  await itemDadaMonaLisa.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaMonaLisa.transfer(kittyItemMarket.address, 40);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaMonaLisa", itemDadaMonaLisa.address, oneEtherInWei*0.02, artistAddress, 5000);
  console.log(err, tx);
}
