module.exports = async function (callback) {
  var artistAddress = "0xeF7e51ADe42b9Bb9db5A613e5ccA83DdA7BBA708";  // KittyHawk's ETH address
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemBowtie = artifacts.require("ItemBowtie.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemBowtie = ItemBowtie.at(ItemBowtie.address);

  console.log("Setup Token");
  var err, tx = await itemBowtie.setupToken(1000, "KHBT", "Bowtie");
  console.log(err, tx);
  await itemBowtie.setKittyCoreAddress(kittyCoreAddress);
  await itemBowtie.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemBowtie.transfer(kittyItemMarket.address, 900);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("Bowtie", itemBowtie.address, oneEtherInWei*0.001, artistAddress, 5000);
  console.log(err, tx);

}
