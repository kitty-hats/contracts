module.exports = async function (callback) {
  var artistAddress = web3.eth.accounts[0];
  const oneEtherInWei = 1000000000000000000;

  var KittyCoreExample = artifacts.require("KittyCoreExample.sol");
  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemiWatch = artifacts.require("ItemiWatch.sol");

  var kittyCoreExample = KittyCoreExample.at(KittyCoreExample.address);
  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemiWatch = ItemiWatch.at(ItemiWatch.address);

  console.log("Setup Token");
  var err, tx = await itemiWatch.setupToken(5000, "KHIW", "iWatch");
  console.log(err, tx);
  await itemiWatch.setKittyCoreAddress(kittyCoreExample.address);
  await itemiWatch.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemiWatch.transfer(kittyItemMarket.address, 4500);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("iWatch", itemiWatch.address, oneEtherInWei*0.3, artistAddress, 2500);
  console.log(err, tx);

}
