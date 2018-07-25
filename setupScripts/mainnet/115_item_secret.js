module.exports = async function (callback) {
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemSecret = artifacts.require("ItemSecret.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemSecret = ItemSecret.at(ItemSecret.address);

  console.log("Setup Token");
  var err, tx = await itemSecret.setupToken(60, "KHBT", "Secret");
  console.log(err, tx);
  await itemSecret.setKittyCoreAddress(kittyCoreAddress);
  await itemSecret.setCanApplyAddress(kittyItemMarket.address);
}
