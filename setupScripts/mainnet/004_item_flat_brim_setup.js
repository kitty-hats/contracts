module.exports = async function (callback) {
  var artistAddress = web3.eth.accounts[0];
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemFlatBrim = artifacts.require("ItemFlatBrim.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemFlatBrim = ItemFlatBrim.at(ItemFlatBrim.address);

  console.log("Setup Token");
  var err, tx = await itemFlatBrim.setupToken(500000, "KHFB", "FlatBrim");
  console.log(err, tx);
  await itemFlatBrim.setKittyCoreAddress(kittyCoreAddress);
  await itemFlatBrim.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemFlatBrim.transfer(kittyItemMarket.address, 450000);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("FlatBrim", itemFlatBrim.address, oneEtherInWei*0.003, artistAddress, 2500);
  console.log(err, tx);

}
