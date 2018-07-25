module.exports = async function (callback) {
  var artistAddress = "0x4027B203A16158a39b80B2d3a353cA4870dCa63e"; // ADHDKitties
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemClassicDiamond = artifacts.require("ItemClassicDiamond.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemClassicDiamond = ItemClassicDiamond.at(ItemClassicDiamond.address);

  console.log("Setup Token");
  var err, tx = await itemClassicDiamond.setupToken(60, "KHLI", "ClassicDiamond");
  console.log(err, tx);
  await itemClassicDiamond.setKittyCoreAddress(kittyCoreAddress);
  await itemClassicDiamond.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemClassicDiamond.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("ClassicDiamond", itemClassicDiamond.address, oneEtherInWei*0.025, artistAddress, 5000);
  console.log(err, tx);
}
