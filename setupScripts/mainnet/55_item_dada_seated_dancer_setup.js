module.exports = async function (callback) {
  var artistAddress = "0xe2ccab96882c4bf320b531c33e803cede21dcca6";  // Dada splitter contract for Massel
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaSeatedDancer = artifacts.require("ItemDadaSeatedDancer.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaSeatedDancer = ItemDadaSeatedDancer.at(ItemDadaSeatedDancer.address);

  console.log("Setup Token");
  var err, tx = await itemDadaSeatedDancer.setupToken(20, "KHSD", "DadaSeatedDancer");
  console.log(err, tx);
  await itemDadaSeatedDancer.setKittyCoreAddress(kittyCoreAddress);
  await itemDadaSeatedDancer.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaSeatedDancer.transfer(kittyItemMarket.address, 15);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaSeatedDancer", itemDadaSeatedDancer.address, oneEtherInWei*0.05, artistAddress, 5000);
  console.log(err, tx);
}
