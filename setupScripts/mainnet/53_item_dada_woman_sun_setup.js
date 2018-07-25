module.exports = async function (callback) {
  var artistAddress = "0xa3a4d368827bb6ddcbb8e1e5a90322003fd1035e";  // Dada splitter contract for artist Pinasco Lorena
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaWomanSun = artifacts.require("ItemDadaWomanSun.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaWomanSun = ItemDadaWomanSun.at(ItemDadaWomanSun.address);

  console.log("Setup Token");
  var err, tx = await itemDadaWomanSun.setupToken(50, "KHWS", "DadaWomanSun");
  console.log(err, tx);
  await itemDadaWomanSun.setKittyCoreAddress(kittyCoreAddress);
  await itemDadaWomanSun.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaWomanSun.transfer(kittyItemMarket.address, 40);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaWomanSun", itemDadaWomanSun.address, oneEtherInWei*0.02, artistAddress, 5000);
  console.log(err, tx);
}
