module.exports = async function (callback) {
  var artistAddress = "0x579120fAddE647cf107cf68003B04F0beE205876";  // Sam's ETH address
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemYeezy = artifacts.require("ItemYeezy.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemYeezy = ItemYeezy.at(ItemYeezy.address);

  console.log("Setup Token");
  var err, tx = await itemYeezy.setupToken(500, "KHYZ", "Yeezy");
  console.log(err, tx);
  await itemYeezy.setKittyCoreAddress(kittyCoreAddress);
  await itemYeezy.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemYeezy.transfer(kittyItemMarket.address, 450);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Yeezy", itemYeezy.address, oneEtherInWei, artistAddress, 2500);
  console.log(err, tx);

}
