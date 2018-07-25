module.exports = async function (callback) {
  var artistAddress = "0xfe6f51f98c53b710db139644437b4cc43159eebf";  // Dada splitter contract for vVs
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaWhistlersMother = artifacts.require("ItemDadaWhistlersMother.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaWhistlersMother = ItemDadaWhistlersMother.at(ItemDadaWhistlersMother.address);

  console.log("Setup Token");
  var err, tx = await itemDadaWhistlersMother.setupToken(20, "KHWM", "DadaWhistlersMother");
  console.log(err, tx);
  await itemDadaWhistlersMother.setKittyCoreAddress(kittyCoreAddress);
  await itemDadaWhistlersMother.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaWhistlersMother.transfer(kittyItemMarket.address, 15);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaWhistlersMother", itemDadaWhistlersMother.address, oneEtherInWei*0.05, artistAddress, 5000);
  console.log(err, tx);
}
