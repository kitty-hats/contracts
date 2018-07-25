module.exports = async function (callback) {
  var artistAddress = "0xe2ccab96882c4bf320b531c33e803cede21dcca6";  // Dada splitter contract for Massel
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaDanceClass = artifacts.require("ItemDadaDanceClass.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaDanceClass = ItemDadaDanceClass.at(ItemDadaDanceClass.address);

  console.log("Setup Token");
  var err, tx = await itemDadaDanceClass.setupToken(20, "KHDC", "DadaDanceClass");
  console.log(err, tx);
  await itemDadaDanceClass.setKittyCoreAddress(kittyCoreAddress);
  await itemDadaDanceClass.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaDanceClass.transfer(kittyItemMarket.address, 15);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaDanceClass", itemDadaDanceClass.address, oneEtherInWei*0.05, artistAddress, 5000);
  console.log(err, tx);
}
