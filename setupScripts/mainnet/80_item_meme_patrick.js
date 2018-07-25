module.exports = async function (callback) {
  var artistAddress = "0x4027B203A16158a39b80B2d3a353cA4870dCa63e";  // ADHD
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemMemePatrick = artifacts.require("ItemMemePatrick.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemMemePatrick = ItemMemePatrick.at(ItemMemePatrick.address);

  console.log("Setup Token");
  var err, tx = await itemMemePatrick.setupToken(50, "KHMR", "MemePatrick");
  console.log(err, tx);
  await itemMemePatrick.setKittyCoreAddress(kittyCoreAddress);
  await itemMemePatrick.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemMemePatrick.transfer(kittyItemMarket.address, 40);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("MemePatrick", itemMemePatrick.address, oneEtherInWei*0.01, artistAddress, 5000);
  console.log(err, tx);

}
