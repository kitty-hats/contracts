module.exports = async function (callback) {
  var artistAddress = "0xad425c399d2a6812441f802ffdf18bfc6684c7ab";  // Dada splitter contract for Cromomaniaco artist
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaRaftMedusa = artifacts.require("ItemDadaRaftMedusa.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaRaftMedusa = ItemDadaRaftMedusa.at(ItemDadaRaftMedusa.address);

  console.log("Setup Token");
  var err, tx = await itemDadaRaftMedusa.setupToken(20, "KHRM", "DadaRaftMedusa");
  console.log(err, tx);
  await itemDadaRaftMedusa.setKittyCoreAddress(kittyCoreAddress);
  await itemDadaRaftMedusa.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaRaftMedusa.transfer(kittyItemMarket.address, 15);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaRaftMedusa", itemDadaRaftMedusa.address, oneEtherInWei*0.05, artistAddress, 5000);
  console.log(err, tx);
}
