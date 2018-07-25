module.exports = async function (callback) {
  var artistAddress = "0xbccc57c75b5ad32c9f1655480a08d4fc0fd0f925";  // BxCat
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemPearlNecklace = artifacts.require("ItemPearlNecklace.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemPearlNecklace = ItemPearlNecklace.at(ItemPearlNecklace.address);

  console.log("Setup Token");
  var err, tx = await itemPearlNecklace.setupToken(60, "KHPN", "PearlNecklace");
  console.log(err, tx);
  await itemPearlNecklace.setKittyCoreAddress(kittyCoreAddress);
  await itemPearlNecklace.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemPearlNecklace.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("PearlNecklace", itemPearlNecklace.address, oneEtherInWei*0.005, artistAddress, 5000);
  console.log(err, tx);

}
