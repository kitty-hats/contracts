module.exports = async function (callback) {
  var artistAddress = "0x44bdcf63f6100163f62f6ac6d1c8414d5390d797";  // Dada splitter contract for artist
  var kittyCoreAddress = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d";
  const oneEtherInWei = 1000000000000000000;

  var KittyItemMarket = artifacts.require("KittyItemMarket.sol");
  var ItemDadaCreationOfAdam = artifacts.require("ItemDadaCreationOfAdam.sol");

  var kittyItemMarket = KittyItemMarket.at(KittyItemMarket.address);
  var itemDadaCreationOfAdam = ItemDadaCreationOfAdam.at(ItemDadaCreationOfAdam.address);

  console.log("Setup Token");
  var err, tx = await itemDadaCreationOfAdam.setupToken(10, "KHCA", "DadaCreationOfAdam");
  console.log(err, tx);
  await itemDadaCreationOfAdam.setKittyCoreAddress(kittyCoreAddress);
  await itemDadaCreationOfAdam.setCanApplyAddress(kittyItemMarket.address);
  console.log("Transfer Tokens");
  var err, tx = await itemDadaCreationOfAdam.transfer(kittyItemMarket.address, 5);
  console.log(err, tx);
  console.log("Add Item");
  var err, tx = await kittyItemMarket.addItem("DadaCreationOfAdam", itemDadaCreationOfAdam.address, oneEtherInWei*0.1, artistAddress, 5000);
  console.log(err, tx);
}
