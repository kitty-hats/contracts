module.exports = async function (callback) {
  var artistAddress = "0x269B6f14D53Be3d47525cf356B35212fc0860450";  // Laura O'Donnell's Address
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemShowerCap = artifacts.require("ItemShowerCap.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemShowerCap = ItemShowerCap.at(ItemShowerCap.address);

  console.log("Setup Token");
  var err, tx = await itemShowerCap.setupToken(55, "KHSC", "ShowerCap");
  console.log(err, tx);
  await itemShowerCap.setKittyCoreAddress(kittyCoreAddress);
  await itemShowerCap.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemShowerCap.transfer(kittyItemMarket.address, 45);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("ShowerCap", itemShowerCap.address, oneEtherInWei*0.005, artistAddress, 4000);
  console.log(err, tx);

}
