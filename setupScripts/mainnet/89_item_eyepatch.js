module.exports = async function (callback) {
  var artistAddress = "0xbccc57c75b5ad32c9f1655480a08d4fc0fd0f925";  // BxCat
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemEyepatch = artifacts.require("ItemEyepatch.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemEyepatch = ItemEyepatch.at(ItemEyepatch.address);

  console.log("Setup Token");
  var err, tx = await itemEyepatch.setupToken(60, "KHEP", "Eyepatch");
  console.log(err, tx);
  await itemEyepatch.setKittyCoreAddress(kittyCoreAddress);
  await itemEyepatch.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemEyepatch.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Eyepatch", itemEyepatch.address, oneEtherInWei*0.001, artistAddress, 5000);
  console.log(err, tx);

}
