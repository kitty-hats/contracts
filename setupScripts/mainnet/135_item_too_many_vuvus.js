module.exports = async function (callback) {
  var artistAddress = "0xbccc57c75b5ad32c9f1655480a08d4fc0fd0f925";  // BxKat
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemTooManyVuvus = artifacts.require("ItemTooManyVuvus.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemTooManyVuvus = ItemTooManyVuvus.at(ItemTooManyVuvus.address);

  console.log("Setup Token");
  var err, tx = await itemTooManyVuvus.setupToken(60, "KHWTV", "TooManyVuvus");
  console.log(err, tx);
  await itemTooManyVuvus.setKittyCoreAddress(kittyCoreAddress);
  await itemTooManyVuvus.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemTooManyVuvus.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("TooManyVuvus", itemTooManyVuvus.address, oneEtherInWei*0.02, artistAddress, 5000);
  console.log(err, tx);

}
