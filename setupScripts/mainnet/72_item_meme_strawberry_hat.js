module.exports = async function (callback) {
  var artistAddress = "0xbccc57c75b5ad32c9f1655480a08d4fc0fd0f925";  // Bx
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemMemeStrawberryHat = artifacts.require("ItemMemeStrawberryHat.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemMemeStrawberryHat = ItemMemeStrawberryHat.at(ItemMemeStrawberryHat.address);

  console.log("Setup Token");
  var err, tx = await itemMemeStrawberryHat.setupToken(40, "KHMW", "MemeStrawberryHat");
  console.log(err, tx);
  await itemMemeStrawberryHat.setKittyCoreAddress(kittyCoreAddress);
  await itemMemeStrawberryHat.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemMemeStrawberryHat.transfer(kittyItemMarket.address, 30);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("MemeStrawberryHat", itemMemeStrawberryHat.address, oneEtherInWei*0.005, artistAddress, 5000);
  console.log(err, tx);

}
