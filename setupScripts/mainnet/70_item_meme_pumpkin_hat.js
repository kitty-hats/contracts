module.exports = async function (callback) {
  var artistAddress = "0xbccc57c75b5ad32c9f1655480a08d4fc0fd0f925";  // Bx
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemMemePumpkinHat = artifacts.require("ItemMemePumpkinHat.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemMemePumpkinHat = ItemMemePumpkinHat.at(ItemMemePumpkinHat.address);

  console.log("Setup Token");
  var err, tx = await itemMemePumpkinHat.setupToken(40, "KHMP", "MemePumpkinHat");
  console.log(err, tx);
  await itemMemePumpkinHat.setKittyCoreAddress(kittyCoreAddress);
  await itemMemePumpkinHat.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemMemePumpkinHat.transfer(kittyItemMarket.address, 30);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("MemePumpkinHat", itemMemePumpkinHat.address, oneEtherInWei*0.005, artistAddress, 5000);
  console.log(err, tx);

}
