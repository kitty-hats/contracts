module.exports = async function (callback) {
  var artistAddress = "0xbccc57c75b5ad32c9f1655480a08d4fc0fd0f925";  // Bx
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemMemeScience = artifacts.require("ItemMemeScience.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemMemeScience = ItemMemeScience.at(ItemMemeScience.address);

  console.log("Setup Token");
  var err, tx = await itemMemeScience.setupToken(15, "KHMS", "MemeScience");
  console.log(err, tx);
  await itemMemeScience.setKittyCoreAddress(kittyCoreAddress);
  await itemMemeScience.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemMemeScience.transfer(kittyItemMarket.address, 10);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("MemeScience", itemMemeScience.address, oneEtherInWei*0.03, artistAddress, 5000);
  console.log(err, tx);

}
