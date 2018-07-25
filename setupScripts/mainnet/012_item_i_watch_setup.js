module.exports = async function (callback) {
  var artistAddress = web3.eth.accounts[0];
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemiWatch = artifacts.require("ItemiWatch.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemiWatch = ItemiWatch.at(ItemiWatch.address);

  console.log("Setup Token");
  var err, tx = await itemiWatch.setupToken(5000, "KHIW", "iWatch");
  console.log(err, tx);
  await itemiWatch.setKittyCoreAddress(kittyCoreAddress);
  await itemiWatch.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemiWatch.transfer(kittyItemMarket.address, 4500);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("iWatch", itemiWatch.address, oneEtherInWei*0.3, artistAddress, 2500);
  console.log(err, tx);

}
