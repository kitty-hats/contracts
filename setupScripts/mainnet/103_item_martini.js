module.exports = async function (callback) {
  var artistAddress = "0x44b444d16935f1e9afdd58ef986ba1c93e9ee5e9";  // mh10k
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemMartini = artifacts.require("ItemMartini.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemMartini = ItemMartini.at(ItemMartini.address);

  console.log("Setup Token");
  var err, tx = await itemMartini.setupToken(60, "KHM", "Martini");
  console.log(err, tx);
  await itemMartini.setKittyCoreAddress(kittyCoreAddress);
  await itemMartini.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemMartini.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Martini", itemMartini.address, oneEtherInWei*0.003, artistAddress, 5000);
  console.log(err, tx);

}
