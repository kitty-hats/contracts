module.exports = async function (callback) {
  var artistAddress = "0x35e2268306aab43014da143f110431ec0140957a";  // ParanoidLunatic
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemHardHat = artifacts.require("ItemHardHat.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemHardHat = ItemHardHat.at(ItemHardHat.address);

  console.log("Setup Token");
  var err, tx = await itemHardHat.setupToken(60, "KHHH", "HardHat");
  console.log(err, tx);
  await itemHardHat.setKittyCoreAddress(kittyCoreAddress);
  await itemHardHat.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemHardHat.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("HardHat", itemHardHat.address, oneEtherInWei*0.01, artistAddress, 5000);
  console.log(err, tx);

}
