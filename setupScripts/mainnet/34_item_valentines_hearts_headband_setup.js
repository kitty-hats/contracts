module.exports = async function (callback) {
  var artistAddress = "0xeF7e51ADe42b9Bb9db5A613e5ccA83DdA7BBA708";  // KittyHawk
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemValentinesHeartsHeadband = artifacts.require("ItemValentinesHeartsHeadband.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemValentinesHeartsHeadband = ItemValentinesHeartsHeadband.at(ItemValentinesHeartsHeadband.address);

  console.log("Setup Token");
  var err, tx = await itemValentinesHeartsHeadband.setupToken(85, "KHHH", "ValentinesHeartsHeadband");
  console.log(err, tx);
  await itemValentinesHeartsHeadband.setKittyCoreAddress(kittyCoreAddress);
  await itemValentinesHeartsHeadband.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemValentinesHeartsHeadband.transfer(kittyItemMarket.address, 75);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("ValentinesHeartsHeadband", itemValentinesHeartsHeadband.address, oneEtherInWei*0.001, artistAddress, 5000);
  console.log(err, tx);

}
