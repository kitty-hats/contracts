module.exports = async function (callback) {
  var artistAddress = "0xe2ccab96882c4bf320b531c33e803cede21dcca6";  // Dada splitter contract for Massel
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaTwoWomen = artifacts.require("ItemDadaTwoWomen.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaTwoWomen = ItemDadaTwoWomen.at(ItemDadaTwoWomen.address);

  console.log("Setup Token");
  var err, tx = await itemDadaTwoWomen.setupToken(20, "KHTW", "DadaTwoWomen");
  console.log(err, tx);
  await itemDadaTwoWomen.setKittyCoreAddress(kittyCoreAddress);
  await itemDadaTwoWomen.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaTwoWomen.transfer(kittyItemMarket.address, 15);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaTwoWomen", itemDadaTwoWomen.address, oneEtherInWei*0.05, artistAddress, 5000);
  console.log(err, tx);
}
