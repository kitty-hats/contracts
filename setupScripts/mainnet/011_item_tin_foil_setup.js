module.exports = async function (callback) {
  var artistAddress = web3.eth.accounts[0];
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemTinFoil = artifacts.require("ItemTinFoil.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemTinFoil = ItemTinFoil.at(ItemTinFoil.address);

  console.log("Setup Token");
  var err, tx = await itemTinFoil.setupToken(15, "KHTF", "TinFoil");
  console.log(err, tx);
  await itemTinFoil.setKittyCoreAddress(kittyCoreAddress);
  await itemTinFoil.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemTinFoil.transfer(kittyItemMarket.address, 10);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("TinFoil", itemTinFoil.address, oneEtherInWei*10, artistAddress, 2500);
  console.log(err, tx);

}
