module.exports = async function (callback) {
  var artistAddress = "0x35e2268306aab43014da143f110431ec0140957a";  // ParanoidLunatic
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDeadBird = artifacts.require("ItemDeadBird.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDeadBird = ItemDeadBird.at(ItemDeadBird.address);

  console.log("Setup Token");
  var err, tx = await itemDeadBird.setupToken(50, "KHDB", "DeadBird");
  console.log(err, tx);
  await itemDeadBird.setKittyCoreAddress(kittyCoreAddress);
  await itemDeadBird.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDeadBird.transfer(kittyItemMarket.address, 40);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DeadBird", itemDeadBird.address, oneEtherInWei*0.01, artistAddress, 5000);
  console.log(err, tx);

}
