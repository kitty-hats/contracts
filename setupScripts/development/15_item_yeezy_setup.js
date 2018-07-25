module.exports = async function (callback) {
  var artistAddress = "0x579120fAddE647cf107cf68003B04F0beE205876";  // Sam's ETH address
  const oneEtherInWei = 1000000000000000000;

  var KittyCoreExample = artifacts.require("KittyCoreExample.sol");
  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemYeezy = artifacts.require("ItemYeezy.sol");

  var kittyCoreExample = KittyCoreExample.at(KittyCoreExample.address);
  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemYeezy = ItemYeezy.at(ItemYeezy.address);

  console.log("Setup Token");
  var err, tx = await itemYeezy.setupToken(500, "KHYZ", "Yeezy");
  console.log(err, tx);
  await itemYeezy.setKittyCoreAddress(kittyCoreExample.address);
  await itemYeezy.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemYeezy.transfer(kittyItemMarket.address, 450);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Yeezy", itemYeezy.address, oneEtherInWei, artistAddress, 2500);
  console.log(err, tx);

}
