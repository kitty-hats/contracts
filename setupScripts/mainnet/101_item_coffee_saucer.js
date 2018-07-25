module.exports = async function (callback) {
  var artistAddress = "0x44b444d16935f1e9afdd58ef986ba1c93e9ee5e9";  // mh10k
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemCoffeeSaucer = artifacts.require("ItemCoffeeSaucer.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemCoffeeSaucer = ItemCoffeeSaucer.at(ItemCoffeeSaucer.address);

  // console.log("Setup Token");
  // var err, tx = await itemCoffeeSaucer.setupToken(60, "KHCCS", "CoffeeSaucer");
  // console.log(err, tx);
  // await itemCoffeeSaucer.setKittyCoreAddress(kittyCoreAddress);
  await itemCoffeeSaucer.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemCoffeeSaucer.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("CoffeeSaucer", itemCoffeeSaucer.address, oneEtherInWei*0.003, artistAddress, 5000);
  console.log(err, tx);

}
