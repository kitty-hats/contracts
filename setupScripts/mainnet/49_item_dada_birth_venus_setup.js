module.exports = async function (callback) {
  var artistAddress = "0xad425c399d2a6812441f802ffdf18bfc6684c7ab";  // Dada splitter contract for BirthVenus artist
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaBirthVenus = artifacts.require("ItemDadaBirthVenus.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaBirthVenus = ItemDadaBirthVenus.at(ItemDadaBirthVenus.address);

  console.log("Setup Token");
  var err, tx = await itemDadaBirthVenus.setupToken(20, "KHBV", "DadaBirthVenus");
  console.log(err, tx);
  await itemDadaBirthVenus.setKittyCoreAddress(kittyCoreAddress);
  await itemDadaBirthVenus.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaBirthVenus.transfer(kittyItemMarket.address, 15);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaBirthVenus", itemDadaBirthVenus.address, oneEtherInWei*0.05, artistAddress, 5000);
  console.log(err, tx);
}
