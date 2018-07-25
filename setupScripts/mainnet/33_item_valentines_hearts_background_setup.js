module.exports = async function (callback) {
  var artistAddress = "0xbccc57c75b5ad32c9f1655480a08d4fc0fd0f925";  // uxbecks
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemValentinesHeartsBackground = artifacts.require("ItemValentinesHeartsBackground.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemValentinesHeartsBackground = ItemValentinesHeartsBackground.at(ItemValentinesHeartsBackground.address);

  console.log("Setup Token");
  var err, tx = await itemValentinesHeartsBackground.setupToken(30, "KHHB", "ValentinesHeartsBackground");
  console.log(err, tx);
  await itemValentinesHeartsBackground.setKittyCoreAddress(kittyCoreAddress);
  await itemValentinesHeartsBackground.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemValentinesHeartsBackground.transfer(kittyItemMarket.address, 25);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("ValentinesHeartsBackground", itemValentinesHeartsBackground.address, oneEtherInWei*0.004, artistAddress, 4000);
  console.log(err, tx);

}
