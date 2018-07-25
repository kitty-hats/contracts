module.exports = async function (callback) {
  var artistAddress = web3.eth.accounts[0];
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemNerdGlasses = artifacts.require("ItemNerdGlasses.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemNerdGlasses = ItemNerdGlasses.at(ItemNerdGlasses.address);

  console.log("Setup Token");
  var err, tx = await itemNerdGlasses.setupToken(500000, "KHNG", "NerdGlasses");
  console.log(err, tx);
  await itemNerdGlasses.setKittyCoreAddress(kittyCoreAddress);
  await itemNerdGlasses.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemNerdGlasses.transfer(kittyItemMarket.address, 450000);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("NerdGlasses", itemNerdGlasses.address, oneEtherInWei*0.0022, artistAddress, 2500);
  console.log(err, tx);

}
