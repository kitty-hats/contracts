module.exports = async function (callback) {
  var artistAddress = "0xeF7e51ADe42b9Bb9db5A613e5ccA83DdA7BBA708";  // KittyHawk
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemMemeNyanCat = artifacts.require("ItemMemeNyanCat.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemMemeNyanCat = ItemMemeNyanCat.at(ItemMemeNyanCat.address);

  console.log("Setup Token");
  var err, tx = await itemMemeNyanCat.setupToken(25, "KHMN", "MemeNyanCat");
  console.log(err, tx);
  await itemMemeNyanCat.setKittyCoreAddress(kittyCoreAddress);
  await itemMemeNyanCat.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemMemeNyanCat.transfer(kittyItemMarket.address, 20);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("MemeNyanCat", itemMemeNyanCat.address, oneEtherInWei*0.05, artistAddress, 5000);
  console.log(err, tx);

}
