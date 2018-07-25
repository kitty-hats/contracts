module.exports = async function (callback) {
  var artistAddress = "0xbccc57c75b5ad32c9f1655480a08d4fc0fd0f925";  // Bx
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemMemeKeyboard = artifacts.require("ItemMemeKeyboard.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemMemeKeyboard = ItemMemeKeyboard.at(ItemMemeKeyboard.address);

  console.log("Setup Token");
  var err, tx = await itemMemeKeyboard.setupToken(50, "KHMK", "MemeKeyboard");
  console.log(err, tx);
  await itemMemeKeyboard.setKittyCoreAddress(kittyCoreAddress);
  await itemMemeKeyboard.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemMemeKeyboard.transfer(kittyItemMarket.address, 40);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("MemeKeyboard", itemMemeKeyboard.address, oneEtherInWei*0.005, artistAddress, 5000);
  console.log(err, tx);

}
