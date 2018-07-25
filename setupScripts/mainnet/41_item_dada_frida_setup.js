module.exports = async function (callback) {
  var artistAddress = "0x44656735175c1b01643a2fa2eeb7bdae33bb2b36";  // Dada splitter contract for Frida artist
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaFrida = artifacts.require("ItemDadaFrida.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaFrida = ItemDadaFrida.at(ItemDadaFrida.address);

  console.log("Setup Token");
  //var err, tx = await itemDadaFrida.setupToken(20, "KHF", "DadaFrida");
  console.log(err, tx);
  console.log('await setKitty')
  //await itemDadaFrida.setKittyCoreAddress(kittyCoreAddress);
  console.log('await setCanApply')
  await itemDadaFrida.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaFrida.transfer(kittyItemMarket.address, 15);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaFrida", itemDadaFrida.address, oneEtherInWei*0.05, artistAddress, 5000);
  console.log(err, tx);
}
