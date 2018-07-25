module.exports = async function (callback) {
  var artistAddress = "0x44b444d16935f1e9afdd58ef986ba1c93e9ee5e9";  // mh10k
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemTuxedo = artifacts.require("ItemTuxedo.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemTuxedo = ItemTuxedo.at(ItemTuxedo.address);

  console.log("Setup Token");
  var err, tx = await itemTuxedo.setupToken(60, "KHT", "Tuxedo");
  console.log(err, tx);
  await itemTuxedo.setKittyCoreAddress(kittyCoreAddress);
  await itemTuxedo.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemTuxedo.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Tuxedo", itemTuxedo.address, oneEtherInWei*0.005, artistAddress, 5000);
  console.log(err, tx);

}
