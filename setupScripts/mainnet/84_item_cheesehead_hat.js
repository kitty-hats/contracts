module.exports = async function (callback) {
  var artistAddress = "0x35e2268306aab43014da143f110431ec0140957a";  // ParanoidLunatic
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemCheeseheadHat = artifacts.require("ItemCheeseheadHat.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemCheeseheadHat = ItemCheeseheadHat.at(ItemCheeseheadHat.address);

  console.log("Setup Token");
  var err, tx = await itemCheeseheadHat.setupToken(50, "KHCH", "CheeseheadHat");
  console.log(err, tx);
  await itemCheeseheadHat.setKittyCoreAddress(kittyCoreAddress);
  await itemCheeseheadHat.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemCheeseheadHat.transfer(kittyItemMarket.address, 40);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("CheeseheadHat", itemCheeseheadHat.address, oneEtherInWei*0.025, artistAddress, 5000);
  console.log(err, tx);

}
