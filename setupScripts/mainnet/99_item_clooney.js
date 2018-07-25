module.exports = async function (callback) {
  var artistAddress = "0x44b444d16935f1e9afdd58ef986ba1c93e9ee5e9";  // mh10k
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemClooney = artifacts.require("ItemClooney.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemClooney = ItemClooney.at(ItemClooney.address);

  console.log("Setup Token");
  var err, tx = await itemClooney.setupToken(60, "KHC", "Clooney");
  console.log(err, tx);
  await itemClooney.setKittyCoreAddress(kittyCoreAddress);
  await itemClooney.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemClooney.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Clooney", itemClooney.address, oneEtherInWei*0.005, artistAddress, 5000);
  console.log(err, tx);

}
