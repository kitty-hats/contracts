module.exports = async function (callback) {
  var artistAddress = "0x308917d7ff0a85eef2255b1b30760ac1dfa326e5";  // Dada splitter contract for Ma Fer Garzon
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaPortraitAdele = artifacts.require("ItemDadaPortraitAdele.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaPortraitAdele = ItemDadaPortraitAdele.at(ItemDadaPortraitAdele.address);

  console.log("Setup Token");
  var err, tx = await itemDadaPortraitAdele.setupToken(20, "KHPA", "DadaPortraitAdele");
  console.log(err, tx);
  await itemDadaPortraitAdele.setKittyCoreAddress(kittyCoreAddress);
  await itemDadaPortraitAdele.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaPortraitAdele.transfer(kittyItemMarket.address, 15);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaPortraitAdele", itemDadaPortraitAdele.address, oneEtherInWei*0.05, artistAddress, 5000);
  console.log(err, tx);
}
