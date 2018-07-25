module.exports = async function (callback) {
  var artistAddress = "0x5c2e98f4d0e345482cd06647ce768b98679cf4bd";  // Dada splitter contract for artist Boris Toledo
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaPearlEarring = artifacts.require("ItemDadaPearlEarring.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaPearlEarring = ItemDadaPearlEarring.at(ItemDadaPearlEarring.address);

  console.log("Setup Token");
  var err, tx = await itemDadaPearlEarring.setupToken(10, "KHPE", "DadaPearlEarring");
  console.log(err, tx);
  await itemDadaPearlEarring.setKittyCoreAddress(kittyCoreAddress);
  await itemDadaPearlEarring.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaPearlEarring.transfer(kittyItemMarket.address, 5);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaPearlEarring", itemDadaPearlEarring.address, oneEtherInWei*0.1, artistAddress, 5000);
  console.log(err, tx);
}
