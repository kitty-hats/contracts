module.exports = async function (callback) {
  var artistAddress = "0x35e2268306aab43014da143f110431ec0140957a";  // ParanoidLunatic
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemGraduationCap = artifacts.require("ItemGraduationCap.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemGraduationCap = ItemGraduationCap.at(ItemGraduationCap.address);

  console.log("Setup Token");
  var err, tx = await itemGraduationCap.setupToken(60, "KHGC", "GraduationCap");
  console.log(err, tx);
  await itemGraduationCap.setKittyCoreAddress(kittyCoreAddress);
  await itemGraduationCap.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemGraduationCap.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("GraduationCap", itemGraduationCap.address, oneEtherInWei*0.005, artistAddress, 5000);
  console.log(err, tx);

}
