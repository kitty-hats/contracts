module.exports = async function (callback) {
  var artistAddress = "0xA2bA02db5c34B11C1Be0A25417851C9DfC5d4467";  // janbro
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemSpikedBracelet = artifacts.require("ItemSpikedBracelet.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemSpikedBracelet = ItemSpikedBracelet.at(ItemSpikedBracelet.address);

  console.log("Setup Token");
  var err, tx = await itemSpikedBracelet.setupToken(60, "KHSB", "SpikedBracelet");
  console.log(err, tx);
  await itemSpikedBracelet.setKittyCoreAddress(kittyCoreAddress);
  await itemSpikedBracelet.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemSpikedBracelet.transfer(kittyItemMarket.address, 50);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("SpikedBracelet", itemSpikedBracelet.address, oneEtherInWei*0.005, artistAddress, 4000);
  console.log(err, tx);

}
