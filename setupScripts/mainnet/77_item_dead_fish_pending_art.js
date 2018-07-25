module.exports = async function (callback) {
  var artistAddress = "";  // Joey
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDeadFish = artifacts.require("ItemDeadFish.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDeadFish = ItemDeadFish.at(ItemDeadFish.address);

  console.log("Setup Token");
  var err, tx = await itemDeadFish.setupToken(50, "KHDF", "DeadFish");
  console.log(err, tx);
  await itemDeadFish.setKittyCoreAddress(kittyCoreAddress);
  await itemDeadFish.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDeadFish.transfer(kittyItemMarket.address, 40);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DeadFish", itemDeadFish.address, oneEtherInWei*0.01, artistAddress, 5000);
  console.log(err, tx);

}
