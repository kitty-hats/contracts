module.exports = async function (callback) {
  var artistAddress = web3.eth.accounts[0];
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemTopHat = artifacts.require("ItemTopHat.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemTopHat = ItemTopHat.at(ItemTopHat.address);

  console.log("Setup Token");
  var err, tx = await itemTopHat.setupToken(500000, "KHTH", "TopHat");
  console.log(err, tx);
  await itemTopHat.setKittyCoreAddress(kittyCoreAddress);
  await itemTopHat.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemTopHat.transfer(kittyItemMarket.address, 450000);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("TopHat", itemTopHat.address, oneEtherInWei*0.001, artistAddress, 2500);
  console.log(err, tx);

}
