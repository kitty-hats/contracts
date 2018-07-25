module.exports = async function (callback) {
  var artistAddress = "0xbccc57c75b5ad32c9f1655480a08d4fc0fd0f925";  // BxCat
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemHearts = artifacts.require("ItemHearts.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemHearts = ItemHearts.at(ItemHearts.address);

  console.log("Setup Token");
  var err, tx = await itemHearts.setupToken(60, "KHHB", "Hearts");
  console.log(err, tx);
  await itemHearts.setKittyCoreAddress(kittyCoreAddress);
  await itemHearts.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemHearts.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Hearts", itemHearts.address, oneEtherInWei*0.005, artistAddress, 5000);
  console.log(err, tx);

}
