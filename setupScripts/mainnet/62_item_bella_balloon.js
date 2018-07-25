module.exports = async function (callback) {
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemBellaBalloon = artifacts.require("ItemBellaBalloon.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemBellaBalloon = ItemBellaBalloon.at(ItemBellaBalloon.address);

  console.log("Setup Token");
  var err, tx = await itemBellaBalloon.setupToken(250, "KHBB", "BellaBalloon");
  console.log(err, tx);
  await itemBellaBalloon.setKittyCoreAddress(kittyCoreAddress);
  await itemBellaBalloon.setCanApplyAddress(kittyItemMarket.address);
}
