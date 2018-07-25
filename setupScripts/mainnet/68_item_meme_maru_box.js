module.exports = async function (callback) {
  var artistAddress = "0xbccc57c75b5ad32c9f1655480a08d4fc0fd0f925";  // Bx
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemMemeMaruBox = artifacts.require("ItemMemeMaruBox.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemMemeMaruBox = ItemMemeMaruBox.at(ItemMemeMaruBox.address);

  console.log("Setup Token");
  var err, tx = await itemMemeMaruBox.setupToken(50, "KHMM", "MemeMaruBox");
  console.log(err, tx);
  await itemMemeMaruBox.setKittyCoreAddress(kittyCoreAddress);
  await itemMemeMaruBox.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemMemeMaruBox.transfer(kittyItemMarket.address, 40);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("MemeMaruBox", itemMemeMaruBox.address, oneEtherInWei*0.02, artistAddress, 5000);
  console.log(err, tx);

}
