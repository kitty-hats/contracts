module.exports = async function (callback) {
  var artistAddress = "0xeF7e51ADe42b9Bb9db5A613e5ccA83DdA7BBA708";  // KittyHawk
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemMemeCeilingCat = artifacts.require("ItemMemeCeilingCat.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemMemeCeilingCat = ItemMemeCeilingCat.at(ItemMemeCeilingCat.address);

  console.log("Setup Token");
  var err, tx = await itemMemeCeilingCat.setupToken(50, "KHMC", "MemeCeilingCat");
  console.log(err, tx);
  await itemMemeCeilingCat.setKittyCoreAddress(kittyCoreAddress);
  await itemMemeCeilingCat.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemMemeCeilingCat.transfer(kittyItemMarket.address, 40);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("MemeCeilingCat", itemMemeCeilingCat.address, oneEtherInWei*0.01, artistAddress, 5000);
  console.log(err, tx);

}
