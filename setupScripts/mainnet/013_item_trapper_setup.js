module.exports = async function (callback) {
  var artistAddress = web3.eth.accounts[0];
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemTrapper = artifacts.require("ItemTrapper.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemTrapper = ItemTrapper.at(ItemTrapper.address);

  console.log("Setup Token");
  var err, tx = await itemTrapper.setupToken(500000, "KHTR", "Trapper");
  console.log(err, tx);
  await itemTrapper.setKittyCoreAddress(kittyCoreAddress);
  await itemTrapper.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemTrapper.transfer(kittyItemMarket.address, 450000);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Trapper", itemTrapper.address, oneEtherInWei*0.002, artistAddress, 2500);
  console.log(err, tx);

}
