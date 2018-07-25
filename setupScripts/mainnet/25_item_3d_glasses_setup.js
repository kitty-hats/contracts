module.exports = async function (callback) {
  var artistAddress = "0xeF7e51ADe42b9Bb9db5A613e5ccA83DdA7BBA708";  // KittyHawk's ETH address
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var Item3dGlasses = artifacts.require("Item3dGlasses.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var item3dGlasses = Item3dGlasses.at(Item3dGlasses.address);

  console.log("Setup Token");
  var err, tx = await item3dGlasses.setupToken(60, "KH3D", "3DGlasses");
  console.log(err, tx);
  await item3dGlasses.setKittyCoreAddress(kittyCoreAddress);
  await item3dGlasses.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await item3dGlasses.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("3DGlasses", item3dGlasses.address, oneEtherInWei*0.005, artistAddress, 5000);
  console.log(err, tx);

}
