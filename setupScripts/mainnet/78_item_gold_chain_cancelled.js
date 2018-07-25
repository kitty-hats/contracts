module.exports = async function (callback) {
  var artistAddress = "";  // Janbro
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemGoldChain = artifacts.require("ItemGoldChain.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemGoldChain = ItemGoldChain.at(ItemGoldChain.address);

  console.log("Setup Token");
  var err, tx = await itemGoldChain.setupToken(50, "KHGC", "GoldChain");
  console.log(err, tx);
  await itemGoldChain.setKittyCoreAddress(kittyCoreAddress);
  await itemGoldChain.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemGoldChain.transfer(kittyItemMarket.address, 40);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("GoldChain", itemGoldChain.address, oneEtherInWei*0.005, artistAddress, 5000);
  console.log(err, tx);

}
