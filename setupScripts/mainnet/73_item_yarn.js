module.exports = async function (callback) {
  var artistAddress = "0xbccc57c75b5ad32c9f1655480a08d4fc0fd0f925";  // Bx
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemYarn = artifacts.require("ItemYarn.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemYarn = ItemYarn.at(ItemYarn.address);

  console.log("Setup Token");
  var err, tx = await itemYarn.setupToken(40, "KHBY", "Yarn");
  console.log(err, tx);
  await itemYarn.setKittyCoreAddress(kittyCoreAddress);
  await itemYarn.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemYarn.transfer(kittyItemMarket.address, 30);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Yarn", itemYarn.address, oneEtherInWei*0.005, artistAddress, 5000);
  console.log(err, tx);

}
