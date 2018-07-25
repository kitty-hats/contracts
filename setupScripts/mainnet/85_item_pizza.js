module.exports = async function (callback) {
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemPizza = artifacts.require("ItemPizza.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemPizza = ItemPizza.at(ItemPizza.address);

  console.log("Setup Token");
  var err, tx = await itemPizza.setupToken(60, "KHBT", "Pizza");
  console.log(err, tx);
  await itemPizza.setKittyCoreAddress(kittyCoreAddress);
  await itemPizza.setCanApplyAddress(kittyItemMarket.address);
}
