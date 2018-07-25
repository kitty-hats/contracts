module.exports = async function (callback) {
  var artistAddress = "0xbccc57c75b5ad32c9f1655480a08d4fc0fd0f925";  // BxCat
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemMemeBread = artifacts.require("ItemMemeBread.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemMemeBread = ItemMemeBread.at(ItemMemeBread.address);

//  console.log("Setup Token");
//  var err, tx = await itemMemeBread.setupToken(25, "KHMB", "MemeBread");
//  console.log(err, tx);
//  await itemMemeBread.setKittyCoreAddress(kittyCoreAddress);
//  await itemMemeBread.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemMemeBread.transfer(kittyItemMarket.address, 20);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("MemeBread", itemMemeBread.address, oneEtherInWei*0.01, artistAddress, 5000);
  console.log(err, tx);

}
