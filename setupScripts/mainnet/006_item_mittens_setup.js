module.exports = async function (callback) {
  var artistAddress = web3.eth.accounts[0];
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemMittens = artifacts.require("ItemMittens.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemMittens = ItemMittens.at(ItemMittens.address);

  console.log("Setup Token");
  var err, tx = await itemMittens.setupToken(500000, "KHMT", "Mittens");
  console.log(err, tx);
  await itemMittens.setKittyCoreAddress(kittyCoreAddress);
  await itemMittens.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemMittens.transfer(kittyItemMarket.address, 450000);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Mittens", itemMittens.address, oneEtherInWei*0.0015, artistAddress, 2500);
  console.log(err, tx);

}
